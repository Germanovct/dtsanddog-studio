import React, { useState, useEffect, useRef } from "react";
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
  const canvasRef = useRef(null);

  // 🌌 Fondo de partículas optimizado
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const maxDistance = 120;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242,154,65,0.4)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(255,255,255,${
              0.02 + (1 - dist / maxDistance) * 0.05
            })`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const technologies = [
    { name: "Vite", icon: <SiVite color="#646CFF" size={56} />, color: "#646CFF" },
    { name: "Angular", icon: <FaAngular color="#DD0031" size={56} />, color: "#DD0031" },
    { name: "CSS3", icon: <FaCss3Alt color="#264de4" size={56} />, color: "#264de4" },
    { name: "HTML5", icon: <FaHtml5 color="#E44D26" size={56} />, color: "#E44D26" },
    { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" size={56} />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" size={56} />, color: "#3178C6" },
    { name: "Node.js", icon: <FaNodeJs color="#3C873A" size={56} />, color: "#3C873A" },
    { name: "Express.js", icon: <SiExpress color="#FFFFFF" size={56} />, color: "#FFFFFF" },
    { name: "WordPress", icon: <FaWordpress color="#21759B" size={56} />, color: "#21759B" },
    { name: "MySQL", icon: <SiMysql color="#F29111" size={56} />, color: "#F29111" },
    { name: "AWS", icon: <FaAws color="#FF9900" size={56} />, color: "#FF9900" },
    { name: "Google Cloud", icon: <SiGooglecloud color="#4285F4" size={56} />, color: "#4285F4" },
    { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={56} />, color: "#FFCA28" },
    { name: "Next.js", icon: <SiNextdotjs color="#FFFFFF" size={56} />, color: "#FFFFFF" },
    { name: "React", icon: <FaReact color="#61DAFB" size={56} />, color: "#61DAFB" },
    { name: "Unity", icon: <FaUnity color="#FFFFFF" size={56} />, color: "#FFFFFF" },
    { name: "Unreal Engine", icon: <SiUnrealengine color="#0E1128" size={56} />, color: "#0E1128" },
    { name: "C++", icon: <SiCplusplus color="#00599C" size={56} />, color: "#00599C" },
    { name: "C#", icon: <SiDotnet color="#68217A" size={56} />, color: "#68217A" },
    { name: "N8N", icon: <SiNodedotjs color="#E74C3C" size={56} />, color: "#E74C3C" },
    { name: "IA", icon: <FaRobot color="#00A67E" size={56} />, color: "#00A67E" },
    { name: "GLSL", icon: <GiWireframeGlobe color="#A020F0" size={56} />, color: "#A020F0" },
    { name: "HLSL", icon: <GiWireframeGlobe color="#00BFFF" size={56} />, color: "#00BFFF" },
    { name: "VR / XR", icon: <FaVrCardboard color="#f29a41" size={56} />, color: "#f29a41" },
    { name: "3D Art", icon: <RiPaintBrushFill color="#e0c09f" size={56} />, color: "#e0c09f" },
    { name: "VFX", icon: <MdAnimation color="#FF4F4F" size={56} />, color: "#FF4F4F" },
    { name: "Sound Design", icon: <GiSoundWaves color="#00FFAA" size={56} />, color: "#00FFAA" },
    { name: "Animation", icon: <MdAnimation color="#f29a41" size={56} />, color: "#f29a41" },
    { name: "Figma", icon: <SiFigma color="#F24E1E" size={56} />, color: "#F24E1E" },
    { name: "Adobe XD", icon: <SiAdobexd color="#FF61F6" size={56} />, color: "#FF61F6" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="tech"
      className="py-5 text-center position-relative overflow-hidden"
      style={{
        background: "#000",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.08 }}
    >
      {/* Canvas partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Overlay animado */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.01), rgba(242,154,65,0.02))",
        }}
      />

      {/* Keyframes */}
      <style>{`
        @media (max-width: 768px) {
          .tech-card { padding: 16px !important; }
          .tech-card p { font-size: 0.85rem !important; }
        }
      `}</style>

      {/* Contenido */}
      <motion.div
        className="container position-relative"
        style={{ zIndex: 2 }}
        variants={fadeUp}
      >
        <h6
          className="text-uppercase mb-2"
          style={{ color: "var(--accent-orange)", letterSpacing: "3px", fontSize: "0.75rem" }}
        >
          Tech Stack
        </h6>
        <h2 className="fw-bold mb-4 display-5" style={{ color: "#fff", letterSpacing: "-0.02em" }}>
          Ingeniería de Clase Mundial.
        </h2>
        <p
          className="mb-5"
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            color: "rgba(255,255,255,0.6)",
            fontSize: "1.1rem",
          }}
        >
          Combinamos las herramientas más potentes del mercado con una arquitectura digital robusta para escalar su negocio al siguiente nivel.
        </p>

        <div className="row justify-content-center g-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <div
                className="tech-card d-flex flex-column align-items-center justify-content-center h-100"
                style={{
                  background:
                    hovered === i
                      ? `${tech.color}10`
                      : "rgba(255,255,255,0.02)",
                  border:
                    hovered === i
                      ? `1px solid ${tech.color}50`
                      : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  padding: "20px",
                  transition: "all 0.3s ease",
                  color: "#fff",
                }}
              >
                <div className="mb-3" style={{ opacity: hovered === i ? 1 : 0.7, transition: "opacity 0.3s" }}>{tech.icon}</div>
                <p
                  className="fw-semibold mb-0"
                  style={{
                    color: hovered === i ? "#fff" : "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}
                >
                  {tech.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
