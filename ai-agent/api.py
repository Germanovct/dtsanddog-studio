from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime
import os
import threading
import time
from gmail_engine import send_gmail_message
from db import insert_visit, insert_lead
# Omitimos main import para evitar circular dependencies si automation_engine corre de fondo.
# Usamos el motor principal encapsulado:
from automation_engine import process_pipeline

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Lead(BaseModel):
    nombre: str
    email: str
    empresa: str = ""
    telefono: str = ""
    servicio: str = ""
    presupuesto: str = ""
    mensaje: str = ""

class VisitLog(BaseModel):
    path: str
    referrer: str = ""

def bg_automation_worker():
    """ Hilo en segundo plano que despierta al motor AI Caza-Leads cada 2 horas """
    while True:
        try:
            print("🚀 [WORKER INICIADO] Escaneando y enviando propuestas automáticas...")
            # Llama a la función principal del motor de automatización.
            # Asegúrate que ejecutar_pipeline_completo no sea un loop infinito, sino que haga 1 corrida.
            process_pipeline()
            print("💤 [WORKER DORMIDO] Esperando para la próxima corrida.")
        except Exception as e:
            print(f"❌ [WORKER ERROR]: {e}")
        
        # Duerme 2 horas = 7200 segundos
        time.sleep(7200)

@app.on_event("startup")
def start_background_jobs():
    print("🔥 Iniciando el CRM API y el Trabajador Autónomo B2B...")
    # Iniciamos el worker en Daemon para que si la API muere, el hilo muera
    thread = threading.Thread(target=bg_automation_worker, daemon=True)
    thread.start()

@app.post("/api/track")
async def track_visit(visit: VisitLog, request: Request):
    try:
        ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        ip = request.client.host
        
        new_visit = {
            "timestamp": ahora,
            "path": visit.path,
            "referrer": visit.referrer,
            "ip": ip
        }
        insert_visit(new_visit)
        return {"status": "success"}
    except Exception as e:
        print(f"Error tracking visit: {e}")
        return {"status": "error"}

@app.post("/api/leads")
async def create_lead(lead: Lead):
    try:
        # 1. Guardar en el CRM (Supabase)
        ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        new_row = {
            "nombre": lead.nombre,
            "url": lead.empresa, # Usamos empresa como URL si no hay sitio
            "email": lead.email,
            "score": 0,
            "tti": "N/A",
            "lead_score": 100, # Leads directos son máxima prioridad "Hot"
            "status": "Inbound Meeting",
            "ultimo_contacto": ahora,
            "thread_id": ""
        }
        insert_lead(new_row)

        # 2. Enviar Email de Bienvenida Automático via SMTP App pass
        asunto = f"Confirmación DTS&DOG Studio - {lead.nombre}"
        cuerpo = f"Hola {lead.nombre},\n\nGracias por confirmar tu interés en {lead.servicio}.\n\nNos vemos en nuestra ventana de Zoom programada para discutir sobre '{lead.mensaje}'. Tu negocio tiene tremendo potencial.\n\nAtentamente,\n\nGermán Ocampo\nCEO DTS&DOG Studio"
        
        try:
            send_gmail_message(lead.email, asunto, cuerpo)
        except:
            print("⚠️ Falla silenciosa de email.")

        return {"status": "success", "message": "Lead Inbound registrado en Supabase."}
    
    except Exception as e:
        print(f"Error en API Inbound: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Render usa la variable de entorno PORT dinámicamente
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
