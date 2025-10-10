import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo/DTSandDOG-Studio-logo-dark.png"; // 🟡 Logo del estudio

export default function About() {
  return (
    <section
      id="about"
      className="py-5"
      style={{
        backgroundColor: "#fffaf2",
        color: "#333",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Texto */}
          <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
            <motion.h2
              className="fw-bold mb-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Sobre Nosotros
            </motion.h2>

            <motion.p
              className="lead text-secondary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              En <strong>DTS&DOG Studio</strong> unimos{" "}
              <b>diseño, desarrollo y tecnología</b> con una visión creativa
              que busca transmitir emociones y dar vida a las ideas.
            </motion.p>

            <motion.p
              className="mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Fundado por <b>Germán Ocampo</b> y su inseparable compañero{" "}
              <b>Franklin 🐾</b>, el estudio nació con la misión de crear
              experiencias digitales con alma, corazón y propósito.
            </motion.p>

            <motion.p
              className="text-muted mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Desde Buenos Aires al mundo 🌎 — desarrollamos proyectos web,
              branding y estrategias digitales para marcas que buscan
              destacar y conectar con su público de forma auténtica.
            </motion.p>
          </div>

          {/* Logo animado en lugar de Franklin */}
          <div className="col-lg-5 text-center">
            <motion.img
              src={logo}
              alt="DTS&DOG Studio Logo"
              className="img-fluid rounded shadow-sm"
              style={{
                maxWidth: "280px",
                backgroundColor: "#f9eedb",
                borderRadius: "50%",
                padding: "10px",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
