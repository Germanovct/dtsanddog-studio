import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import logoLight from "../assets/logo/DTSandDOG-Studio-logo-dark.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-5 text-center text-md-start"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔮 Efecto fondo */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at 10% 80%, rgba(242,154,65,0.1), transparent 60%), radial-gradient(circle at 90% 20%, rgba(97,218,251,0.1), transparent 60%)",
          zIndex: 0,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="container position-relative z-1">
        <div className="row align-items-center text-center text-md-start g-4">
          {/* 🐾 Columna 1: Logo y frase */}
          <div className="col-md-4">
            <img
              src={logoLight}
              alt="DTS&DOG Studio Logo"
              style={{ width: "140px", marginBottom: "15px" }}
            />
            <p className="mb-2 text-light">
              Creando experiencias digitales con alma y propósito 🐾
            </p>
          </div>

          {/* 🌐 Columna 2: Navegación */}
          <div className="col-md-4">
            <h6 className="fw-bold mb-3" style={{ color: "#f29a41" }}>
              Navegación
            </h6>
            <ul className="list-unstyled">
              <li><a href="#hero" className="text-light text-decoration-none">Inicio</a></li>
              <li><a href="#services" className="text-light text-decoration-none">Servicios</a></li>
              <li><a href="#about" className="text-light text-decoration-none">Nosotros</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          {/* 💬 Columna 3: Contacto y redes */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="fw-bold mb-3" style={{ color: "#61dafb" }}>
              Conectá con nosotros
            </h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-4"
                style={{ transition: "0.3s" }}
              >
                <FaInstagram className="hover-glow" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-4"
                style={{ transition: "0.3s" }}
              >
                <FaLinkedin className="hover-glow" />
              </a>
              <a
                href="mailto:contacto@dtsanddog-studio.com.ar"
                className="text-light fs-4"
                style={{ transition: "0.3s" }}
              >
                <FaEnvelope className="hover-glow" />
              </a>
            </div>

            <motion.a
              href="#hero"
              whileHover={{ scale: 1.1 }}
              className="d-inline-flex align-items-center gap-2 text-light text-decoration-none"
            >
              <FaArrowUp />
              <span>Volver arriba</span>
            </motion.a>
          </div>
        </div>

        {/* 🧡 Línea inferior */}
        <hr className="mt-4 mb-3" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <p className="text-center mb-0 small text-secondary">
          © {year} DTS&DOG Studio — Buenos Aires, Argentina 🇦🇷
        </p>
      </div>
    </footer>
  );
}
