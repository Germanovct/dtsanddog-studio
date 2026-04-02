from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import datetime
import os
from gmail_engine import send_gmail_message
from main import generar_email

app = FastAPI()

# Configurar CORS para permitir peticiones desde el frontend (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción poner el dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = "prospectos_calificados.csv"

class Lead(BaseModel):
    nombre: str
    email: str
    empresa: str = ""
    telefono: str = ""
    servicio: str = ""
    presupuesto: str = ""
    mensaje: str = ""

@app.post("/api/leads")
async def create_lead(lead: Lead):
    try:
        # 1. Guardar en el CRM (CSV)
        ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        new_row = {
            "nombre": lead.nombre,
            "url": lead.empresa, # Usamos empresa como URL si no hay sitio
            "email": lead.email,
            "score": 0,
            "tti": "N/A",
            "lead_score": 100, # Leads directos son máxima prioridad
            "status": "Contactado",
            "ultimo_contacto": ahora,
            "thread_id": ""
        }
        
        df_new = pd.DataFrame([new_row])
        if os.path.exists(CSV_PATH):
            df_new.to_csv(CSV_PATH, mode='a', header=False, index=False)
        else:
            df_new.to_csv(CSV_PATH, index=False)

        # 2. Enviar Email de Bienvenida Automático via Gmail API
        asunto = f"Gracias por contactar a DTS&DOG Studio - {lead.nombre}"
        
        # Generar cuerpo personalizado con Gemini si es posible
        cuerpo = f"Hola {lead.nombre},\n\nGracias por tu interés en {lead.servicio}. He recibido tu mensaje sobre '{lead.mensaje}'.\n\nMe pondré en contacto con vos en las próximas 24 horas para agendar una breve llamada estratégica.\n\nAtentamente,\n\nGermán Ocampo\nCEO DTS&DOG Studio"
        
        # Intentar enviar (falla silenciosamente si no hay credentials.json)
        try:
            send_gmail_message(lead.email, asunto, cuerpo)
        except:
            print("⚠️ No se pudo enviar el correo (posible falta de credentials.json)")

        return {"status": "success", "message": "Lead registrado y procesado."}
    
    except Exception as e:
        print(f"Error en API: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
