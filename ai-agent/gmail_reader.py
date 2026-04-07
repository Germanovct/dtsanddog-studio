"""
╔══════════════════════════════════════════════════════════╗
║       GMAIL READER — Detección de Respuestas IMAP        ║
║  Escanea la bandeja de Gmail y detecta si algún          ║
║  prospecto del CRM respondió. Actualiza Supabase.        ║
╚══════════════════════════════════════════════════════════╝
"""

import imaplib
import email
import os
from email.header import decode_header
from dotenv import load_dotenv
from db import get_all_leads_df, update_lead_status
import datetime

load_dotenv(override=True)

GMAIL_USER = os.getenv("GMAIL_USER", os.getenv("EMAIL_USER", ""))
GMAIL_PASS = os.getenv("GMAIL_APP_PASSWORD", os.getenv("EMAIL_PASS", ""))


def _decodificar_header(valor):
    """Decodifica headers de email que pueden venir en base64 o latin-1."""
    if not valor:
        return ""
    partes = decode_header(valor)
    resultado = ""
    for parte, encoding in partes:
        if isinstance(parte, bytes):
            resultado += parte.decode(encoding or "utf-8", errors="ignore")
        else:
            resultado += parte
    return resultado


def _conectar_imap():
    """Establece conexión IMAP con Gmail."""
    if not GMAIL_USER or not GMAIL_PASS:
        raise ValueError("Faltan GMAIL_USER / GMAIL_APP_PASSWORD en .env")
    
    mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
    mail.login(GMAIL_USER, GMAIL_PASS)
    return mail


def obtener_emails_recibidos(dias_atras: int = 30) -> list[dict]:
    """
    Obtiene los últimos emails recibidos en la bandeja de entrada.
    
    Args:
        dias_atras: Cuántos días atrás buscar (default: 30 días)
    
    Returns:
        Lista de dicts con: {from_email, from_name, subject, date, snippet}
    """
    try:
        mail = _conectar_imap()
        mail.select("INBOX")
        
        # Buscar emails recibidos en los últimos N días
        fecha_desde = (datetime.datetime.now() - datetime.timedelta(days=dias_atras))
        fecha_imap = fecha_desde.strftime("%d-%b-%Y")
        
        _, mensajes = mail.search(None, f'(SINCE "{fecha_imap}")')
        ids = mensajes[0].split()
        
        emails_recibidos = []
        
        # Procesamos los últimos 50 para no sobrecargar
        for msg_id in ids[-50:]:
            try:
                _, datos = mail.fetch(msg_id, "(RFC822)")
                msg = email.message_from_bytes(datos[0][1])
                
                remitente_raw = msg.get("From", "")
                from_email = ""
                from_name = ""
                
                # Extraer email del campo From
                if "<" in remitente_raw and ">" in remitente_raw:
                    from_name  = remitente_raw.split("<")[0].strip().strip('"')
                    from_email = remitente_raw.split("<")[1].rstrip(">").strip()
                else:
                    from_email = remitente_raw.strip()
                
                from_email = from_email.lower()
                subject    = _decodificar_header(msg.get("Subject", ""))
                date_str   = msg.get("Date", "")
                
                # Extraer snippet del cuerpo
                snippet = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            try:
                                snippet = part.get_payload(decode=True).decode("utf-8", errors="ignore")[:200]
                            except:
                                pass
                            break
                else:
                    try:
                        snippet = msg.get_payload(decode=True).decode("utf-8", errors="ignore")[:200]
                    except:
                        pass
                
                emails_recibidos.append({
                    "from_email": from_email,
                    "from_name": from_name,
                    "subject": subject,
                    "date": date_str,
                    "snippet": snippet.strip()
                })
                
            except Exception as e:
                continue
        
        mail.logout()
        return emails_recibidos
        
    except Exception as e:
        print(f"   ❌ Error IMAP: {e}")
        return []


def detectar_respuestas_de_prospectos() -> list[dict]:
    """
    Función principal: compara bandeja de entrada con CRM de Supabase.
    Si algún prospecto respondió → actualiza status a 'Respondió' en Supabase.
    
    Returns:
        Lista de leads que respondieron en esta sesión.
    """
    print("\n📬 Escaneando bandeja de entrada en busca de respuestas...")
    
    # Cargar prospectos del CRM
    df = get_all_leads_df()
    if df.empty:
        print("   ℹ️  CRM vacío. Nada que chequear.")
        return []
    
    # Solo nos interesan los contactados (no los que ya respondieron)
    estados_activos = ["Contactado", "Followup-1", "Followup-2"]
    df_activos = df[df["status"].isin(estados_activos)]
    
    if df_activos.empty:
        print("   ℹ️  No hay prospectos activos en seguimiento.")
        return []
    
    emails_prospecto = set(df_activos["email"].str.lower().tolist())
    print(f"   🎯 Monitoreando {len(emails_prospecto)} prospectos activos...")
    
    # Obtener emails recibidos (últimos 30 días)
    recibidos = obtener_emails_recibidos(dias_atras=30)
    
    if not recibidos:
        print("   📭 No se pudo leer la bandeja o está vacía.")
        return []
    
    print(f"   📨 {len(recibidos)} emails leídos de la bandeja.")
    
    respondieron = []
    
    for mail_recibido in recibidos:
        from_email = mail_recibido["from_email"]
        
        if from_email in emails_prospecto:
            # Buscar el lead en el CRM
            fila = df_activos[df_activos["email"].str.lower() == from_email]
            if fila.empty:
                continue
            
            lead = fila.iloc[0]
            nombre = lead.get("nombre", from_email)
            url    = lead.get("url", "")
            
            print(f"\n   🔥 ¡RESPUESTA DETECTADA! {nombre} ({from_email})")
            print(f"      Asunto: {mail_recibido['subject']}")
            print(f"      Preview: {mail_recibido['snippet'][:100]}...")
            
            # Actualizar en Supabase
            ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
            update_lead_status(from_email, url, "Respondió 🔥", ahora)
            
            respondieron.append({
                "nombre": nombre,
                "email": from_email,
                "asunto": mail_recibido["subject"],
                "snippet": mail_recibido["snippet"],
                "fecha": mail_recibido["date"]
            })
    
    if respondieron:
        print(f"\n   ✅ {len(respondieron)} prospecto(s) respondieron. CRM actualizado.")
    else:
        print("   😴 Sin respuestas nuevas de prospectos.")
    
    return respondieron


# ─────────────────────────────────────────────
# TEST LOCAL — python gmail_reader.py
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 55)
    print("📬  GMAIL READER — TEST DE DETECCIÓN DE RESPUESTAS")
    print("=" * 55)
    respondieron = detectar_respuestas_de_prospectos()
    
    if respondieron:
        print(f"\n🎉 ¡{len(respondieron)} lead(s) respondieron!")
        for r in respondieron:
            print(f"  🔥 {r['nombre']} — {r['asunto']}")
    else:
        print("\n✅ Test completado. Sin respuestas nuevas.")
