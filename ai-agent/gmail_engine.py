import os
import base64
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Si modificas estos alcances, elimina el archivo token.json.
SCOPES = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify'
]

def get_gmail_service():
    """Autentica y devuelve el servicio de Gmail API."""
    creds = None
    # El archivo token.json almacena los tokens de acceso y actualización del usuario.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    # Si no hay credenciales válidas generadas, deja que el usuario inicie sesión.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists('credentials.json'):
                raise FileNotFoundError("No se encontró 'credentials.json'. Por favor, descárgalo desde Google Cloud Console.")
            
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Guardar las credenciales para la próxima ejecución
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('gmail', 'v1', credentials=creds)
        return service
    except Exception as error:
        print(f'Ocurrió un error: {error}')
        return None

def send_gmail_message(to, subject, body, thread_id=None):
    """Envía un email usando Gmail API."""
    service = get_gmail_service()
    if not service:
        return None

    try:
        message = MIMEText(body)
        message['to'] = to
        message['subject'] = subject
        
        # Codificar el mensaje
        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        
        message_body = {'raw': raw_message}
        if thread_id:
            message_body['threadId'] = thread_id

        sent_message = service.users().messages().send(userId='me', body=message_body).execute()
        print(f'Email enviado con éxito (ID: {sent_message["id"]})')
        return sent_message
    except HttpError as error:
        print(f'Error al enviar email: {error}')
        return None

if __name__ == '__main__':
    # Prueba rápida (requiere credentials.json)
    try:
        print("Probando conexión con Gmail...")
        service = get_gmail_service()
        if service:
            print("✅ Conexión exitosa. Gmail API lista.")
    except Exception as e:
        print(f"❌ Error: {e}")
