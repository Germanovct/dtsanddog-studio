import subprocess
import time
import sys
import os

def start_engine():
    print("🚀 INICIANDO MOTOR DE VENTAS DTS&DOG STUDIO...")
    
    # 1. Iniciar API (Backend de Leads)
    python_exe = "./ai-agent/venv/bin/python"
    print(f"📡 Iniciando API de Leads (Puerto 8000) usando {python_exe}...")
    api_proc = subprocess.Popen([python_exe, "ai-agent/api.py"])
    
    # 2. Iniciar Motor de Automatización (Follow-ups)
    print("🤖 Iniciando Motor de Automatización...")
    auto_proc = subprocess.Popen([python_exe, "ai-agent/automation_engine.py"])
    
    # 3. Iniciar Dashboard (CRM)
    print("📊 Iniciando Dashboard CRM (Streamlit)...")
    # Nota: Streamlit se lanza con un comando específico
    dash_proc = subprocess.Popen(["./ai-agent/venv/bin/streamlit", "run", "ai-agent/dashboard.py"])
    
    print("\n✅ ¡Todo el sistema está en marcha!")
    print("Presiona Ctrl+C para detener todos los procesos.")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Deteniendo procesos...")
        api_proc.terminate()
        auto_proc.terminate()
        dash_proc.terminate()
        print("Done.")

if __name__ == "__main__":
    start_engine()
