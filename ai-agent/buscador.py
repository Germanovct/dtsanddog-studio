import time
import requests
from bs4 import BeautifulSoup
from googlesearch import search
import re

import re
import urllib.parse
import urllib3

urllib3.disable_warnings()

def buscar_empresas_en_mapas(query, max_resultados=10):
    print(f"\n🔍 Buscando '{query}' (Esto puede tomar unos segundos)...")
    resultados = []
    
    # Dominios de directorios a ignorar
    directorios = ['facebook.com', 'instagram.com', 'linkedin.com', 'yelp.com', 
                   'paginasamarillas.', 'tripadvisor.', 'mercadolibre.', 'twitter.com',
                   'tiktok.com', 'doctoralia.', 'guiadentistas.', 'youtube.com', 'pinterest.']
    
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query + ' contacto sitio web')}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for a in soup.find_all('a', class_='result__url'):
            link = a.get('href', '')
            # En DDG, a veces los links son redirect. Extraemos la url real si la hay
            if link.startswith('//duckduckgo.com/l/?uddg='):
                try:
                    link = urllib.parse.unquote(link.split('uddg=')[1].split('&')[0])
                except:
                    pass
            
            if not link.startswith('http'):
                link = 'https://' + link.strip()
                
            es_directorio = any(d in link for d in directorios)
            if link and not es_directorio and 'duckduckgo.com' not in link:
                dominio = link.split('//')[-1].split('/')[0].replace('www.', '')
                nombre = dominio.split('.')[0].capitalize()
                
                if not any(r['nombre'] == nombre for r in resultados):
                    resultados.append({
                        'nombre': nombre,
                        'url': link,
                        'telefono': ''
                    })
                    
            if len(resultados) >= max_resultados:
                break
    except Exception as e:
        print(f"❌ Error buscando en DuckDuckGo HTML: {e}")
        
    return resultados

def extraer_email_de_url(url, timeout=10):
    print(f"   🌐 Analizando la web de {url}...")
    
    if not url.startswith('http'):
        url = f"https://{url}"
        
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        # Algunos sitios rechazan conexiones SSL antiguas o tienen certificados rotos
        response = requests.get(url, headers=headers, timeout=timeout, verify=False)
        
        if response.status_code >= 400:
            return None
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. Buscar enlaces mailto:
        for a in soup.find_all('a', href=True):
            if a['href'].startswith('mailto:'):
                email = a['href'].replace('mailto:', '').split('?')[0].strip()
                if email and '@' in email:
                    return email

        # 2. Buscar usando Regex para extraer texto
        texto = soup.get_text()
        emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', texto)
        
        # Filtrar extensiones comunes de imágenes (falsos positivos) u otros no deseados
        invalidos = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf', '.css', '.js')
        emails = [e for e in emails if not e.lower().endswith(invalidos) and not e.startswith('bootstrap@')]
        
        if emails:
            return emails[0]
            
    except requests.exceptions.RequestException:
        return None
    except Exception as e:
        return None
        
    return None

def buscar_leads_prospectos(query, max_resultados=5):
    empresas = buscar_empresas_en_mapas(query, max_resultados)
    leads_encontrados = []
    
    if not empresas:
        print("⚠️ No se encontraron empresas con sitio web en la búsqueda.")
        return leads_encontrados
        
    for empresa in empresas:
        email = extraer_email_de_url(empresa['url'])
        
        # Limpieza rápida de URL para el historial
        url_limpia = empresa['url'].replace('https://', '').replace('http://', '').replace('www.', '').strip('/')
        
        if email:
            print(f"   ✅ ¡Email encontrado para {empresa['nombre']}! -> {email}")
            leads_encontrados.append({
                'nombre': empresa['nombre'],
                'url': url_limpia,
                'email': email
            })
        else:
            print(f"   ❌ Sin email visible en {url_limpia}")
            
        time.sleep(1) # Pausa amigable para no sobrecargar webs
        
    return leads_encontrados

if __name__ == "__main__":
    # Suprimimos los warnings de SSL
    import urllib3
    urllib3.disable_warnings()
    
    # Prueba del buscador
    query_prueba = "Odontologo en Buenos Aires"
    leads = buscar_leads_prospectos(query_prueba, max_resultados=3)
    print(f"\nResumen: Se encontraron {len(leads)} prospectos listos para análisis.")
    print(leads)
