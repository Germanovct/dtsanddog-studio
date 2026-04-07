"""
🚀 MIGRAR CSV → SUPABASE + DISPARAR PIPELINE - DTS&DOG Studio
"""
import sys
import os
import datetime
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
load_dotenv(override=True)

from db import get_all_leads_df, update_lead_status, insert_lead, get_db_connection
from main import generar_email, analizar_web, calcular_lead_score
from gmail_engine import send_gmail_message

DAILY_LIMIT = 15

# ─────────────────────────────────────────────
# PASO 1: Migrar CSV local a Supabase
# ─────────────────────────────────────────────
def migrar_csv_a_supabase():
    csv_path = os.path.join(os.path.dirname(__file__), "..", "prospectos_calificados.csv")
    if not os.path.exists(csv_path):
        print("⚠️ No se encontró prospectos_calificados.csv")
        return 0

    df_local = pd.read_csv(csv_path)
    df_local = df_local.dropna(subset=["email"])

    # Obtener emails ya existentes en Supabase
    df_supabase = get_all_leads_df()
    existentes = df_supabase['email'].tolist() if not df_supabase.empty else []

    migrados = 0
    for _, row in df_local.iterrows():
        email = str(row.get('email', '')).strip()
        if not email or '@' not in email:
            continue
        if email in existentes:
            print(f"   ⏭️  {email} ya existe en Supabase. Saltando.")
            continue

        lead_db = {
            "nombre":          str(row.get('nombre', '')),
            "url":             str(row.get('url', '')),
            "email":           email,
            "score":           int(row.get('score', 0)),
            "tti":             str(row.get('tti', 'N/A')),
            "lead_score":      int(row.get('lead_score', 0)),
            "fallas":          str(row.get('fallas', '')),
            "status":          str(row.get('status', 'Nuevo')),
            "ultimo_contacto": str(row.get('ultimo_contacto', '')),
            "thread_id":       str(row.get('thread_id', ''))
        }
        insert_lead(lead_db)
        existentes.append(email)
        migrados += 1
        print(f"   ✅ Migrado: {lead_db['nombre']} ({email})")

    return migrados


# ─────────────────────────────────────────────
# PASO 2: Re-analizar y contactar los Nuevos
# ─────────────────────────────────────────────
def re_analizar_y_contactar():
    df = get_all_leads_df()

    if df.empty:
        print("❌ CRM en Supabase sigue vacío. Revisá la conexión.")
        return

    print(f"\n📊 Total leads en CRM: {len(df)}")

    for col in ["status", "ultimo_contacto", "thread_id", "score", "tti", "lead_score", "fallas"]:
        if col not in df.columns:
            df[col] = ""

    pendientes = df[df['status'] == 'Nuevo']
    print(f"🎯 Leads en estado 'Nuevo': {len(pendientes)}")

    if pendientes.empty:
        print("ℹ️  No hay leads nuevos para contactar.")
        return

    enviados = 0

    for index, row in pendientes.iterrows():
        if enviados >= DAILY_LIMIT:
            print(f"\n⏸️ Límite diario de {DAILY_LIMIT} emails alcanzado.")
            break

        nombre = str(row.get('nombre', 'N/A'))
        url    = str(row.get('url', ''))
        email  = str(row.get('email', ''))

        print(f"\n{'─'*50}")
        print(f"🎯 Procesando: {nombre}")
        print(f"   📧 Email: {email}")
        print(f"   🌐 URL:   {url}")

        if not email or '@' not in email:
            print(f"   ⚠️  Email inválido. Saltando.")
            continue

        # Re-analizar con PageSpeed real
        score, tti, fallas = analizar_web(url)
        lead_score = calcular_lead_score(score)

        print(f"   📊 Score: {score}/100 | TTI: {tti} | Lead Score: {lead_score}")
        print(f"   🔍 Fallas: {fallas}")

        if lead_score < 80:
            print(f"   ⏭️  Lead score {lead_score} < 80. No alcanza umbral. Saltando.")
            continue

        # Generar email personalizado con IA
        print(f"   ✍️  Generando email con Gemini...")
        cuerpo = generar_email(nombre, url, score, tti, fallas, tipo="primera_auditoria")
        asunto = f"Propuesta de optimización estratégica para {nombre}"

        # Disparar SMTP
        print(f"   📤 Enviando...")
        result = send_gmail_message(email, asunto, cuerpo)

        if result:
            ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
            update_lead_status(email, url, "Contactado", ahora)
            enviados += 1
            print(f"   ✅ ¡EMAIL ENVIADO! CRM actualizado → Contactado.")
        else:
            print(f"   ❌ Falló el envío.")

    print(f"\n{'='*60}")
    print(f"🏁 Pipeline finalizado. Emails enviados: {enviados}")
    print("="*60)


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "="*60)
    print("🤖 DISPARADOR MANUAL - DTS&DOG STUDIO")
    print("="*60)

    print("\n🔄 PASO 1: Sincronizando CSV local → Supabase...")
    migrados = migrar_csv_a_supabase()
    print(f"   ✅ {migrados} leads nuevos migrados a Supabase.")

    print("\n🚀 PASO 2: Analizando y contactando leads pendientes...")
    re_analizar_y_contactar()
