"""
╔══════════════════════════════════════════════════════════╗
║      ENRICHER — Enriquecimiento de Leads con CEO         ║
║  Busca el nombre del dueño/CEO para personalizar emails  ║
╚══════════════════════════════════════════════════════════╝
"""

import requests
import re
import time
from bs4 import BeautifulSoup
from ai_router import generar_con_ia
import urllib.parse
import urllib3

urllib3.disable_warnings()


def _buscar_nombre_en_duckduckgo(empresa: str, url: str) -> str | None:
    """
    Busca en DuckDuckGo el nombre del dueño/CEO/director de la empresa.
    Retorna el texto de los primeros resultados para que la IA extraiga el nombre.
    """
    queries = [
        f'"{empresa}" CEO fundador director site:{url.split(".")[0]}',
        f'"{empresa}" fundador propietario nombre',
    ]

    for query in queries:
        try:
            encoded = urllib.parse.quote(query)
            search_url = f"https://html.duckduckgo.com/html/?q={encoded}"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                              '(KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
            }
            response = requests.get(search_url, headers=headers, timeout=8, verify=False)
            soup = BeautifulSoup(response.text, "html.parser")

            # Extraer texto de los primeros 3 resultados
            snippets = []
            for item in soup.find_all("a", class_="result__snippet")[:3]:
                snippets.append(item.get_text(strip=True))

            if snippets:
                return " | ".join(snippets)

        except Exception:
            continue

        time.sleep(0.5)

    return None


def obtener_nombre_ceo(nombre_empresa: str, url: str) -> str:
    """
    Intenta encontrar el nombre del CEO/fundador de la empresa.
    
    Estrategia:
      1. Busca en DuckDuckGo snippets sobre la empresa + 'CEO/fundador'
      2. Le pide a Groq/IA que extraiga el nombre de los resultados
      3. Si no encuentra nada concreto, retorna el nombre de la empresa (fallback)
    
    Args:
        nombre_empresa: Nombre de la empresa
        url: Dominio de la empresa
    
    Returns:
        Nombre de la persona (ej: "Martín") o nombre empresa como fallback
    """
    try:
        texto_resultados = _buscar_nombre_en_duckduckgo(nombre_empresa, url)

        if not texto_resultados:
            return nombre_empresa  # Fallback simple

        prompt = f"""Tengo el siguiente texto de resultados de búsqueda sobre la empresa "{nombre_empresa}":

---
{texto_resultados[:500]}
---

Extraé SOLO el primer nombre (nombre de pila) del CEO, fundador, dueño o director de esa empresa.
Si no hay un nombre claro en el texto, respondé exactamente: NO_ENCONTRADO
Respondé ÚNICAMENTE con el primer nombre, nada más. Sin puntos, sin apellido, sin explicaciones."""

        respuesta = generar_con_ia(prompt)
        nombre_extraido = respuesta.strip().split()[0] if respuesta else "NO_ENCONTRADO"

        # Validar que sea un nombre (no un error o frase)
        es_valido = (
            nombre_extraido != "NO_ENCONTRADO"
            and len(nombre_extraido) >= 2
            and len(nombre_extraido) <= 20
            and nombre_extraido.replace("-", "").isalpha()
        )

        if es_valido:
            return nombre_extraido.capitalize()
        else:
            return nombre_empresa  # Fallback: usar nombre de la empresa

    except Exception as e:
        return nombre_empresa  # Siempre fallback seguro


def enriquecer_leads(leads: list[dict]) -> list[dict]:
    """
    Agrega el campo 'contacto' a cada lead con el nombre del CEO/dueño.
    
    Args:
        leads: Lista de dicts con al menos 'nombre' y 'url'
    
    Returns:
        La misma lista de leads con el campo 'contacto' agregado
    """
    print(f"\n🔍 Enriqueciendo {len(leads)} leads con nombre de contacto...")
    
    for i, lead in enumerate(leads):
        nombre_empresa = lead.get("nombre", "")
        url            = lead.get("url", "")
        
        print(f"   [{i+1}/{len(leads)}] Buscando contacto para: {nombre_empresa}...")
        nombre_contacto = obtener_nombre_ceo(nombre_empresa, url)
        lead["contacto"] = nombre_contacto
        
        if nombre_contacto != nombre_empresa:
            print(f"          ✅ Encontrado: {nombre_contacto}")
        else:
            print(f"          ℹ️  Usando nombre empresa como fallback")
        
        time.sleep(1)  # Pausa amigable entre búsquedas
    
    return leads


# ─────────────────────────────────────────────
# TEST LOCAL — python enricher.py
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("🔍  ENRICHER — TEST")
    print("=" * 50)

    leads_test = [
        {"nombre": "Mercado Libre", "url": "mercadolibre.com.ar"},
        {"nombre": "Rappi Argentina", "url": "rappi.com.ar"},
    ]

    enriquecidos = enriquecer_leads(leads_test)

    print("\n📋 Resultado:")
    for l in enriquecidos:
        print(f"   {l['nombre']} → Contacto: {l['contacto']}")
