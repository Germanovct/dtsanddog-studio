import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaAngular,
  FaCss3Alt,
  FaHtml5,
  FaJsSquare,
  FaNodeJs,
  FaWordpress,
} from "react-icons/fa";
import { SiMysql, SiVite, SiNextdotjs } from "react-icons/si";
import "../App.css";

const technologies = [
  { name: "Vite", icon: <SiVite color="#646CFF" size={60} />, color: "#646CFF" },
  { name: "Angular", icon: <FaAngular color="#DD0031" size={60} />, color: "#DD0031" },
  { name: "CSS3", icon: <FaCss3Alt color="#264de4" size={60} />, color: "#264de4" },
  { name: "HTML5", icon: <FaHtml5 color="#E44D26" size={60} />, color: "#E44D26" },
  { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" size={60} />, color: "#F7DF1E" },
  { name: "Node.js", icon: <FaNodeJs color="#3C873A" size={60} />, color: "#3C873A" },
  { name: "WordPress", icon: <FaWordpress color="#21759B" size={60} />, color: "#21759B" },
  { name: "MySQL", icon: <SiMysql color="#F29111" size={60} />, color: "#F29111" },
  { name: "Next.js", icon: <SiNextdotjs color="#FFFFFF" size={60} />, color: "#FFFFFF" },
  { name: "React", icon: <FaReact color="#61DAFB" size={60} />, color: "#61DAFB" },
];

export default function TechStack() {
  const [hovered, setHovered] = useState(null);

  // Animación de entrada (fade + slide up)
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="tech"
      className="py-5 text-center"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="container py-4"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h6
          className="text-uppercase mb-2"
          style={{ color: "#f29a41", letterSpacing: "2px" }}
        >
          Nuestras herramientas
        </h6>

        <h2 className="fw-bold mb-4">Tecnologías que usamos día a día</h2>

        <p
          className="text-light mb-5"
          style={{ maxWidth: "700px", margin: "0 auto", color: "#d8d0c2" }}
        >
          Nuestro proceso se basa en la colaboración, la estrategia y la atención
          al detalle, garantizando que cada proyecto sea una herramienta poderosa
          para alcanzar tus objetivos digitales.
        </p>
      </motion.div>

      <div className="container">
        <div className="row justify-content-center g-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.1 }}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <div
                className="tech-card p-3"
                style={{
                  background:
                    hovered === index
                      ? `${tech.color}15`
                      : "rgba(255, 255, 255, 0.05)",
                  border:
                    hovered === index
                      ? `1px solid ${tech.color}`
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  boxShadow:
                    hovered === index
                      ? `0 0 25px ${tech.color}55`
                      : "0 0 10px rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                  color: "#f9eedb",
                }}
              >
                <div className="mb-2">{tech.icon}</div>
                <p className="mt-2 fw-semibold">{tech.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
