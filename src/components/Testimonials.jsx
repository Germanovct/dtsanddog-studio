import React from "react";
import { motion } from "framer-motion";
import "../App.css";

const testimonials = [
  {
    name: "Martín Godoy",
    text: "Su trabajo al 200%... cumplieron los plazos y el resultado fue excelente. Muy recomendable el equipo.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Nig Ron",
    text: "Un trabajo de altísimo nivel, buena predisposición y atención siempre cordial. Muy contentos con el resultado.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Geraldine Hanna",
    text: "Profesionales y atentos. Nos ayudaron a adaptar nuestro sitio con mucha paciencia. Recomendados.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Ricardo Laham",
    text: "Excelente servicio y comunicación. Mi página quedó mejor de lo que esperaba.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Natalia Juarez",
    text: "Gran equipo, entendieron exactamente lo que necesitaba y lo implementaron rápido y con estilo.",
    rating: 5,
    source: "Google",
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
      }}
    >
      <div className="container py-4">
        <h6 className="text-uppercase text-secondary mb-2">
          Opiniones reales
        </h6>
        <h2 className="fw-bold mb-4">Lo que dicen nuestros clientes</h2>
        <p
          className="text-light mb-5"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          Nos enorgullece colaborar con marcas y emprendedores que confían en
          nuestro trabajo. Estas son algunas de sus experiencias.
        </p>

        <div className="row justify-content-center g-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="col-12 col-sm-6 col-lg-4"
            >
              <div
                className="testimonial-card p-4 h-100"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                <p className="mb-4" style={{ fontSize: "0.95rem" }}>
                  “{t.text}”
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="fw-semibold mb-0">{t.name}</h6>
                    <small className="text-secondary">{t.source}</small>
                  </div>
                  <div style={{ color: "#f29a41" }}>
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
