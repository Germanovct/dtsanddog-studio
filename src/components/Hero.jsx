import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="position-relative d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        background: "#000",
        overflow: "hidden",
        padding: "0 20px"
      }}
    >
      {/* 💡 Luz sutil superior */}
      <div
        className="position-absolute w-100"
        style={{
          top: 0,
          height: "40vh",
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05), transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 10 }}>
        {/* Label Minimalista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-4"
        >
          <span 
            style={{
              color: "var(--accent-orange)",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.2em"
            }}
          >
            Digital Studio & Business Strategy
          </span>
        </motion.div>

        {/* Headline Potente */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="display-1 fw-bold mb-4"
          style={{ 
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            maxWidth: "1000px",
            margin: "0 auto",
            color: "#fff"
          }}
        >
          Webs que no solo cargan.<br />
          <span className="text-gradient">Impactan en su negocio.</span>
        </motion.h1>

        {/* Subtítulo Limpio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="lead mb-5"
          style={{ 
            color: "var(--text-secondary)",
            maxWidth: "580px",
            margin: "0 auto",
            fontSize: "1.15rem",
            fontWeight: "400"
          }}
        >
          Ingeniería de software de alto rendimiento y sistemas de adquisición digital. Transformamos su presencia web en una herramienta de venta medible.
        </motion.p>

        {/* CTAs Profesionales */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="d-flex flex-wrap justify-content-center gap-3"
        >
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.98 }}
            className="btn-premium btn-primary btn-shine"
            style={{ textDecoration: "none" }}
          >
            Auditoría de Negocio
            <FaArrowRight size={12} />
          </motion.a>

          <motion.a
            href="#services"
            whileTap={{ scale: 0.98 }}
            className="btn-premium btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Nuestros Servicios
          </motion.a>
        </motion.div>

        {/* Stats Ultra-Minimalistas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-5 d-flex justify-content-center gap-5 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="small text-uppercase tracking-widest">Performance Enterprise</div>
          <div className="small text-uppercase tracking-widest">Sistemas Predictivos</div>
          <div className="small text-uppercase tracking-widest">+3x Conversión</div>
        </motion.div>
      </div>
    </section>
  );
}

