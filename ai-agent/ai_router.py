"""
╔══════════════════════════════════════════════════════════════════╗
║           AI ROUTER — Multi-Provider Fallback System             ║
║  Gemini → Groq → OpenAI (ChatGPT) → Anthropic (Claude) → Grok  ║
╚══════════════════════════════════════════════════════════════════╝

Cuando un proveedor se queda sin cuota (error 429 / quota exhausted),
automáticamente pasa al siguiente en la cadena.

🆓 GRATIS:
  GEMINI_API_KEY  → console.cloud.google.com (1.500 req/día gratis)
  GROQ_API_KEY    → console.groq.com        (14.400 req/día gratis)

💳 PAGO (con crédito inicial gratis):
  OPENAI_API_KEY    → platform.openai.com
  ANTHROPIC_API_KEY → console.anthropic.com
  GROK_API_KEY      → console.x.ai
"""

import os
import time
import requests
from dotenv import load_dotenv

load_dotenv(override=True)

# ─────────────────────────────────────────────
# CONFIGURACIÓN DE PROVEEDORES
# ─────────────────────────────────────────────
GEMINI_API_KEY    = os.getenv("GEMINI_API_KEY", "")
GROQ_API_KEY      = os.getenv("GROQ_API_KEY", "")       # 🆓 Gratis
OPENAI_API_KEY    = os.getenv("OPENAI_API_KEY", "")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
GROK_API_KEY      = os.getenv("GROK_API_KEY", "")

# Errores que indican cuota agotada (disparan el fallback)
QUOTA_ERRORS = [
    "429", "RESOURCE_EXHAUSTED", "quota", "rate_limit",
    "rate limit", "insufficient_quota", "overloaded",
    "RateLimitError", "529", "too many requests",
    "tokens per", "requests per"
]

def _es_error_de_cuota(error_str: str) -> bool:
    """Detecta si un error es por cuota agotada (no un error de código)."""
    error_lower = error_str.lower()
    return any(kw.lower() in error_lower for kw in QUOTA_ERRORS)


# ─────────────────────────────────────────────
# PROVEEDOR 1: GEMINI (Google) — 🆓 GRATIS
# 1.500 requests/día en tier gratuito
# Registro: console.cloud.google.com
# ─────────────────────────────────────────────
def _llamar_gemini(prompt: str, modelo: str = "gemini-2.0-flash") -> str:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY no configurada")

    from google import genai
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(model=modelo, contents=prompt)
    return response.text


# ─────────────────────────────────────────────
# PROVEEDOR 2: GROQ — 🆓 GRATIS (el mejor backup gratuito)
# ~14.400 requests/día gratis. Modelos: Llama 3.3, Mixtral, Gemma
# Registro: https://console.groq.com
# ─────────────────────────────────────────────
def _llamar_groq(prompt: str, modelo: str = "llama-3.3-70b-versatile") -> str:
    """
    Groq es 100% gratuito con límite generoso.
    Usa la misma API compatible con OpenAI → sin dependencias extra.
    Modelos recomendados para redacción B2B:
      - llama-3.3-70b-versatile  (mejor calidad)
      - llama-3.1-8b-instant     (más rápido)
      - mixtral-8x7b-32768       (buena redacción)
    """
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY no configurada")

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": modelo,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 1024,
        "temperature": 0.7
    }
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30
    )
    if response.status_code == 429:
        raise Exception(f"429 Rate limit Groq: {response.text}")
    if response.status_code != 200:
        raise Exception(f"Groq error {response.status_code}: {response.text}")

    return response.json()["choices"][0]["message"]["content"]


# ─────────────────────────────────────────────
# PROVEEDOR 3: OPENAI (ChatGPT) — 💳 Pago
# Registro: https://platform.openai.com/api-keys
# ─────────────────────────────────────────────
def _llamar_openai(prompt: str, modelo: str = "gpt-4o-mini") -> str:
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY no configurada")

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": modelo,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 1000,
        "temperature": 0.7
    }
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30
    )
    if response.status_code == 429:
        raise Exception(f"429 Rate limit OpenAI: {response.text}")
    if response.status_code != 200:
        raise Exception(f"OpenAI error {response.status_code}: {response.text}")

    return response.json()["choices"][0]["message"]["content"]


# ─────────────────────────────────────────────
# PROVEEDOR 4: ANTHROPIC (Claude) — 💳 Pago
# Registro: https://console.anthropic.com
# ─────────────────────────────────────────────
def _llamar_claude(prompt: str, modelo: str = "claude-3-haiku-20240307") -> str:
    if not ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY no configurada")

    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
    }
    payload = {
        "model": modelo,
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": prompt}]
    }
    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers=headers,
        json=payload,
        timeout=30
    )
    if response.status_code in [429, 529]:
        raise Exception(f"{response.status_code} Rate limit Claude: {response.text}")
    if response.status_code != 200:
        raise Exception(f"Claude error {response.status_code}: {response.text}")

    return response.json()["content"][0]["text"]


# ─────────────────────────────────────────────
# PROVEEDOR 5: GROK (xAI) — 💳 Pago
# Registro: https://console.x.ai
# ─────────────────────────────────────────────
def _llamar_grok_xai(prompt: str, modelo: str = "grok-beta") -> str:
    if not GROK_API_KEY:
        raise ValueError("GROK_API_KEY no configurada")

    headers = {
        "Authorization": f"Bearer {GROK_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": modelo,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 1000,
        "temperature": 0.7
    }
    response = requests.post(
        "https://api.x.ai/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30
    )
    if response.status_code == 429:
        raise Exception(f"429 Rate limit Grok xAI: {response.text}")
    if response.status_code != 200:
        raise Exception(f"Grok xAI error {response.status_code}: {response.text}")

    return response.json()["choices"][0]["message"]["content"]


# ─────────────────────────────────────────────
# ROUTER PRINCIPAL — Cadena de Fallback
# Orden: Gemini (gratis) → Groq (gratis) → OpenAI → Claude → Grok
# ─────────────────────────────────────────────
PROVEEDORES = [
    ("Gemini", _llamar_gemini),   # 🆓 Gratis — Principal
    ("Groq",   _llamar_groq),     # 🆓 Gratis — Backup primario
    ("OpenAI", _llamar_openai),   # 💳 Pago   — Backup secundario
    ("Claude", _llamar_claude),   # 💳 Pago   — Backup terciario
    ("Grok",   _llamar_grok_xai), # 💳 Pago   — Último recurso
]

def generar_con_ia(prompt: str, reintentos: int = 2, pausa_segundos: int = 5) -> str:
    """
    Genera texto con IA usando cadena de fallback automático.

    Orden (gratuitos primero):
      1. Gemini  (Google)    — 🆓 1.500 req/día gratis
      2. Groq    (Meta/OSS)  — 🆓 ~14.400 req/día gratis
      3. OpenAI  (ChatGPT)   — 💳 Pago / crédito inicial
      4. Claude  (Anthropic) — 💳 Pago / crédito inicial
      5. Grok    (xAI)       — 💳 Pago

    Si un proveedor falla por cuota (429), pasa al siguiente.
    Si falla por otro error técnico, también pasa al siguiente.

    Args:
        prompt: El texto del prompt.
        reintentos: Reintentos antes de cambiar de proveedor.
        pausa_segundos: Segundos entre reintentos del mismo proveedor.

    Returns:
        Texto generado por el primer proveedor disponible.

    Raises:
        RuntimeError: Si todos los proveedores fallan.
    """
    proveedores_activos = [(n, f) for n, f in PROVEEDORES
                           if _tiene_api_key(n)]

    if not proveedores_activos:
        raise RuntimeError("❌ No hay API keys configuradas. Agrega al menos una en .env")

    for nombre, funcion in proveedores_activos:
        print(f"   🤖 [{nombre}] Intentando generar respuesta...")

        for intento in range(reintentos + 1):
            try:
                resultado = funcion(prompt)
                print(f"   ✅ [{nombre}] Respuesta generada exitosamente.")
                return resultado

            except Exception as e:
                error_str = str(e)

                if _es_error_de_cuota(error_str):
                    if intento < reintentos:
                        print(f"   ⏳ [{nombre}] Cuota alcanzada. Esperando {pausa_segundos}s... ({intento+1}/{reintentos})")
                        time.sleep(pausa_segundos)
                    else:
                        print(f"   🔄 [{nombre}] Cuota agotada. Cambiando al siguiente proveedor...")
                        break
                else:
                    print(f"   ⚠️ [{nombre}] Error técnico: {error_str[:100]}")
                    break

    raise RuntimeError(
        "🚨 Todos los proveedores de IA fallaron o tienen la cuota agotada. "
        "Revisá tus API keys en .env o esperá antes de reintentar."
    )


def _tiene_api_key(nombre_proveedor: str) -> bool:
    """Verifica si un proveedor tiene API key configurada."""
    mapa = {
        "Gemini": GEMINI_API_KEY,
        "Groq":   GROQ_API_KEY,
        "OpenAI": OPENAI_API_KEY,
        "Claude": ANTHROPIC_API_KEY,
        "Grok":   GROK_API_KEY,
    }
    return bool(mapa.get(nombre_proveedor, "").strip())


def estado_proveedores() -> dict:
    """
    Devuelve el estado de todos los proveedores.
    Útil para debugging y el dashboard.
    """
    return {
        "Gemini (Google)   🆓": "✅ Configurado" if GEMINI_API_KEY    else "❌ Sin API key  →  console.cloud.google.com",
        "Groq (Meta Llama) 🆓": "✅ Configurado" if GROQ_API_KEY      else "❌ Sin API key  →  console.groq.com",
        "OpenAI (ChatGPT)  💳": "✅ Configurado" if OPENAI_API_KEY    else "❌ Sin API key  →  platform.openai.com",
        "Claude (Anthropic)💳": "✅ Configurado" if ANTHROPIC_API_KEY else "❌ Sin API key  →  console.anthropic.com",
        "Grok (xAI)        💳": "✅ Configurado" if GROK_API_KEY      else "❌ Sin API key  →  console.x.ai",
    }


# ─────────────────────────────────────────────
# TEST LOCAL — python ai_router.py
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("\n🔍 Estado de proveedores de IA:\n")
    for proveedor, estado in estado_proveedores().items():
        print(f"   {estado}  |  {proveedor}")

    print("\n🧪 Testeando generación con fallback automático...\n")
    prompt_test = (
        "Escribí una frase motivacional corta para un emprendedor tech argentino. "
        "Máximo 2 oraciones. En español."
    )

    try:
        respuesta = generar_con_ia(prompt_test)
        print(f"\n💬 Respuesta:\n{respuesta}")
    except RuntimeError as e:
        print(f"\n{e}")
