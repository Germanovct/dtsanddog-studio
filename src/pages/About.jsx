import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo/DTSandDOG-Studio-logo-dark.png"; // 🟡 Logo del estudio

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="py-5 text-light"
      style={{
        background: "radial-gradient(circle at top left, #1a1a1a 0%, #0d0d0d 80%)",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
        color: "#f9eedb",
        overflow: "hidden",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="container py-4">
        <div className="row align-items-center justify-content-center text-center text-lg-start">
          {/* 📝 Texto principal */}
          <motion.div
            className="col-lg-7"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h6
              className="text-uppercase mb-3"
              style={{ color: "#f29a41", letterSpacing: "2px" }}
            >
              Sobre Nosotros
            </motion.h6>

            <motion.h2
              className="fw-bold mb-3"
              style={{ color: "#f9eedb", fontSize: "2.2rem" }}
              variants={fadeUp}
            >
              Creatividad + Tecnología + Emoción
            </motion.h2>

            <motion.p
              className="lead text-light"
              style={{ color: "#d8d0c2", fontSize: "1.05rem" }}
              variants={fadeUp}
            >
              En <strong style={{ color: "#f29a41" }}>DTS&DOG Studio</strong>{" "}
              unimos <b>diseño, desarrollo y arte digital</b> con una visión
              creativa que busca transmitir emociones y dar vida a las ideas.
            </motion.p>

            <motion.p
              className="mt-3 text-light"
              style={{ color: "#d8d0c2" }}
              variants={fadeUp}
            >
              Fundado por <b>Germán Ocampo</b> y su inseparable compañero{" "}
              <b>Franklin 🐾</b>, el estudio nació con la misión de crear
              experiencias digitales con alma, corazón y propósito.
            </motion.p>

            <motion.p
              className="text-light mt-3"
              style={{ color: "#b8b1a4" }}
              variants={fadeUp}
            >
              Desde Buenos Aires al mundo 🌎 — desarrollamos proyectos web,
              branding, videojuegos y estrategias digitales para marcas que
              buscan destacar y conectar de forma auténtica.
            </motion.p>

            {/* ✨ Creative statement */}
            <motion.div
              className="mt-4 p-3 rounded-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 15px rgba(242,154,65,0.1)",
                color: "#f9eedb",
              }}
              variants={fadeUp}
            >
              <p className="mb-1 fw-semibold" style={{ color: "#f29a41" }}>
                “Digital Arts. Human Soul.” ✨
              </p>
              <p style={{ fontSize: "0.9rem", color: "#d8d0c2" }}>
                Creemos en el poder de las ideas simples, bien diseñadas y profundamente humanas.
              </p>
            </motion.div>

            {/* 🔗 Botón CTA */}
            <motion.div variants={fadeUp} className="mt-4">
              <a
                href="#portfolio"
                className="btn btn-outline-light px-4 py-2 fw-semibold"
                style={{
                  borderRadius: "10px",
                  borderColor: "#f29a41",
                  color: "#f29a41",
                }}
              >
                Ver nuestros proyectos →
              </a>
            </motion.div>
          </motion.div>

          {/* 🎞️ Logo animado */}
          <motion.div
            className="col-lg-5 text-center mt-5 mt-lg-0"
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.img
              src={logo}
              alt="DTS&DOG Studio Logo"
              className="img-fluid shadow-lg"
              style={{
                maxWidth: "260px",
                backgroundColor: "#0d0d0d",
                borderRadius: "50%",
                padding: "10px",
                boxShadow: "0 0 25px rgba(242,154,65,0.3)",
              }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
