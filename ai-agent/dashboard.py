import streamlit as st
import pandas as pd
import time
import os
import json
import datetime
from buscador import buscar_leads_prospectos
from main import analizar_web, generar_email, enviar_email

st.set_page_config(page_title="DTS&DOG Studio - CRM", page_icon="🤖", layout="wide")

INDUSTRIES_PATH = "ai-agent/target_industries.json"
CSV_PATH = "prospectos_calificados.csv"

# Cabecera
st.title("🤖 DTS&DOG Studio: Motor de Ventas B2B")
st.markdown("Dashboard de Control del Estudio Digital. Prospección, Auditoría e IA.")

# Pestañas
tab1, tab2, tab3 = st.tabs(["🎯 Búsqueda Manual", "📊 CRM / Historial", "🚀 Piloto Automático"])

with tab1:
    st.subheader("1. Iniciar Rastreo")
    
    col1, col2 = st.columns([3, 1])
    with col1:
        query = st.text_input("Ingresá el rubro a buscar:", placeholder="Ej: 'agencias de marketing en buenos aires'")
    with col2:
        st.write("")
        st.write("")
        btn_buscar = st.button("Buscar Leads", type="primary", width="stretch")

    if btn_buscar:
        if not query:
            st.warning("Escribí un rubro para empezar.")
        else:
            with st.spinner("🔍 Buscando negocios con DuckDuckGo..."):
                leads = buscar_leads_prospectos(query)
            
            if not leads:
                st.error("❌ No se encontraron empresas con email público para esta búsqueda.")
                st.session_state.leads = []
            else:
                st.success(f"✅ ¡Se encontraron {len(leads)} prospectos con email válido!")
                st.session_state.leads = leads
                # Limpiar la cache de estado de borradores viejos
                for key in list(st.session_state.keys()):
                    if key.startswith("draft_") or key.startswith("sent_"):
                        del st.session_state[key]

    if "leads" in st.session_state and st.session_state.leads:
        st.subheader("2. Prospectos Encontrados")
        
        for idx, lead in enumerate(st.session_state.leads):
            # Identificadores unicos de estado en sesión
            draft_key = f"draft_{idx}"
            sent_key = f"sent_{idx}"
            
            with st.expander(f"🏢 {lead['nombre']} | 📧 {lead['email']}", expanded=True):
                c1, c2 = st.columns([1, 2])
                
                with c1:
                    st.markdown(f"**Web:** [{lead['url']}]({lead['url']})")
                    st.markdown(f"**Correo:** `{lead['email']}`")
                    
                    if not st.session_state.get(sent_key, False):
                        if st.button("Analizar y Redactar Email", key=f"btn_gen_{idx}"):
                            with st.spinner("Auditando PageSpeed y redactando correo (Gemini)..."):
                                score, tti = analizar_web(lead['url'])
                                borrador = generar_email(lead['nombre'], lead['url'], score, tti)
                                st.session_state[draft_key] = borrador
                                st.rerun()
                    else:
                        st.success("✅ ¡Email Enviado con Éxito!")

                with c2:
                    if st.session_state.get(sent_key, False):
                        st.info("Este prospecto ya fue contactado. Revisá la pestaña CRM para el historial.")
                    elif draft_key in st.session_state:
                        # Extraer asunto y cuerpo
                        raw_email = st.session_state[draft_key]
                        asunto = "Propuesta de optimización DTS&DOG Studio"
                        cuerpo = raw_email
                        
                        if "Asunto:" in raw_email:
                            partes = raw_email.split("\n", 1)
                            asunto = partes[0].replace("Asunto:", "").strip()
                            cuerpo = partes[1].strip() if len(partes) > 1 else ""
                            
                        st.markdown("**Borrador Inteligente (Editable):**")
                        edited_asunto = st.text_input("Asunto", value=asunto, key=f"asunto_{idx}")
                        edited_cuerpo = st.text_area("Cuerpo del Email", value=cuerpo, height=200, key=f"cuerpo_{idx}")
                        
                        if st.button("🚀 Enviar Ahora", type="primary", key=f"btn_send_{idx}"):
                            with st.spinner("Enviando correo..."):
                                try:
                                    enviar_email(lead['email'], edited_asunto, edited_cuerpo)
                                    # Guardar en CSV
                                    import datetime
                                    ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                                    linea = f"\n{lead['nombre']},{lead['url']},{lead['email']},45,5.2,90,Contactado,{ahora},"
                                    with open(CSV_PATH, 'a', encoding='utf-8') as f:
                                        f.write(linea)
                                    
                                    st.session_state[sent_key] = True
                                    st.rerun()
                                except Exception as e:
                                    st.error(f"Error enviando correo: {e}")

with tab2:
    st.subheader("📁 Historial de Contactos (CRM)")
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
        if not df.empty:
            st.dataframe(df, width="stretch", hide_index=True)
            stats_col1, stats_col2 = st.columns(2)
            stats_col1.metric("Leads Totales", len(df))
            stats_col2.metric("Enviados Hoy", len(df[df['ultimo_contacto'].astype(str).str.contains(datetime.datetime.now().strftime("%Y-%m-%d"))]) if 'ultimo_contacto' in df.columns else 0)
        else:
            st.info("No hay datos en el CRM.")

with tab3:
    st.subheader("⚙️ Configuración del Piloto Automático")
    st.info("El Agente Cazador busca nuevos prospectos cada 4 horas y envía mails a los que tienen mejor puntaje automáticamente.")
    
    if os.path.exists(INDUSTRIES_PATH):
        with open(INDUSTRIES_PATH, "r") as f:
            queries = json.load(f)
        
        st.markdown("**Nichos de Caza Activos:**")
        edited_queries = st.text_area("Lista de Búsquedas (una por línea)", value="\n".join(queries), height=200)
        
        if st.button("Guardar Configuración"):
            new_queries = [q.strip() for q in edited_queries.split("\n") if q.strip()]
            with open(INDUSTRIES_PATH, "w") as f:
                json.dump(new_queries, f, indent=4)
            st.success("✅ Configuración actualizada. El Agente Cazador usará estos nichos en su próxima ronda.")
    
    st.divider()
    st.subheader("📈 Actividad del Cazador")
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
        autonomos = df[df['status'] == "Nuevo"]
        if not autonomos.empty:
            st.markdown(f"**Leads Recién Descubiertos (En espera de proceso):**")
            st.dataframe(autonomos[["nombre", "url", "lead_score"]], width="stretch")
        else:
            st.success("🎯 Todos los leads descubiertos han sido contactados o procesados.")
