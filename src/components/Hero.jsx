import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "../assets/logo/DTSandDOG-Studio-logo.png";
import logoDark from "../assets/logo/DTSandDOG-Studio-logo-dark.png";

export default function Hero() {
  const [isDark, setIsDark] = useState(false);
  const [index, setIndex] = useState(0);

  const keywords = [
    "Diseño",
    "Desarrollo",
    "Branding",
    "Experiencias",
    "Tecnología",
  ];

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);
    const listener = (e) => setIsDark(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="position-relative text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
        color: "#f9eedb",
      }}
    >
      {/* 🔮 Fondo animado con gradiente */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(242,154,65,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(97,218,251,0.15), transparent 50%)",
          zIndex: 0,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* 🌟 Contenido */}
      <motion.div
        className="container position-relative text-center"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.img
          src={isDark ? logoDark : logoLight}
          alt="DTS&DOG Studio"
          height="160"
          className="mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <motion.h1
          className="fw-bold mb-3"
          style={{ fontSize: "2.8rem", letterSpacing: "1px" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Creamos experiencias digitales con{" "}
          <span style={{ color: "#f29a41" }}>alma</span>
        </motion.h1>

        {/* ✨ Texto rotativo dinámico */}
        <div style={{ height: "40px", position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: "#61dafb",
                position: "absolute",
                width: "100%",
              }}
            >
              {keywords[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          className="lead mb-4 mt-4"
          style={{ color: "#d8d0c2", fontSize: "1.1rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          En DTS&DOG Studio combinamos arte, desarrollo y estrategia para crear
          marcas que inspiran y conectan.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="d-flex justify-content-center gap-3 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-light px-4 py-2 rounded-pill fw-semibold shadow-sm"
            style={{ color: "#0d0d0d" }}
          >
            Ver servicios
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn px-4 py-2 rounded-pill fw-semibold"
            style={{
              backgroundColor: "#f29a41",
              border: "none",
              color: "#0d0d0d",
            }}
          >
            Contanos tu idea 🚀
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
