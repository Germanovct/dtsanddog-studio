// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoLight from "../assets/logo/DTSandDOG-Studio-logo.png";
import logoDark from "../assets/logo/DTSandDOG-Studio-logo-dark.png";

export default function Hero() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);
    const listener = (e) => setIsDark(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <section
      className="text-center py-5"
      id="hero"
      style={{ backgroundColor: "#f9eedb", minHeight: "100vh" }}
    >
      <motion.img
        src={isDark ? logoDark : logoLight}
        alt="DTS&DOG Studio"
        height="140"
        className="mb-4 mt-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <h1 className="display-5 fw-bold text-dark">
        Creamos experiencias digitales
      </h1>
      <p className="lead text-secondary">
        Diseño, desarrollo y tecnología con alma creativa 🐾
      </p>

      <motion.a
        href="#services"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-dark mt-4 px-4 py-2 rounded-pill shadow-sm"
      >
        Conocé nuestros servicios
      </motion.a>
    </section>
  );
}
