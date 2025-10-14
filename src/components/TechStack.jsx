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
  FaAws, // ✅ Logo oficial de AWS
  FaRobot, // 🤖 Nuevo ícono de IA futurista
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
  SiNodedotjs, // ✅ Placeholder temporal para N8N
} from "react-icons/si";
import {
  GiSoundWaves,
  GiWireframeGlobe,
} from "react-icons/gi";
import { MdAnimation } from "react-icons/md";
import { RiPaintBrushFill } from "react-icons/ri";

export default function TechStack() {
  const [hovered, setHovered] = useState(null);

  const technologies = [
    { name: "Vite", icon: <SiVite color="#646CFF" size={60} />, color: "#646CFF" },
    { name: "Angular", icon: <FaAngular color="#DD0031" size={60} />, color: "#DD0031" },
    { name: "CSS3", icon: <FaCss3Alt color="#264de4" size={60} />, color: "#264de4" },
    { name: "HTML5", icon: <FaHtml5 color="#E44D26" size={60} />, color: "#E44D26" },
    { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" size={60} />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" size={60} />, color: "#3178C6" },
    { name: "Node.js", icon: <FaNodeJs color="#3C873A" size={60} />, color: "#3C873A" },
    { name: "Express.js", icon: <SiExpress color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "WordPress", icon: <FaWordpress color="#21759B" size={60} />, color: "#21759B" },
    { name: "MySQL", icon: <SiMysql color="#F29111" size={60} />, color: "#F29111" },
    { name: "AWS", icon: <FaAws color="#FF9900" size={60} />, color: "#FF9900" }, // ✅ Logo oficial y estable
    { name: "Google Cloud", icon: <SiGooglecloud color="#4285F4" size={60} />, color: "#4285F4" },
    { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={60} />, color: "#FFCA28" },
    { name: "Next.js", icon: <SiNextdotjs color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "React", icon: <FaReact color="#61DAFB" size={60} />, color: "#61DAFB" },
    { name: "Unity", icon: <FaUnity color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "Unreal Engine", icon: <SiUnrealengine color="#0E1128" size={60} />, color: "#0E1128" },
    { name: "C++", icon: <SiCplusplus color="#00599C" size={60} />, color: "#00599C" },
    { name: "C#", icon: <SiDotnet color="#68217A" size={60} />, color: "#68217A" },

    // 🔴 N8N (placeholder temporal hasta actualizar react-icons)
    { name: "N8N", icon: <SiNodedotjs color="#E74C3C" size={60} />, color: "#E74C3C" },
    // Cuando actualices react-icons podés cambiar por:
    // { name: "N8N", icon: <SiN8n color="#E74C3C" size={60} />, color: "#E74C3C" },

    // 🤖 Inteligencia Artificial futurista
    { name: "IA", icon: <FaRobot color="#00A67E" size={60} />, color: "#00A67E" },

    { name: "GLSL", icon: <GiWireframeGlobe color="#A020F0" size={60} />, color: "#A020F0" },
    { name: "HLSL", icon: <GiWireframeGlobe color="#00BFFF" size={60} />, color: "#00BFFF" },
    { name: "VR / XR", icon: <FaVrCardboard color="#f29a41" size={60} />, color: "#f29a41" },
    { name: "3D Art", icon: <RiPaintBrushFill color="#e0c09f" size={60} />, color: "#e0c09f" },
    { name: "VFX", icon: <MdAnimation color="#FF4F4F" size={60} />, color: "#FF4F4F" },
    { name: "Sound Design", icon: <GiSoundWaves color="#00FFAA" size={60} />, color: "#00FFAA" },
    { name: "Animation", icon: <MdAnimation color="#f29a41" size={60} />, color: "#f29a41" },
  ];

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
          Desde el desarrollo web hasta la creación de experiencias inmersivas, utilizamos
          las tecnologías más potentes para materializar tus ideas.
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
                className="tech-card"
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
