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
  FaAws,
  FaCode,
} from "react-icons/fa";
import {
  SiMysql,
  SiVite,
  SiNextdotjs,
  SiExpress,
  SiGooglecloud,
  SiUnity,
  SiUnrealengine,
  SiCplusplus,
  SiOpengl,
  SiNvidia,
  SiVirtualbox,
  SiBlender,
  SiAdobeaftereffects,
  SiAdobeaudition,
} from "react-icons/si";

export default function TechStack() {
  const [hovered, setHovered] = useState(null);

  const technologies = [
    // 🧩 Web stack actual
    { name: "Vite", icon: <SiVite color="#646CFF" size={60} />, color: "#646CFF" },
    { name: "Angular", icon: <FaAngular color="#DD0031" size={60} />, color: "#DD0031" },
    { name: "CSS3", icon: <FaCss3Alt color="#264de4" size={60} />, color: "#264de4" },
    { name: "HTML5", icon: <FaHtml5 color="#E44D26" size={60} />, color: "#E44D26" },
    { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" size={60} />, color: "#F7DF1E" },
    { name: "Node.js", icon: <FaNodeJs color="#3C873A" size={60} />, color: "#3C873A" },
    { name: "Express.js", icon: <SiExpress color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "WordPress", icon: <FaWordpress color="#21759B" size={60} />, color: "#21759B" },
    { name: "MySQL", icon: <SiMysql color="#F29111" size={60} />, color: "#F29111" },
    { name: "AWS", icon: <FaAws color="#FF9900" size={60} />, color: "#FF9900" },
    { name: "Google Cloud", icon: <SiGooglecloud color="#4285F4" size={60} />, color: "#4285F4" },
    { name: "Next.js", icon: <SiNextdotjs color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "React", icon: <FaReact color="#61DAFB" size={60} />, color: "#61DAFB" },

    // 🎮 Videojuegos y multimedia
    { name: "Unity", icon: <SiUnity color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "Unreal Engine", icon: <SiUnrealengine color="#0E1128" size={60} />, color: "#0E1128" },
    { name: "C++", icon: <SiCplusplus color="#00599C" size={60} />, color: "#00599C" },
    { name: "C#", icon: <FaCode color="#9B4F96" size={60} />, color: "#9B4F96" },
    { name: "GLSL", icon: <SiOpengl color="#5586A4" size={60} />, color: "#5586A4" },
    { name: "HLSL", icon: <SiNvidia color="#76B900" size={60} />, color: "#76B900" },
    { name: "VR / XR", icon: <SiVirtualbox color="#0078D7" size={60} />, color: "#0078D7" },
    { name: "3D Art", icon: <SiBlender color="#F5792A" size={60} />, color: "#F5792A" },
    { name: "VFX", icon: <SiAdobeaftereffects color="#9999FF" size={60} />, color: "#9999FF" },
    { name: "Sound Design", icon: <SiAdobeaudition color="#00A4E4" size={60} />, color: "#00A4E4" },
    { name: "Game Design", icon: <FaCode color="#FFD700" size={60} />, color: "#FFD700" },
    { name: "Animation", icon: <SiAdobeaftereffects color="#AE81FF" size={60} />, color: "#AE81FF" },
    { name: "Apps Multimedia", icon: <SiUnity color="#CCCCCC" size={60} />, color: "#CCCCCC" },
  ];

  return (
    <section
      id="tech"
      className="py-5 text-center"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      <div className="container py-4">
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

        <div className="row justify-content-center g-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
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
    </section>
  );
}
