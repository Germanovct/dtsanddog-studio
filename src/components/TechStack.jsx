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
  FaUnity,
  FaVrCardboard,
  FaAws,
  FaRobot,
} from "react-icons/fa";
import {
  SiMysql,
  SiVite,
  SiNextdotjs,
  SiExpress,
  SiGooglecloud,
  SiFirebase,
  SiTypescript,
  SiUnrealengine,
  SiCplusplus,
  SiDotnet,
  SiNodedotjs,
  SiFigma,
  SiAdobexd,
} from "react-icons/si";
import { GiSoundWaves, GiWireframeGlobe } from "react-icons/gi";
import { MdAnimation } from "react-icons/md";
import { RiPaintBrushFill } from "react-icons/ri";

export default function TechStack() {
  const [hovered, setHovered] = useState(null);

  const technologies = [/* 🔹 Tu array completo sin tocar */];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="tech"
      className="py-5 text-center position-relative"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        overflow: "visible",
        zIndex: 1,
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="container py-4 position-relative"
        style={{ zIndex: 2 }}
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
          Desde el desarrollo web hasta la creación de experiencias inmersivas y diseño UX/UI,
          utilizamos las tecnologías más potentes para materializar tus ideas.
        </p>
      </motion.div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
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
                className="tech-card"
                style={{
                  background:
                    hovered === index
                      ? `${tech.color}15`
                      : "rgba(255,255,255,0.05)",
                  border:
                    hovered === index
                      ? `1px solid ${tech.color}`
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "20px",
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
