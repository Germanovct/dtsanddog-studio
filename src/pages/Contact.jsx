import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: "#000",
        color: "#fff",
        padding: "120px 0",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="container">
        <div className="row g-5">
          {/* Side Info */}
          <div className="col-lg-5">
            <motion.h6
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ color: "var(--accent-orange)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "1.5rem" }}
            >
              Zero-Friction Onboarding
            </motion.h6>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="display-4 fw-bold mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Agenda tu Vuelo de Reconocimiento.
            </motion.h2>
            <p className="lead mb-5" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
              En 15 minutos analizamos tu negocio, auditamos tus métricas técnicas y trazamos un plan de escalabilidad sin intermediarios.
            </p>

            <div className="d-flex flex-column gap-4 mb-5">
              {[
                { icon: <Mail size={20} />, title: "Email Directo", value: "contacto@dtsanddog-studio.com.ar" },
                { icon: <MessageSquare size={20} />, title: "WhatsApp Business", value: "Consultar disponibilidad" },
                { icon: <Clock size={20} />, title: "Disponibilidad", value: "Lunes a Viernes (Reservas Automatizadas)" },
              ].map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-4">
                  <div 
                    style={{ 
                      width: "50px", 
                      height: "50px", 
                      background: "rgba(255,255,255,0.03)", 
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-orange)"
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>{item.title}</div>
                    <div style={{ fontWeight: "600", fontSize: "1rem" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Steps Minimalist */}
            <div style={{ padding: "30px", background: "rgba(242,154,65,0.02)", border: "1px solid rgba(242,154,65,0.05)", borderRadius: "4px" }}>
              <h6 style={{ fontSize: "0.8rem", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", color: "var(--accent-orange)" }}>Metodología de Inicio</h6>
              {["Agendamiento Directo", "Análisis Técnico en Vivo", "Propuesta de Escalamiento"].map((step, i) => (
                <div key={i} className="d-flex align-items-center gap-3 mb-3">
                  <CheckCircle size={14} color="var(--accent-orange)" />
                  <span style={{ fontSize: "0.95rem", opacity: 0.8 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Iframe Calendar */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 border border-white/5 bg-black/40 rounded-3xl p-8 lg:p-12 relative overflow-hidden group flex flex-col justify-center items-center backdrop-blur-sm min-h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="bg-white/5 p-4 rounded-full mb-6 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-light text-white mb-2 text-center">Reserva tu Auditoría</h3>
              <p className="text-gray-400 text-center mb-8 max-w-sm">
                Selecciona un horario en mi calendario personal de Google para nuestra sesión técnica.
              </p>
              
              <a 
                href="https://calendar.app.google/jzZQUiTodCtnWe278" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-flex h-14 items-center justify-center px-10 py-3 overflow-hidden font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-500 rounded-full group-hover:w-64 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center gap-3">
                  Agendar en Google Calendar
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
