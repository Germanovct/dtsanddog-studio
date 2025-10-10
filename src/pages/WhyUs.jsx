import React from "react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import "../App.css";

function WhyUs() {
  const reasons = [
    "Ganás visibilidad llegando a nuevos mercados",
    "Conectás con tu audiencia y generás confianza",
    "Automatizás procesos y ahorrás tiempo",
    "Obtenés una herramienta de ventas 24/7",
  ];

  return (
    <section
      id="whyus"
      className="py-5"
      style={{ backgroundColor: "#f9eedb", color: "#0d0d0d" }}
    >
      <div className="container">
        <h6 className="text-uppercase text-secondary mb-2 text-center">
          ¿Por qué deberías trabajar con nosotros?
        </h6>
        <h2 className="fw-bold mb-4 text-center">
          Sabemos entender tu empresa y a tus clientes
        </h2>
        <p
          className="mb-5 text-center"
          style={{ maxWidth: "700px", lineHeight: "1.6", margin: "0 auto" }}
        >
          Tu negocio es único, y tu web también debería serlo. Investigamos a
          fondo tu mercado para comprender sus necesidades, deseos y
          motivaciones, creando un diseño que conecte con tu público a un nivel
          emocional.
        </p>

        <div className="row align-items-center">
          {/* 🟣 Lista de razones */}
          <div className="col-md-6">
            {reasons.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="d-flex align-items-center justify-content-between p-3 mb-3 bg-light rounded-4 shadow-sm"
              >
                <p className="mb-0 fw-semibold">
                  {index + 1}. {text}
                </p>
                <span
                  style={{
                    fontSize: "1.3rem",
                    backgroundColor: "#0d0d0d",
                    color: "#f9eedb",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  →
                </span>
              </motion.div>
            ))}
          </div>

          {/* 🔵 Ícono React animado */}
          <div className="col-md-6 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "linear",
              }}
              style={{
                display: "inline-block",
                marginTop: "20px",
              }}
            >
              <FaReact
                size={220}
                color="#61DAFB"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(97, 218, 251, 0.6))",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
