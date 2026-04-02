import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo/DTSandDOG-Studio-logo-dark.png";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="py-5 text-light"
      style={{
        background: "#000",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="container py-5">
        <div className="row align-items-center">
          {/* 📝 Texto principal */}
          <motion.div
            className="col-lg-7"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
          >
            <motion.h6
              className="text-uppercase mb-4"
              style={{ color: "var(--accent-orange)", letterSpacing: "5px", fontSize: "0.75rem", fontWeight: "800" }}
            >
              Nuestra Filosofía
            </motion.h6>

            <motion.h2
              className="display-3 fw-black mb-4"
              style={{ color: "#fff", lineHeight: 1, letterSpacing: "-0.05em" }}
              variants={fadeUp}
            >
              Innovación con <br /><span className="text-gradient">Propósito Humano.</span>
            </motion.h2>

            <motion.p
              className="mb-4"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.15rem", maxWidth: "600px", lineHeight: "1.8" }}
              variants={fadeUp}
            >
              En <strong style={{ color: "#fff" }}>DTS&DOG Studio</strong> creemos que la tecnología solo tiene valor cuando está al servicio de las personas. No solo construimos software de alto rendimiento, diseñamos infraestructuras de crecimiento para el mercado global.
            </motion.p>

            <motion.p
              className="mb-5"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", maxWidth: "550px" }}
              variants={fadeUp}
            >
              Fundada en Buenos Aires, nuestra empresa combina la precisión técnica con una sensibilidad artística única, ayudando a marcas y negocios consolidados a evolucionar en un entorno digital en constante cambio.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="/aboutpro"
                className="btn"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "0.5px solid rgba(255,255,255,0.2)",
                  borderRadius: "4px",
                  padding: "12px 30px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.3s ease"
                }}
              >
                Nuestra historia →
              </a>
            </motion.div>
          </motion.div>

          {/* 🎞️ Logo o Visual Minimalista */}
          <motion.div
            className="col-lg-5 text-center mt-5 mt-lg-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={logo}
              alt="DTS&DOG"
              className="img-fluid"
              style={{
                maxWidth: "280px",
                filter: "grayscale(100%) brightness(1.2)",
                opacity: 0.8
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
