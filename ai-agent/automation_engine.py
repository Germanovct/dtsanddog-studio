import pandas as pd
import datetime
import os
import time
import json
import random
from gmail_engine import send_gmail_message
from main import generar_email, analizar_web, calcular_lead_score
from buscador import buscar_leads_prospectos
from db import get_all_leads_df, insert_lead, update_lead_status

INDUSTRIES_PATH = "ai-agent/target_industries.json"
FOLLOWUP_DELAY_DAYS = 3
DAILY_LIMIT = 15

def get_emails_sent_today(df):
    """Cuenta cuántos correos se enviaron hoy."""
    if 'ultimo_contacto' not in df.columns:
        return 0
    hoy = datetime.datetime.now().strftime("%Y-%m-%d")
    df['ultimo_contacto'] = df['ultimo_contacto'].astype(str)
    return len(df[df['ultimo_contacto'].str.contains(hoy)])

def discover_new_leads():
    """Busca nuevos prospectos automáticamente basados en la lista de industrias."""
    if not os.path.exists(INDUSTRIES_PATH):
        return []
        
    with open(INDUSTRIES_PATH, "r") as f:
        queries = json.load(f)
    
    query = random.choice(queries)
    print(f"🔎 Cazador Autónomo: Buscando en '{query}'...")
    
    nuevos_leads = buscar_leads_prospectos(query, max_resultados=5)
    if not nuevos_leads:
        return []

    # Cargar leads existentes para evitar duplicados
    df_old = get_all_leads_df()
    existentes = df_old['email'].tolist() if not df_old.empty else []
    
    leads_a_agregar = []
    for lead in nuevos_leads:
        if lead['email'] not in existentes:
            print(f"✨ Nuevo prospecto detectado: {lead['nombre']}")
            # Análisis automático
            score, tti, fallas = analizar_web(lead['url'])
            l_score = calcular_lead_score(score)
            
            lead_db = {
                "nombre": lead['nombre'],
                "url": lead['url'],
                "email": lead['email'],
                "score": score,
                "tti": tti,
                "lead_score": l_score,
                "fallas": fallas,
                "status": "Nuevo",
                "ultimo_contacto": "",
                "thread_id": ""
            }
            leads_a_agregar.append(lead_db)
            insert_lead(lead_db)
            
    if leads_a_agregar:
        print(f"✅ {len(leads_a_agregar)} leads agregados al CRM.")
    
    return leads_a_agregar

def process_pipeline():
    df = get_all_leads_df()
    if df.empty:
        return
    
    # Asegurar que las columnas existen
    for col in ["status", "ultimo_contacto", "thread_id", "score", "tti", "lead_score"]:
        if col not in df.columns:
            df[col] = ""

    sent_today = get_emails_sent_today(df)
    print(f"📊 Reporte Diario: {sent_today}/{DAILY_LIMIT} correos enviados hoy.")

    if sent_today >= DAILY_LIMIT:
        print("⏸️ Límite diario alcanzado. Deteniendo envíos por hoy.")
        return

    updated = False

    for index, row in df.iterrows():
        if sent_today >= DAILY_LIMIT:
            break
            
        status = str(row['status'])
        ultimo_contacto_str = str(row['ultimo_contacto'])
        
        # 1. AUTOREACH (Primer Contacto para leads con score > 80)
        if status == "Nuevo" and int(row.get('lead_score', 0)) >= 80:
            print(f"🚀 Enviando primer contacto automático a: {row['nombre']}")
            cuerpo = generar_email(row['nombre'], row['url'], row['score'], row['tti'], row.get('fallas', ''), tipo="primera_auditoria")
            asunto = "Propuesta de optimización estratégica para " + row['nombre']
            
            result = send_gmail_message(row['email'], asunto, cuerpo)
            if result:
                df.at[index, 'status'] = "Contactado"
                ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                df.at[index, 'ultimo_contacto'] = ahora
                df.at[index, 'thread_id'] = result.get('threadId', '')
                update_lead_status(row['email'], row['url'], "Contactado", ahora)
                sent_today += 1
                updated = True

        # 2. FOLLOW-UPS (Mismo que antes)
        elif status == "Contactado" and ultimo_contacto_str != "nan" and ultimo_contacto_str != "":
            try:
                fecha_contacto = datetime.datetime.strptime(ultimo_contacto_str, "%Y-%m-%d %H:%M")
                dias_pasados = (datetime.datetime.now() - fecha_contacto).days
                
                if dias_pasados >= FOLLOWUP_DELAY_DAYS:
                    print(f"🔄 Follow-up #1 automático para: {row['nombre']}")
                    cuerpo_fu = generar_email(row['nombre'], row['url'], row['score'], row['tti'], row.get('fallas', ''), tipo="followup")
                    asunto_fu = "Re: Seguimiento sobre la presencia digital de " + row['nombre']
                    
                    result = send_gmail_message(row['email'], asunto_fu, cuerpo_fu)
                    if result:
                        df.at[index, 'status'] = "Followup-1"
                        ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                        df.at[index, 'ultimo_contacto'] = ahora
                        df.at[index, 'thread_id'] = result.get('threadId', '')
                        update_lead_status(row['email'], row['url'], "Followup-1", ahora)
                        sent_today += 1
                        updated = True
            except:
                pass

    if updated:
        print("📊 CRM Sincronizado.")

if __name__ == "__main__":
    print("🤖 CAZADOR AUTÓNOMO DTS&DOG STUDIO (PILOTO AUTOMÁTICO)")
    while True:
        # 1. Buscar nuevos leads (Caza)
        discover_new_leads()
        
        # 2. Procesar envíos y seguimientos
        process_pipeline()
        
        print("💤 Ciclo completado. Esperando 4 horas para la próxima ronda...")
        time.sleep(14400) # Chequea cada 4 horas
