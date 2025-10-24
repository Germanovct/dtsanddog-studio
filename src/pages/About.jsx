import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo/DTSandDOG-Studio-logo-dark.png";

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
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.9)
        ), url("https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1828")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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
              Innovación + Diseño + Tecnología
            </motion.h2>

            <motion.p
              className="lead text-light"
              style={{ color: "#d8d0c2", fontSize: "1.05rem" }}
              variants={fadeUp}
            >
              En <strong style={{ color: "#f29a41" }}>DTS&DOG Studio</strong>{" "}
              somos una <b>startup creativa y tecnológica</b> dedicada a crear
              experiencias digitales que combinan diseño, desarrollo e
              innovación con propósito.
            </motion.p>

            <motion.p
              className="mt-3 text-light"
              style={{ color: "#b8b1a4" }}
              variants={fadeUp}
            >
              Fundada por <b>Germán Ocampo</b> junto a su inseparable compañero{" "}
              <b>Franklin 🐾</b>, la empresa nace con la visión de unir arte y
              tecnología para ayudar a marcas, proyectos y creadores a{" "}
              <b>evolucionar en el ecosistema digital</b>.
            </motion.p>

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
                Creemos en el poder de las ideas simples, bien diseñadas y
                profundamente humanas.
              </p>
            </motion.div>

            {/* 🔗 CTA PRINCIPAL */}
            <motion.div variants={fadeUp} className="mt-4">
              <a
                href="/aboutpro"
                className="btn fw-semibold px-4 py-2 pulse-button"
                style={{
                  background: "#f29a41",
                  color: "#0b0b0c",
                  borderRadius: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                Conocer más →
              </a>
            </motion.div>
          </motion.div>

          {/* 🎞️ Logo */}
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
                backgroundColor: "rgba(0,0,0,0.7)",
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

      {/* ✨ Animación del botón */}
      <style>{`
        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(242,154,65,0.4);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 0 20px rgba(242,154,65,0.5);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(242,154,65,0.4);
          }
        }

        .pulse-button {
          animation: pulseGlow 2.2s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .pulse-button:hover {
          background-color: #f29a41 !important;
          color: #0b0b0b !important;
          transform: scale(1.08);
          box-shadow: 0 0 25px rgba(242,154,65,0.7);
        }
      `}</style>
    </motion.section>
  );
}
