import React from "react";
import { motion } from "framer-motion";
import "../App.css";

const testimonials = [
  {
    name: "Martín Godoy",
    company: "TCQ Cultura Techno",
    role: "Founder & Director",
    text: "Su trabajo fue al 200%. El sistema de venta de tickets que desarrollaron nos permitió escalar de manera exponencial.",
    rating: 5,
    metric: "+2,500 tickets vendidos",
    result: "Recuperamos la inversión en 45 días",
    initials: "MG",
    color: "#61dafb",
  },
  {
    name: "Ricardo Laham",
    company: "Estudio Jurídico RL",
    role: "Abogado Senior",
    text: "Mi página web quedó mejor de lo esperado. Ahora recibo consultas diarias de clientes potenciales que me encuentran en Google.",
    rating: 5,
    metric: "+180% visitas orgánicas",
    result: "5 clientes nuevos/mes promedio",
    initials: "RL",
    color: "#f29a41",
  },
  {
    name: "Geraldine Hanna",
    company: "Studio Be",
    role: "Directora Creativa",
    text: "Profesionales y creativos. Nos ayudaron a renovar completamente nuestra presencia digital con mucha paciencia y atención al detalle.",
    rating: 5,
    metric: "Tiempo de carga -60%",
    result: "Conversión +35% en 2 meses",
    initials: "GH",
    color: "#9b59b6",
  },
  {
    name: "Nig Ron",
    company: "Brand Studio",
    role: "CEO",
    text: "Un trabajo de altísimo nivel. La plataforma que crearon es intuitiva, rápida y nos diferencia de la competencia.",
    rating: 5,
    metric: "UX Score: 95/100",
    result: "Tasa de rebote -40%",
    initials: "NR",
    color: "#e74c3c",
  },
  {
    name: "Natalia Juarez",
    company: "Beauty & Wellness",
    role: "Emprendedora",
    text: "Gran equipo. Entendieron mi visión y la transformaron en un e-commerce que genera ventas desde el día uno.",
    rating: 5,
    metric: "$12K+ facturados/mes",
    result: "ROI 320% en 3 meses",
    initials: "NJ",
    color: "#2ecc71",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-5 text-center testimonials-section"
      style={{
        backgroundColor: "#0d0d0d",
        color: "#f9eedb",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efecto de fondo sutil */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(242,154,65,0.08), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="container py-4 position-relative" style={{ zIndex: 1 }}>
        <h6 className="text-uppercase mb-2" style={{ color: "#f29a41", fontWeight: 600 }}>
          ⭐ Resultados Reales
        </h6>
        <h2 className="fw-bold mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <p
          className="text-light mb-5"
          style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}
        >
          Nos enorgullece colaborar con marcas y emprendedores que confían en
          nuestro trabajo. <strong>Estos son resultados medibles</strong> de proyectos reales.
        </p>

        <div className="row justify-content-center g-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="col-12 col-md-6 col-lg-4"
            >
              <motion.div
                className="testimonial-card p-4 h-100 d-flex flex-column"
                whileHover={{
                  y: -8,
                  boxShadow: "0 12px 40px rgba(242,154,65,0.2)",
                }}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Brillo sutil en hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                    opacity: 0.6,
                  }}
                />

                {/* Header con avatar */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`,
                      color: "#0d0d0d",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                      marginRight: "14px",
                      boxShadow: `0 4px 12px ${t.color}40`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div className="text-start">
                    <h6 className="fw-bold mb-0" style={{ fontSize: "1rem" }}>
                      {t.name}
                    </h6>
                    <small style={{ color: "#d8d0c2", fontSize: "0.85rem" }}>
                      {t.role}
                    </small>
                    <div style={{ color: "#f29a41", fontSize: "0.8rem", fontWeight: 600 }}>
                      {t.company}
                    </div>
                  </div>
                </div>

                {/* Estrellas */}
                <div className="mb-3" style={{ color: "#f29a41", fontSize: "1.1rem" }}>
                  {"★".repeat(t.rating)}
                </div>

                {/* Testimonio */}
                <p
                  className="mb-4 flex-grow-1"
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "#d8d0c2",
                  }}
                >
                  "{t.text}"
                </p>

                {/* Métricas destacadas */}
                <div
                  className="mt-auto pt-3"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="d-flex flex-column gap-2">
                    <div
                      className="d-flex align-items-center"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <span style={{ color: "#61dafb", marginRight: "6px" }}>📊</span>
                      <strong style={{ color: "#f9eedb" }}>{t.metric}</strong>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <span style={{ color: "#2ecc71", marginRight: "6px" }}>✓</span>
                      <span style={{ color: "#d8d0c2" }}>{t.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Badge de confianza */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-5 pt-4"
        >
          <div
            className="d-inline-flex align-items-center gap-3 px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>⭐</span>
            <div className="text-start">
              <div className="fw-bold" style={{ color: "#f29a41" }}>
                100% Clientes Satisfechos
              </div>
              <small style={{ color: "#d8d0c2" }}>
                Cada proyecto entregado a tiempo y aprobado
              </small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
