import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        height: "100vh",
        background: "radial-gradient(circle at 30% 30%, #151515, #000)",
        color: "#f9eedb",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 🔮 Glow animado */}
      <div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          background: `
            radial-gradient(circle at 40% 40%, rgba(242,154,65,0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0%, transparent 40%)
          `,
          filter: "blur(80px)",
          zIndex: 0,
          animation: "moveGlow 8s ease-in-out infinite alternate",
        }}
      />

      {/* 🧱 Contenido principal */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        <h1
          className="fw-bold"
          style={{
            fontSize: "6rem",
            color: "#f29a41",
            textShadow: "0 0 30px rgba(242,154,65,0.4)",
          }}
        >
          404
        </h1>
        <h2 className="mb-3" style={{ fontWeight: 600 }}>
          Página no encontrada
        </h2>
        <p
          className="text-muted mb-5"
          style={{ color: "#d8d0c2", maxWidth: "500px", margin: "0 auto" }}
        >
          Parece que te perdiste entre líneas de código.  
          Pero tranquilo, podés volver al inicio y seguir explorando nuestro universo digital.
        </p>

        <Link
          to="/"
          className="btn btn-lg fw-semibold"
          style={{
            backgroundColor: "#f29a41",
            color: "#0a0a0a",
            borderRadius: "12px",
            padding: "10px 28px",
            transition: "all 0.3s ease",
            textDecoration: "none",
          }}
        >
          <FaArrowLeft className="me-2" />
          Volver al inicio
        </Link>
      </motion.div>

      {/* 🌈 Animación CSS */}
      <style>{`
        @keyframes moveGlow {
          0% { transform: translate(-10%, -10%) scale(1); opacity: 0.8; }
          100% { transform: translate(10%, 10%) scale(1.2); opacity: 1; }
        }
      `}</style>
    </motion.section>
  );
}
