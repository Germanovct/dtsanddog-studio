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
        background: "#000",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container position-relative z-1">
        <div className="row align-items-center text-center text-md-start g-4">
          {/* Column 1: Logo & Mission */}
          <div className="col-md-5">
            <img
              src={logoLight}
              alt="DTS&DOG Studio Logo"
              style={{ width: "120px", marginBottom: "20px", filter: "brightness(1.2)" }}
            />
            <p className="mb-2" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "300px", lineHeight: "1.6" }}>
              Ingeniería de alto rendimiento y arquitectura digital para líderes globales.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4" style={{ color: "var(--accent-orange)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px" }}>
              Explorar
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#hero" className="text-decoration-none" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Inicio</a></li>
              <li><a href="#services" className="text-decoration-none" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Servicios</a></li>
              <li><a href="#portfolio" className="text-decoration-none" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Casos de Éxito</a></li>
              <li><a href="#contact" className="text-decoration-none" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Auditoría</a></li>
            </ul>
          </div>

          {/* Column 3: Social & Contact */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px" }}>
              Presencia Digital
            </h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-5"
                style={{ color: "rgba(255,255,255,0.6)", transition: "0.3s" }}
              >
                <FaInstagram className="hover-glow" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-5"
                style={{ color: "rgba(255,255,255,0.6)", transition: "0.3s" }}
              >
                <FaLinkedin className="hover-glow" />
              </a>
              <a
                href="mailto:contacto@dtsanddog-studio.com.ar"
                className="fs-5"
                style={{ color: "rgba(255,255,255,0.6)", transition: "0.3s" }}
              >
                <FaEnvelope className="hover-glow" />
              </a>
            </div>

            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="d-inline-flex align-items-center gap-2 text-decoration-none"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}
            >
              <FaArrowUp size={14} />
              <span>Back to Top</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
             <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.3)" }}>
              © {year} DTS&DOG Studio. Todos los derechos reservados.
            </p>
            <div className="d-flex gap-4">
               <span className="small" style={{ color: "rgba(255,255,255,0.3)" }}>Based in LATAM</span>
               <span className="small" style={{ color: "rgba(255,255,255,0.3)" }}>v2.0 Enterprise</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
