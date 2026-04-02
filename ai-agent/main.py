import requests
import csv
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from google import genai

# =========================
# CONFIG
# =========================
load_dotenv(override=True)

PAGESPEED_API_KEY = os.getenv("GOOGLE_PAGESPEED_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

EMAIL = os.getenv("EMAIL_USER")
PASSWORD = os.getenv("EMAIL_PASS")

client = genai.Client(api_key=GEMINI_API_KEY)

# =========================
# ANALISIS WEB
# =========================
def analizar_web(url):
    try:
        api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://{url}&key={PAGESPEED_API_KEY}"
        response = requests.get(api_url)
        data = response.json()

        score = data["lighthouseResult"]["categories"]["performance"]["score"] * 100
        tti = data["lighthouseResult"]["audits"]["interactive"]["displayValue"]

        return round(score), tti

    except:
        # fallback mock si falla API
        return 45, "5.2 s"

# =========================
# SCORING LEAD
# =========================
def calcular_lead_score(score):
    if score < 50:
        return 90
    elif score < 70:
        return 75
    else:
        return 50

# =========================
# GENERAR EMAIL CON IA
# =========================
def generar_email(nombre, url, score, tti, tipo="primera_auditoria"):
    if tipo == "primera_auditoria":
        prompt = f"""Escribí un Cold Email formal y directo para {nombre} ({url}). 
        Rendimiento: {score}/100. TTI: {tti}. 
        Usá Español de Argentina CORPORATIVO FORMAL (Vustedes/Usted). 
        Invitá a una llamada de 10 min. Firma como Germán Ocampo CEO DTS&DOG."""
    else:
        prompt = f"""Escribí un Follow-up corto (3 frases) para {nombre} ({url}). 
        Ya enviamos auditoría y no respondieron. Sé elegante, breve y pedí 5 min para destrabar su crecimiento. 
        Mismo tono formal B2B. Firma como Germán."""

    import time
    for intento in range(3):
        try:
            response = client.models.generate_content(
                model='gemini-2.0-flash', # o el modelo que prefieras
                contents=prompt
            )
            return response.text
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                print(f"   ⏳ Límite gratuito de IA alcanzado. Pausando 30 segundos... ({intento+1}/3)")
                time.sleep(30)
            else:
                raise e
    return "Error generando email por límite de cuota gratuita de Google.".strip()

# =========================
# ENVIAR EMAIL
# =========================
def enviar_email(destinatario, asunto, mensaje):
    msg = MIMEText(mensaje, "plain", "utf-8")
    msg["Subject"] = asunto
    msg["From"] = f"Germán – DT&DOG Studio <{EMAIL}>"
    msg["To"] = destinatario
    msg.add_header('reply-to', 'contacto@dtsanddog-studio.com')

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL, PASSWORD)
            server.sendmail(EMAIL, destinatario, msg.as_string())

        print(f"📩 Email enviado a {destinatario}")

    except Exception as e:
        print(f"❌ Error enviando email: {e}")

# =========================
# LEADS (RUTINA DE CARGA)
# =========================
import buscador

def cargar_leads(archivo="leads.csv"):
    if not os.path.exists(archivo):
        print(f"❌ No se encontró {archivo}. Creando un archivo base...")
        with open(archivo, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=["nombre", "url", "email"])
            writer.writeheader()
            writer.writerow({"nombre": "Restaurante de Prueba", "url": "restaurante.com", "email": "tucorreo@dtanddog.com"})
        print(f"👉 Por favor, agregá tus prospectos reales en el archivo '{archivo}' (nombre, url, email).")
        print("👉 Luego, volvé a correr este agente.")
        exit(1)
    
    lista = []
    with open(archivo, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get("nombre") and row.get("url") and row.get("email"):
                lista.append(row)
                
    if not lista:
        print(f"❌ El archivo {archivo} está vacío. Agregá prospectos primero.")
        exit(1)
        
    return lista

if __name__ == "__main__":
    print("\n🤖 AGENTE DE VENTAS AUTÓNOMO 🤖")
    print("1. Buscar nuevos clientes en internet automáticamente")
    print("2. Cargar clientes manualmente desde leads.csv")
    opcion = input("Elige una opción (1 o 2): ").strip()
    
    if opcion == "1":
        query = input("¿Qué tipo de empresas buscamos hoy? (Ej: 'Odontologo en Cordoba'): ")
        print("\nIniciando motor de búsqueda inteligente... esto puede tomar 1 o 2 minutos.")
        leads = buscador.buscar_leads_prospectos(query, max_resultados=5)
        if not leads:
            print("\n❌ No se encontraron empresas con correo electrónico visible en esta búsqueda. ¡Intenta con otra ciudad u otro rubro!")
            exit(1)
        print(f"\n✅ ¡Búsqueda completada! Pasando a la fase de Análisis y Ventas con {len(leads)} prospectos.\n")
    else:
        leads = cargar_leads()
    
    # =========================
    # MAIN (ANÁLISIS Y ENVÍO)
    # =========================
    resultados = []
    
    for lead in leads:
        print(f"\n🎯 Analizando: {lead['nombre']}")
    
        score, tti = analizar_web(lead["url"])
        lead_score = calcular_lead_score(score)
    
        print(f"✅ Score: {score} | TTI: {tti} | Lead Score: {lead_score}")
    
        if lead_score >= 60:
            email_generado = generar_email(
                lead["nombre"],
                lead["url"],
                score,
                tti
            )
    
            print("\n📩 EMAIL GENERADO:\n")
            print(email_generado)
    
            confirmar = input("\n¿Enviar este email? (y/n): ")
    
            if confirmar.lower() == "y":
                enviar_email(
                    lead["email"],
                    "Idea rápida sobre su web",
                    email_generado
                )
    
            resultados.append({
                "nombre": lead["nombre"],
                "url": lead["url"],
                "email": lead["email"],
                "score": score,
                "tti": tti,
                "lead_score": lead_score
            })
    
    # =========================
    # EXPORTAR CSV
    # =========================
    with open("prospectos_calificados.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=resultados[0].keys())
        writer.writeheader()
        writer.writerows(resultados)
    
    print("\n📁 Archivo generado: prospectos_calificados.csv")