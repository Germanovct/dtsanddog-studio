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
              style={{
                background: "#ffffff", // Fondo blanco para que Google Calendar se lea bien (diseño de Google)
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                height: "100%",
                minHeight: "650px",
                position: "relative"
              }}
            >
              <iframe 
                src="https://calendar.app.google/jzZQUiTodCtnWe278" 
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
                title="Google Calendar Booking"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
