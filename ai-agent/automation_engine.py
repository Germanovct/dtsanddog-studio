import pandas as pd
import datetime
import os
import time
from gmail_engine import send_gmail_message
from main import generar_email # Reutilizamos la lógica de Gemini

CSV_PATH = "prospectos_calificados.csv"
FOLLOWUP_DELAY_DAYS = 3

def check_for_followups():
    if not os.path.exists(CSV_PATH):
        print("No hay prospectos para procesar.")
        return

    df = pd.read_csv(CSV_PATH)
    
    # Asegurar que las columnas existen
    required_cols = ["status", "ultimo_contacto", "thread_id"]
    for col in required_cols:
        if col not in df.columns:
            df[col] = ""

    updated = False

    for index, row in df.iterrows():
        status = str(row['status'])
        ultimo_contacto_str = str(row['ultimo_contacto'])
        
        if status == "Contactado" and ultimo_contacto_str != "nan":
            try:
                fecha_contacto = datetime.datetime.strptime(ultimo_contacto_str, "%Y-%m-%d %H:%M")
                dias_pasados = (datetime.datetime.now() - fecha_contacto).days
                
                if dias_pasados >= FOLLOWUP_DELAY_DAYS:
                    print(f"🚀 Iniciando Follow-up #1 para: {row['nombre']} ({row['email']})")
                    
                    # Generar un follow-up más corto y directo usando el nuevo parámetro 'tipo'
                    cuerpo_followup = generar_email(row['nombre'], row['url'], row['score'], row['tti'], tipo="followup")
                    # Nota: generar_email genera el primer contacto, para un follow-up real deberíamos tener otra función.
                    # Por simplicidad en este MVP, usaremos un texto predefinido o pediremos a Gemini una variante.
                    
                    asunto = "Re: Seguimiento sobre la presencia digital de " + row['nombre']
                    
                    # Intentar enviar vía Gmail API
                    # thread_id = row['thread_id'] if row['thread_id'] != "nan" else None
                    result = send_gmail_message(row['email'], asunto, cuerpo_followup)
                    
                    if result:
                        df.at[index, 'status'] = "Followup-1"
                        df.at[index, 'ultimo_contacto'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                        df.at[index, 'thread_id'] = result.get('threadId', '')
                        updated = True
                        print(f"✅ Follow-up #1 enviado a {row['email']}")
                    
            except Exception as e:
                print(f"❌ Error procesando {row['email']}: {e}")

    if updated:
        df.to_csv(CSV_PATH, index=False)
        print("📊 CRM Actualizado.")

if __name__ == "__main__":
    print("🤖 MOTOR DE AUTOMATIZACIÓN DE VENTAS DTS&DOG")
    while True:
        check_for_followups()
        print("💤 Durmiendo por 1 hora...")
        time.sleep(3600) # Chequea cada hora
