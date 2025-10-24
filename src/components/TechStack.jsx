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

  // 🌌 Fondo de partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 70;
    const maxDistance = 130;

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
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
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
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242, 154, 65, 0.5)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(255,255,255, ${
              0.05 + (1 - dist / maxDistance) * 0.08
            })`;
            ctx.lineWidth = 0.8;
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

  // 🔹 Tecnologías
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
    { name: "AWS", icon: <FaAws color="#FF9900" size={60} />, color: "#FF9900" },
    { name: "Google Cloud", icon: <SiGooglecloud color="#4285F4" size={60} />, color: "#4285F4" },
    { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={60} />, color: "#FFCA28" },
    { name: "Next.js", icon: <SiNextdotjs color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "React", icon: <FaReact color="#61DAFB" size={60} />, color: "#61DAFB" },
    { name: "Unity", icon: <FaUnity color="#FFFFFF" size={60} />, color: "#FFFFFF" },
    { name: "Unreal Engine", icon: <SiUnrealengine color="#0E1128" size={60} />, color: "#0E1128" },
    { name: "C++", icon: <SiCplusplus color="#00599C" size={60} />, color: "#00599C" },
    { name: "C#", icon: <SiDotnet color="#68217A" size={60} />, color: "#68217A" },
    { name: "N8N", icon: <SiNodedotjs color="#E74C3C" size={60} />, color: "#E74C3C" },
    { name: "IA", icon: <FaRobot color="#00A67E" size={60} />, color: "#00A67E" },
    { name: "GLSL", icon: <GiWireframeGlobe color="#A020F0" size={60} />, color: "#A020F0" },
    { name: "HLSL", icon: <GiWireframeGlobe color="#00BFFF" size={60} />, color: "#00BFFF" },
    { name: "VR / XR", icon: <FaVrCardboard color="#f29a41" size={60} />, color: "#f29a41" },
    { name: "3D Art", icon: <RiPaintBrushFill color="#e0c09f" size={60} />, color: "#e0c09f" },
    { name: "VFX", icon: <MdAnimation color="#FF4F4F" size={60} />, color: "#FF4F4F" },
    { name: "Sound Design", icon: <GiSoundWaves color="#00FFAA" size={60} />, color: "#00FFAA" },
    { name: "Animation", icon: <MdAnimation color="#f29a41" size={60} />, color: "#f29a41" },
    { name: "Figma", icon: <SiFigma color="#F24E1E" size={60} />, color: "#F24E1E" },
    { name: "Adobe XD", icon: <SiAdobexd color="#FF61F6" size={60} />, color: "#FF61F6" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="tech"
      className="py-5 text-center position-relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 20% 20%, #111 0%, #0b0b0b 100%)",
        color: "#f9eedb",
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* 🎇 Canvas Partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      {/* 🔮 Overlay animado */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          background:
            "linear-gradient(115deg, rgba(10, 90, 255, 0.15), rgba(255, 120, 0, 0.1))",
          animation: "gradientShift 8s ease-in-out infinite alternate",
        }}
      ></div>

      {/* 🌈 Keyframes inline */}
      <style>{`
        @keyframes gradientShift {
          0% { filter: hue-rotate(0deg); opacity: 0.25; }
          100% { filter: hue-rotate(30deg); opacity: 0.4; }
        }
      `}</style>

      {/* Contenido principal */}
      <motion.div
        className="container position-relative"
        style={{ zIndex: 2 }}
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h6
          className="text-uppercase mb-2"
          style={{ color: "#f29a41", letterSpacing: "2px" }}
        >
          Nuestro Stack Tecnológico
        </h6>
        <h2
          className="fw-bold mb-4"
          style={{ fontSize: "2.4rem", color: "#f9eedb" }}
        >
          Tecnología, creatividad y rendimiento al máximo nivel
        </h2>
        <p
          className="text-light mb-5"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#d8d0c2",
            fontSize: "1.05rem",
          }}
        >
          Utilizamos herramientas líderes y tecnologías de vanguardia para
          construir experiencias digitales potentes, seguras e innovadoras.
        </p>

        <div className="row justify-content-center g-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <div
                style={{
                  background:
                    hovered === index
                      ? `${tech.color}12`
                      : "rgba(255, 255, 255, 0.05)",
                  border:
                    hovered === index
                      ? `1px solid ${tech.color}`
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "18px",
                  padding: "24px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  boxShadow:
                    hovered === index
                      ? `0 0 25px ${tech.color}55`
                      : "0 0 15px rgba(0,0,0,0.4)",
                  color: "#f9eedb",
                }}
                className="h-100 d-flex flex-column align-items-center justify-content-center"
              >
                <div className="mb-3">{tech.icon}</div>
                <p
                  className="fw-semibold mb-0"
                  style={{
                    color: hovered === index ? tech.color : "#f9eedb",
                    fontSize: "1rem",
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
