import streamlit as st
import pandas as pd
import time
import os
from buscador import buscar_leads_prospectos
from main import analizar_web, generar_email, enviar_email

st.set_page_config(page_title="DT&DOG Studio - CRM", page_icon="🤖", layout="wide")

# Cabecera
st.title("🤖 DT&DOG Studio: Motor de Ventas B2B")
st.markdown("Busca prospectos, audita webs usando IA y edita envíos de correo desde tu propio Dashboard.")

# Pestañas
tab1, tab2 = st.tabs(["🎯 Búsqueda y Prospección", "📊 CRM / Historial"])

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
                        asunto = "Propuesta de optimización DT&DOG Studio"
                        cuerpo = raw_email
                        
                        if "Asunto:" in raw_email:
                            partes = raw_email.split("\n", 1)
                            asunto = partes[0].replace("Asunto:", "").strip()
                            cuerpo = partes[1].strip() if len(partes) > 1 else ""
                            
                        st.markdown("**Borrador Inteligente (Editable):**")
                        edited_asunto = st.text_input("Asunto", value=asunto, key=f"asunto_{idx}")
                        edited_cuerpo = st.text_area("Cuerpo del Email", value=cuerpo, height=200, key=f"cuerpo_{idx}")
                        
                        if st.button("🚀 Enviar por SMTP", type="primary", key=f"btn_send_{idx}"):
                            with st.spinner("Enviando correo..."):
                                try:
                                    enviar_email(lead['email'], edited_asunto, edited_cuerpo)
                                    # Guardar en CSV con estructura extendida
                                    import datetime
                                    ahora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                                    # nombre,url,email,score,tti,lead_score,status,ultimo_contacto,thread_id
                                    linea = f"\n{lead['nombre']},{lead['url']},{lead['email']},45,5.2,90,Contactado,{ahora},"
                                    if os.path.exists('prospectos_calificados.csv'):
                                        with open('prospectos_calificados.csv', 'a', encoding='utf-8') as f:
                                            f.write(linea)
                                    else:
                                        with open('prospectos_calificados.csv', 'w', encoding='utf-8') as f:
                                            f.write("nombre,url,email,score,tti,lead_score,status,ultimo_contacto,thread_id" + linea)
                                    
                                    st.session_state[sent_key] = True
                                    st.rerun()
                                except Exception as e:
                                    st.error(f"Error enviando correo: {e}")

with tab2:
    st.subheader("📁 Historial de Contactos (Mini-CRM)")
    if os.path.exists("prospectos_calificados.csv"):
        try:
            df = pd.read_csv("prospectos_calificados.csv")
            if not df.empty:
                st.dataframe(df, width="stretch", hide_index=True)
                st.info(f"Total de contactos contactados hasta ahora: {len(df)}")
                
                # Descargar la base visual
                csv = df.to_csv(index=False).encode('utf-8')
                st.download_button(
                    label="📥 Descargar Base (CSV)",
                    data=csv,
                    file_name='prospectos_dtanddog.csv',
                    mime='text/csv',
                )
            else:
                st.info("Tu archivo CSV está vacío por ahora.")
        except Exception as e:
            st.error("Hubo un error al tratar de leer el CSV como tabla.")
    else:
        st.info("Todavía no enviaste correos.")
