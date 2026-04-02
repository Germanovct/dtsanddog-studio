import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Martín Godoy",
    company: "TCQ Cultura Techno",
    role: "Founder & Director",
    text: "El sistema de venta de tickets nos permitió escalar exponencialmente. El retorno de inversión superó todas nuestras expectativas.",
    metric: "+2,500 tickets vendidos",
    result: "ROI en 45 días",
    initials: "MG",
  },
  {
    name: "Ricardo Laham",
    company: "Estudio Jurídico SNA",
    role: "Abogado Senior",
    text: "La nueva arquitectura web no solo es veloz, sino que posicionó nuestra marca en un segmento mucho más alto.",
    metric: "+180% consultas mensuales",
    result: "Crecimiento orgánico sostenido",
    initials: "RL",
  },
  {
    name: "Geraldine Hanna",
    company: "Studio Be",
    role: "Directora Creativa",
    text: "Lograron capturar la esencia de nuestra marca con una precisión técnica y visual impecable. Un socio estratégico real.",
    metric: "Carga -60%",
    result: "Conversión +35%",
    initials: "GH",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "120px 0",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.h6
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ color: "var(--accent-orange)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.75rem" }}
          >
            Validación & Resultados
          </motion.h6>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="display-4 fw-bold"
            style={{ letterSpacing: "-0.03em" }}
          >
            Qué dicen nuestros clientes.
          </motion.h2>
        </div>

        <div className="row g-4 justify-content-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "40px 30px",
                  height: "100%",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.3s ease"
                }}
                className="testimonial-card-new"
              >
                {/* Quote */}
                <div style={{ color: "var(--accent-orange)", fontSize: "2rem", lineHeight: 1, marginBottom: "1rem" }}>“</div>
                
                <p 
                  style={{ 
                    fontSize: "1.05rem", 
                    lineHeight: "1.6", 
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: "2rem",
                    fontStyle: "italic"
                  }}
                >
                  {t.text}
                </p>

                {/* Metrics Section */}
                <div className="mt-auto">
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>KPI Destacado</div>
                    <div style={{ color: "var(--accent-orange)", fontWeight: "700", fontSize: "1.1rem" }}>{t.metric}</div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div 
                      style={{ 
                        width: "45px", 
                        height: "45px", 
                        background: "rgba(255,255,255,0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        borderRadius: "2px",
                        fontSize: "0.9rem",
                        fontWeight: "700",
                        color: "#fff"
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{t.name}</h6>
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{t.role} @ {t.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Result Badge */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-5 pt-5 text-center"
        >
          <div 
            className="d-inline-flex align-items-center gap-4 px-5 py-3"
            style={{ 
              background: "rgba(242,154,65,0.03)", 
              border: "1px solid rgba(242,154,65,0.1)",
              borderRadius: "4px"
            }}
          >
            <div className="text-start">
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff" }}>100%</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Satisfaction Rate</div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }} />
            <div className="text-start">
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff" }}>+15</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Proyectos Enterprise</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .testimonial-card-new:hover {
          border-color: rgba(242,154,65,0.3) !important;
        }
      `}</style>
    </section>
  );
}
