import time
import requests
from bs4 import BeautifulSoup
import re
import urllib.parse
import urllib3
import os
from dotenv import load_dotenv

load_dotenv(override=True)
urllib3.disable_warnings()

# ─────────────────────────────────────────────
# CONFIGURACIÓN BRAVE SEARCH API
# Gratis: 2.000 queries/mes sin tarjeta
# Registro: https://api.search.brave.com
# ─────────────────────────────────────────────
BRAVE_API_KEY = os.getenv("BRAVE_SEARCH_API_KEY", "")

# Directorios que NO son empresas reales
DIRECTORIOS = [
    'facebook.com', 'instagram.com', 'linkedin.com', 'yelp.com',
    'paginasamarillas.', 'tripadvisor.', 'mercadolibre.', 'twitter.com',
    'tiktok.com', 'doctoralia.', 'guiadentistas.', 'youtube.com',
    'pinterest.', 'google.com', 'bing.com', 'wikipedia.', 'indeed.com',
    'infobae.', 'clarin.', 'lanacion.', 'pagina12.', 'zonaprop.',
    'argenprop.', 'booking.com', 'airbnb.', 'amazon.', 'mercadopago.'
]


# ─────────────────────────────────────────────
# MÉTODO 1: Brave Search API (Primario)
# ─────────────────────────────────────────────
def buscar_con_brave(query, max_resultados=10):
    """
    Brave Search API — Gratis: 2.000 queries/mes, sin tarjeta.
    Registro: https://api.search.brave.com
    """
    if not BRAVE_API_KEY:
        return []

    print(f"\n🦁 [BRAVE API] Buscando: '{query}'...")
    resultados = []

    try:
        headers = {
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
            "X-Subscription-Token": BRAVE_API_KEY
        }
        params = {
            "q": query + " contacto email",
            "count": 10,
            "search_lang": "es",
            "country": "AR"
        }
        response = requests.get(
            "https://api.search.brave.com/res/v1/web/search",
            headers=headers,
            params=params,
            timeout=15
        )

        if response.status_code == 429:
            print("   ⚠️ Cuota de Brave API agotada por hoy. Usando fallback.")
            return resultados

        if response.status_code != 200:
            print(f"   ⚠️ Error Brave API: {response.status_code}")
            return resultados

        data = response.json()
        items = data.get("web", {}).get("results", [])

        for item in items:
            link  = item.get("url", "")
            titulo = item.get("title", "")

            es_directorio = any(d in link for d in DIRECTORIOS)
            if not link or es_directorio:
                continue

            dominio = link.split('//')[-1].split('/')[0].replace('www.', '')
            nombre  = titulo.split('|')[0].split('-')[0].strip()[:60]
            if not nombre:
                nombre = dominio.split('.')[0].capitalize()

            if not any(r['url'] == dominio for r in resultados):
                resultados.append({'nombre': nombre, 'url': dominio, 'telefono': ''})

            if len(resultados) >= max_resultados:
                break

    except Exception as e:
        print(f"   ❌ Error Brave API: {e}")

    print(f"   ✅ Brave encontró {len(resultados)} sitios candidatos.")
    return resultados


# ─────────────────────────────────────────────
# MÉTODO 2: DuckDuckGo HTML (Fallback gratuito)
# ─────────────────────────────────────────────
def buscar_con_duckduckgo(query, max_resultados=10):
    """
    Scraping del HTML de DuckDuckGo. Sin API key. Ilimitado pero con rate limits.
    Se usa como fallback si no hay Google API key configurada.
    """
    print(f"\n🦆 [DUCKDUCKGO FALLBACK] Buscando: '{query}'...")
    resultados = []

    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query + ' contacto sitio web')}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')

        for a in soup.find_all('a', class_='result__url'):
            link = a.get('href', '')
            if link.startswith('//duckduckgo.com/l/?uddg='):
                try:
                    link = urllib.parse.unquote(link.split('uddg=')[1].split('&')[0])
                except:
                    pass

            if not link.startswith('http'):
                link = 'https://' + link.strip()

            es_directorio = any(d in link for d in DIRECTORIOS)
            if link and not es_directorio and 'duckduckgo.com' not in link:
                dominio = link.split('//')[-1].split('/')[0].replace('www.', '')
                nombre = dominio.split('.')[0].capitalize()

                if not any(r['nombre'] == nombre for r in resultados):
                    resultados.append({'nombre': nombre, 'url': link, 'telefono': ''})

            if len(resultados) >= max_resultados:
                break

    except Exception as e:
        print(f"   ❌ Error DuckDuckGo: {e}")

    return resultados


# ─────────────────────────────────────────────
# EXTRACTOR DE EMAIL (sin cambios, ya funciona)
# ─────────────────────────────────────────────
def extraer_email_de_url(url, timeout=10):
    print(f"   🌐 Analizando: {url}...")

    if not url.startswith('http'):
        url = f"https://{url}"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers, timeout=timeout, verify=False)

        if response.status_code >= 400:
            return None

        soup = BeautifulSoup(response.text, 'html.parser')

        # 1. Buscar mailto: links
        for a in soup.find_all('a', href=True):
            if a['href'].startswith('mailto:'):
                email = a['href'].replace('mailto:', '').split('?')[0].strip()
                if email and '@' in email:
                    return email

        # 2. Regex sobre el texto de la página
        texto = soup.get_text()
        emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', texto)

        invalidos = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf', '.css', '.js')
        emails = [e for e in emails if not e.lower().endswith(invalidos)
                  and not e.startswith('bootstrap@')
                  and 'example' not in e.lower()
                  and 'domain' not in e.lower()]

        if emails:
            return emails[0]

    except requests.exceptions.RequestException:
        return None
    except Exception:
        return None

    return None


# ─────────────────────────────────────────────
# FUNCIÓN PRINCIPAL (router inteligente)
# ─────────────────────────────────────────────
def buscar_leads_prospectos(query, max_resultados=5):
    """
    Usa Google Custom Search API si está configurada, sino DuckDuckGo.
    En ambos casos extrae emails de los sitios encontrados.
    """
    # Elegir método según disponibilidad de API key
    if BRAVE_API_KEY:
        empresas = buscar_con_brave(query, max_resultados)
        # Si Brave no encuentra nada, fallback a DDG
        if not empresas:
            print("ℹ️  Brave sin resultados. Usando DuckDuckGo como respaldo.")
            empresas = buscar_con_duckduckgo(query, max_resultados)
    else:
        print("ℹ️  [INFO] BRAVE_SEARCH_API_KEY no configurada. Usando DuckDuckGo.")
        empresas = buscar_con_duckduckgo(query, max_resultados)

    leads_encontrados = []

    if not empresas:
        print("⚠️ No se encontraron empresas.")
        return leads_encontrados

    for empresa in empresas:
        email = extraer_email_de_url(empresa['url'])

        url_limpia = empresa['url'].replace('https://', '').replace('http://', '').replace('www.', '').strip('/')

        if email:
            print(f"   ✅ Email encontrado: {empresa['nombre']} → {email}")
            leads_encontrados.append({
                'nombre': empresa['nombre'],
                'url': url_limpia,
                'email': email
            })
        else:
            print(f"   ❌ Sin email visible: {url_limpia}")

        time.sleep(1)  # Pausa amigable

    return leads_encontrados


# ─────────────────────────────────────────────
# TEST LOCAL
# ─────────────────────────────────────────────
if __name__ == "__main__":
    urllib3.disable_warnings()
    query_prueba = "Clínica dental en Buenos Aires"
    leads = buscar_leads_prospectos(query_prueba, max_resultados=5)
    print(f"\n📊 Resumen: {len(leads)} prospectos encontrados.")
    for l in leads:
        print(f"  - {l['nombre']} | {l['url']} | {l['email']}")
