import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Cargar variables de entorno (por si lo corremos en local)
load_dotenv()

GMAIL_USER = os.getenv("GMAIL_USER", "germanovct@gmail.com")
GMAIL_PASS = os.getenv("GMAIL_APP_PASSWORD")

def send_gmail_message(to_email, subject, body_text):
    """
    Envía un email usando el servidor SMTP de Gmail y una App Password.
    Esta arquitectura es 100% Cloud-Native y no produce archivos espurios.
    """
    if not GMAIL_PASS:
        print("❌ ERROR CRÍTICO: Falta la variable de entorno GMAIL_APP_PASSWORD.")
        return None

    try:
        # Crear la estructura del Mensaje B2B Básico
        msg = MIMEMultipart()
        msg['From'] = f"German Ocampo | DTS&DOG <{GMAIL_USER}>"
        msg['To'] = to_email
        msg['Subject'] = subject

        # Adjuntar cuerpo del texto
        msg.attach(MIMEText(body_text, 'plain'))

        # Iniciar conexión segura con el servidor SMTP de Google
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(GMAIL_USER, GMAIL_PASS)
        
        # Disparar Email
        text = msg.as_string()
        server.sendmail(GMAIL_USER, to_email, text)
        server.quit()
        
        print(f"✅ Email High-Ticket enviado con éxito a {to_email}")
        return {"id": "smtp-success", "to": to_email}

    except Exception as e:
        print(f"❌ Error catastrófico al enviar email por SMTP: {e}")
        return None

if __name__ == '__main__':
    # Test rápido de infraestructura
    print("Iniciando prueba de infraestructura SMTP en la nube...")
    test = send_gmail_message("germanovct@gmail.com", "Prueba de Infra", "Si lees esto, SMTP funciona a la perfección.")
    if test:
        print("Infraestructura de correo validada y lista para producción.")
