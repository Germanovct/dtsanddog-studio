"""
╔══════════════════════════════════════════════════════════╗
║      SCHEDULER — Piloto Automático Diario                ║
║  Corre el pipeline completo todos los días a las 9 AM   ║
║  Usá: python scheduler.py                               ║
╚══════════════════════════════════════════════════════════╝

Requiere: pip install apscheduler
"""

import os
import sys
import datetime
import logging

# Asegurar imports desde el directorio del agente
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
load_dotenv(override=True)

try:
    from apscheduler.schedulers.blocking import BlockingScheduler
    from apscheduler.triggers.cron import CronTrigger
except ImportError:
    print("❌ APScheduler no está instalado.")
    print("   Instalá con: pip install apscheduler")
    sys.exit(1)

from automation_engine import discover_new_leads, process_pipeline

# ─────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
    handlers=[
        logging.FileHandler("agente_log.txt", encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("DTS&DOG Scheduler")


def ciclo_diario():
    """
    Ciclo completo que corre automáticamente cada día.
    1. Busca nuevos leads en los nichos target
    2. Procesa toda la cadena de follow-ups
    3. Detecta respuestas de prospectos
    """
    logger.info("=" * 55)
    logger.info(f"🤖 CICLO DIARIO — {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}")
    logger.info("=" * 55)
    
    try:
        # 1. Caza de nuevos leads
        logger.info("🔍 FASE 1: Buscando nuevos leads...")
        nuevos = discover_new_leads()
        logger.info(f"   ✅ {len(nuevos)} leads nuevos encontrados.")
        
        # 2. Pipeline completo (contactos + follow-ups + detección respuestas)
        logger.info("🚀 FASE 2: Ejecutando pipeline completo...")
        process_pipeline()
        
        logger.info("✅ Ciclo diario completado exitosamente.")
        
    except Exception as e:
        logger.error(f"❌ Error en ciclo diario: {e}", exc_info=True)


# ─────────────────────────────────────────────
# SCHEDULER PRINCIPAL
# ─────────────────────────────────────────────
if __name__ == "__main__":
    scheduler = BlockingScheduler(timezone="America/Argentina/Buenos_Aires")
    
    # ── Corre todos los días de lunes a viernes a las 9:00 AM ──
    scheduler.add_job(
        ciclo_diario,
        trigger=CronTrigger(
            day_of_week="mon-fri",   # Lunes a Viernes
            hour=9,
            minute=0,
            timezone="America/Argentina/Buenos_Aires"
        ),
        id="ciclo_diario_mañana",
        name="Pipeline B2B — 9 AM",
        replace_existing=True
    )
    
    # ── Segunda ronda a las 15:00 (por si quedaron leads sin contactar) ──
    scheduler.add_job(
        ciclo_diario,
        trigger=CronTrigger(
            day_of_week="mon-fri",
            hour=15,
            minute=0,
            timezone="America/Argentina/Buenos_Aires"
        ),
        id="ciclo_diario_tarde",
        name="Pipeline B2B — 15 PM",
        replace_existing=True
    )
    
    print("\n" + "="*55)
    print("⏰  SCHEDULER DTS&DOG STUDIO — ACTIVO")
    print("    Horarios: Lun-Vie 9:00 AM y 15:00 PM (Argentina)")
    print("    Logs:     agente_log.txt")
    print("    Ctrl+C para detener")
    print("="*55)
    
    # Mostrar próximas ejecuciones
    jobs = scheduler.get_jobs()
    print("\n📅 Próximas ejecuciones programadas:")
    for job in jobs:
        print(f"   • {job.name}: {job.next_run_time}")
    
    print("\n💡 TIP: Para correr AHORA manualmente, ejecutá:")
    print("   python -c \"from automation_engine import *; discover_new_leads(); process_pipeline()\"")
    print()
    
    try:
        scheduler.start()
    except KeyboardInterrupt:
        print("\n\n🛑 Scheduler detenido manualmente.")
        scheduler.shutdown()
