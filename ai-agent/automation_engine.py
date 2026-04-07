"""
╔══════════════════════════════════════════════════════════════╗
║         AUTOMATION ENGINE — Motor de Ventas Autónomo         ║
║  Ciclo Completo: Buscar → Analizar → Contactar → Follow-up  ║
║  Con 3 niveles de seguimiento y detección de respuestas      ║
╚══════════════════════════════════════════════════════════════╝
"""

import pandas as pd
import datetime
import os
import time
import json
import random

from gmail_engine import send_gmail_message
from gmail_reader import detectar_respuestas_de_prospectos
from enricher import enriquecer_leads
from main import generar_email, analizar_web, calcular_lead_score
from buscador import buscar_leads_prospectos
from db import get_all_leads_df, insert_lead, update_lead_status

# ─────────────────────────────────────────────
# CONFIGURACIÓN
# ─────────────────────────────────────────────
INDUSTRIES_PATH    = "ai-agent/target_industries.json"
DAILY_LIMIT        = 15      # Máximo emails por día (evita spam)
FOLLOWUP_1_DIAS    = 3       # Días hasta Follow-up #1
FOLLOWUP_2_DIAS    = 7       # Días hasta Follow-up #2
ARCHIVAR_DIAS      = 14      # Días hasta marcar como Frío


def get_emails_sent_today(df: pd.DataFrame) -> int:
    """Cuenta cuántos correos se enviaron hoy."""
    if 'ultimo_contacto' not in df.columns:
        return 0
    hoy = datetime.datetime.now().strftime("%Y-%m-%d")
    df['ultimo_contacto'] = df['ultimo_contacto'].astype(str)
    return len(df[df['ultimo_contacto'].str.contains(hoy)])


def discover_new_leads() -> list:
    """Busca nuevos prospectos automáticamente basados en industrias target."""
    if not os.path.exists(INDUSTRIES_PATH):
        print(f"⚠️ No se encontró {INDUSTRIES_PATH}")
        return []

    with open(INDUSTRIES_PATH, "r") as f:
        queries = json.load(f)

    query = random.choice(queries)
    print(f"\n🔎 Cazador Autónomo: Buscando en '{query}'...")

    nuevos_leads = buscar_leads_prospectos(query, max_resultados=5)
    if not nuevos_leads:
        return []

    df_old   = get_all_leads_df()
    existentes = df_old['email'].tolist() if not df_old.empty else []

    if nuevos_leads:
        # ✨ Enriquecimiento: Buscamos nombres de CEOs/Dueños
        nuevos_leads = enriquecer_leads(nuevos_leads)

    leads_a_agregar = []
    for lead in nuevos_leads:
        if lead['email'] not in existentes:
            nombre_label = lead.get('contacto', lead['nombre'])
            print(f"   ✨ Nuevo prospecto: {nombre_label} ({lead['nombre']})")
            score, tti, fallas = analizar_web(lead['url'])
            l_score = calcular_lead_score(score)

            lead_db = {
                "nombre":          nombre_label, # Guardamos el nombre de la persona si existe
                "url":             lead['url'],
                "email":           lead['email'],
                "score":           score,
                "tti":             tti,
                "lead_score":      l_score,
                "fallas":          fallas,
                "status":          "Nuevo",
                "ultimo_contacto": "",
                "thread_id":       ""
            }
            leads_a_agregar.append(lead_db)
            insert_lead(lead_db)

    if leads_a_agregar:
        print(f"   ✅ {len(leads_a_agregar)} leads nuevos agregados al CRM.")

    return leads_a_agregar


def _dias_desde(fecha_str: str) -> int | None:
    """Calcula días transcurridos desde una fecha string '%Y-%m-%d %H:%M'."""
    try:
        fecha = datetime.datetime.strptime(str(fecha_str), "%Y-%m-%d %H:%M")
        return (datetime.datetime.now() - fecha).days
    except:
        return None


def _enviar_y_actualizar(row, tipo_email: str, nuevo_status: str, df: pd.DataFrame, index) -> bool:
    """Helper: genera email, lo envía y actualiza el CRM."""
    nombre = str(row.get('nombre', 'N/A'))
    url    = str(row.get('url', ''))
    email  = str(row.get('email', ''))
    score  = row.get('score', 45)
    tti    = row.get('tti', '5s')
    fallas = row.get('fallas', '')

    cuerpo = generar_email(nombre, url, score, tti, fallas, tipo=tipo_email)
    asunto = _generar_asunto(tipo_email, nombre)

    result = send_gmail_message(email, asunto, cuerpo)
    if result:
        ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        df.at[index, 'status'] = nuevo_status
        df.at[index, 'ultimo_contacto'] = ahora
        update_lead_status(email, url, nuevo_status, ahora)
        print(f"   ✅ {nuevo_status} enviado a {nombre}")
        return True
    return False


def _generar_asunto(tipo: str, nombre: str) -> str:
    """Genera el asunto del email según el tipo."""
    asuntos = {
        "primera_auditoria": f"Propuesta de optimización estratégica para {nombre}",
        "followup":          f"Re: Seguimiento sobre la presencia digital de {nombre}",
        "followup_2":        f"Última consulta — {nombre}",
    }
    return asuntos.get(tipo, f"Propuesta para {nombre}")


def process_pipeline():
    """
    Ciclo principal del sistema de ventas autónomo.
    
    Orden de operaciones:
      1️⃣  Detectar respuestas de prospectos en Gmail (IMAP)
      2️⃣  Primer contacto a leads nuevos con lead_score >= 80
      3️⃣  Follow-up #1 a "Contactado" con +3 días sin respuesta
      4️⃣  Follow-up #2 a "Followup-1" con +7 días sin respuesta
      5️⃣  Archivar como "Frío" si llevan +14 días sin respuesta
    """
    print(f"\n{'='*55}")
    print(f"🤖 PIPELINE — {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"{'='*55}")

    # ──── PASO 1: Detectar respuestas de prospectos ────
    respondieron = detectar_respuestas_de_prospectos()
    if respondieron:
        print(f"\n🔥 ¡{len(respondieron)} prospecto(s) respondieron! Revisá el CRM.")

    # ──── Cargar datos frescos del CRM ────
    df = get_all_leads_df()
    if df.empty:
        print("\n📭 CRM vacío. Nada que procesar.")
        return

    # Asegurar columnas
    for col in ["status", "ultimo_contacto", "thread_id", "score", "tti", "lead_score", "fallas"]:
        if col not in df.columns:
            df[col] = ""

    sent_today = get_emails_sent_today(df)
    print(f"\n📊 Actividad de hoy: {sent_today}/{DAILY_LIMIT} emails enviados.")

    if sent_today >= DAILY_LIMIT:
        print("⏸️  Límite diario alcanzado. Ciclo pausado hasta mañana.")
        return

    # ──── PASO 2-5: Procesar cada lead ────
    stats = {"primer_contacto": 0, "followup1": 0, "followup2": 0, "archivados": 0}

    for index, row in df.iterrows():
        if sent_today >= DAILY_LIMIT:
            print(f"\n⏸️  Límite diario alcanzado ({DAILY_LIMIT} emails).")
            break

        status           = str(row.get('status', '')).strip()
        ultimo_contacto  = str(row.get('ultimo_contacto', '')).strip()
        lead_score       = int(row.get('lead_score', 0)) if str(row.get('lead_score', '0')).isdigit() else 0
        nombre           = str(row.get('nombre', 'N/A'))
        email_lead       = str(row.get('email', ''))

        # ── Primer contacto (leads nuevos con buen score) ──
        if status == "Nuevo" and lead_score >= 80:
            print(f"\n🚀 Primer contacto → {nombre} (score: {lead_score})")
            enviado = _enviar_y_actualizar(row, "primera_auditoria", "Contactado", df, index)
            if enviado:
                sent_today += 1
                stats["primer_contacto"] += 1

        # ── Follow-up #1 (Contactado → +3 días sin respuesta) ──
        elif status == "Contactado":
            dias = _dias_desde(ultimo_contacto)
            if dias is not None and dias >= FOLLOWUP_1_DIAS:
                print(f"\n🔄 Follow-up #1 → {nombre} ({dias} días sin respuesta)")
                enviado = _enviar_y_actualizar(row, "followup", "Followup-1", df, index)
                if enviado:
                    sent_today += 1
                    stats["followup1"] += 1

        # ── Follow-up #2 (Followup-1 → +7 días sin respuesta) ──
        elif status == "Followup-1":
            dias = _dias_desde(ultimo_contacto)
            if dias is not None and dias >= FOLLOWUP_2_DIAS:
                print(f"\n🔄 Follow-up #2 → {nombre} ({dias} días sin noticias)")
                enviado = _enviar_y_actualizar(row, "followup_2", "Followup-2", df, index)
                if enviado:
                    sent_today += 1
                    stats["followup2"] += 1

        # ── Archivar como Frío (Followup-2 → +14 días) ──
        elif status == "Followup-2":
            dias = _dias_desde(ultimo_contacto)
            if dias is not None and dias >= ARCHIVAR_DIAS:
                print(f"\n🧊 Archivando como Frío → {nombre} ({dias} días sin actividad)")
                ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                update_lead_status(email_lead, str(row.get('url', '')), "Frío ❄️", ahora)
                stats["archivados"] += 1

    # ──── Resumen del ciclo ────
    print(f"\n{'─'*40}")
    print(f"📋 RESUMEN DEL CICLO:")
    print(f"   Primeros contactos:  {stats['primer_contacto']}")
    print(f"   Follow-ups #1:       {stats['followup1']}")
    print(f"   Follow-ups #2:       {stats['followup2']}")
    print(f"   Archivados (Frío):   {stats['archivados']}")
    print(f"   Total enviados hoy:  {sent_today}/{DAILY_LIMIT}")
    print(f"{'─'*40}\n")


# ─────────────────────────────────────────────
# MAIN — Modo Piloto Automático Continuo
# python automation_engine.py
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "="*55)
    print("🤖 PILOTO AUTOMÁTICO DTS&DOG STUDIO — INICIADO")
    print("   Ctrl+C para detener")
    print("="*55)

    ciclo = 1
    while True:
        print(f"\n\n🔁 CICLO #{ciclo}")

        # 1. Buscar leads nuevos
        discover_new_leads()

        # 2. Procesar pipeline completo
        process_pipeline()

        ciclo += 1
        print(f"\n💤 Próxima ronda en 4 horas...")
        time.sleep(14400)  # 4 horas
