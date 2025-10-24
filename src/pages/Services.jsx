import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaServer,
  FaPaintBrush,
  FaGamepad,
  FaLightbulb,
  FaPencilRuler,
  FaCheck,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleService = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const services = [
    {
      title: "Desarrollo Web & Apps",
      desc: "Creamos sitios y aplicaciones de alto rendimiento, rápidos, seguros y escalables.",
      icon: <FaCode />,
      color: "#f29a41",
      gradient: "linear-gradient(90deg, #f29a41 0%, #ffcf6f 100%)",
      features: [
        "React, Next.js, Node.js y MongoDB",
        "Diseño responsive y accesible",
        "Integración con APIs externas",
        "SEO técnico y microdatos",
        "Hosting en Vercel o Netlify",
        { disabled: "Pasarelas de pago automáticas" },
      ],
    },
    {
      title: "Diseño UX/UI Estratégico",
      desc: "Diseñamos experiencias memorables que conectan a las personas con las marcas.",
      icon: <FaPencilRuler />,
      color: "#E91E63",
      gradient: "linear-gradient(90deg, #E91E63 0%, #FF8A80 100%)",
      features: [
        "Investigación y arquitectura UX",
        "Prototipado en Figma",
        "UI Design con guías visuales y estilo",
        "Tests de usabilidad",
        { disabled: "Desarrollo backend" },
      ],
    },
    {
      title: "Desarrollo Backend & APIs",
      desc: "Potenciamos tus proyectos con infraestructura sólida, escalable y eficiente.",
      icon: <FaServer />,
      color: "#FF9900",
      gradient: "linear-gradient(90deg, #FF9900 0%, #FFC266 100%)",
      features: [
        "Node.js + Express.js",
        "Base de datos con MongoDB o MySQL",
        "APIs REST y GraphQL",
        "Autenticación JWT / OAuth",
        { disabled: "Diseño frontend" },
      ],
    },
    {
      title: "Videojuegos & Experiencias 3D",
      desc: "Desarrollamos proyectos inmersivos con Unity y Unreal Engine, VR/AR y 3D art.",
      icon: <FaGamepad />,
      color: "#9B4F96",
      gradient: "linear-gradient(90deg, #9B4F96 0%, #D18CE0 100%)",
      features: [
        "Unity y Unreal Engine",
        "Programación en C# y C++",
        "Modelado 3D y efectos visuales",
        "Diseño de niveles y UX inmersivo",
        { disabled: "Integración ecommerce" },
      ],
    },
    {
      title: "Branding & Diseño Visual",
      desc: "Creamos identidades visuales coherentes, modernas y con personalidad propia.",
      icon: <FaPaintBrush />,
      color: "#646CFF",
      gradient: "linear-gradient(90deg, #646CFF 0%, #9DA5FF 100%)",
      features: [
        "Naming y storytelling",
        "Diseño de logotipo",
        "Guía de marca y estilo visual",
        "Brandbook digital interactivo",
      ],
    },
    {
      title: "Innovación & Consultoría Digital",
      desc: "Te ayudamos a transformar tu visión en estrategias y productos digitales efectivos.",
      icon: <FaLightbulb />,
      color: "#00C9A7",
      gradient: "linear-gradient(90deg, #00C9A7 0%, #00FFD1 100%)",
      features: [
        "Análisis de ecosistema digital",
        "Optimización de procesos",
        "Estrategia de crecimiento online",
        "Consultoría en automatización e IA",
      ],
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="services"
      className="py-5 text-light"
      style={{
        background: "radial-gradient(circle at center, #0a0a0a 0%, #000 100%)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {/* 🔹 Header */}
      <div className="container mb-5 text-center">
        <motion.h6
          className="text-uppercase mb-3"
          style={{ color: "#f29a41", letterSpacing: "2px" }}
          variants={fadeUp}
        >
          Servicios
        </motion.h6>

        <motion.h2
          className="fw-bold mb-3"
          style={{ color: "#f9eedb", fontSize: "2.3rem" }}
          variants={fadeUp}
        >
          Diseñamos. Desarrollamos. Innovamos.
        </motion.h2>

        <motion.p
          className="text-light"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#d8d0c2",
            fontSize: "1.05rem",
          }}
          variants={fadeUp}
        >
          En DTS&DOG Studio combinamos diseño, tecnología y estrategia para
          crear soluciones digitales que transforman negocios y generan impacto real.
        </motion.p>
      </div>

      {/* 🔸 Bloques */}
      <div className="container">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="service-block rounded-4 p-4 mb-4"
            style={{
              background:
                activeIndex === i
                  ? `linear-gradient(160deg, ${s.color}15, rgba(255,255,255,0.03))`
                  : "rgba(255,255,255,0.02)",
              border: activeIndex === i
                ? `1px solid ${s.color}88`
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                activeIndex === i
                  ? `0 0 25px ${s.color}55`
                  : "0 0 15px rgba(0,0,0,0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => toggleService(i)}
            whileHover={{ scale: 1.01, boxShadow: `0 0 25px ${s.color}33` }}
          >
            {/* 🧩 Header bloque */}
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-md-0">
                <div
                  className="icon-box me-3"
                  style={{
                    background: s.gradient,
                    color: "#0b0b0b",
                    borderRadius: "14px",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: s.color }}>
                    {s.title}
                  </h4>
                  <p
                    className="mb-0"
                    style={{
                      color: "#d8d0c2",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
              <FaArrowRight
                style={{
                  color: activeIndex === i ? s.color : "#888",
                  fontSize: "1.2rem",
                  transition: "transform 0.3s ease",
                  transform: activeIndex === i ? "rotate(90deg)" : "none",
                }}
              />
            </div>

            {/* 🔻 Contenido expandible */}
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3"
                >
                  <ul className="list-unstyled mt-3 mb-4 ps-2">
                    {s.features.map((f, i) => (
                      <li
                        key={i}
                        className="d-flex align-items-center mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {typeof f === "object" && "disabled" in f ? (
                          <>
                            <FaTimes color="#999" className="me-2" />
                            <span className="text-secondary">{f.disabled}</span>
                          </>
                        ) : (
                          <>
                            <FaCheck color={s.color} className="me-2" />
                            {f}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* ✨ Botón */}
                  <motion.button
                    className="btn fw-semibold mt-2"
                    style={{
                      background: s.color,
                      color: "#0b0b0b",
                      borderRadius: "8px",
                    }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else {
                        window.location.href = "/#contact";
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 20px ${s.color}88`,
                    }}
                  >
                    Cotizar ahora <FaArrowRight className="ms-2" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style>{`
        .service-block:hover .icon-box {
          transform: scale(1.08) rotate(3deg);
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .service-block {
            text-align: center;
          }
          .service-block .d-flex.align-items-center.justify-content-between {
            flex-direction: column;
          }
          .service-block .icon-box {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </motion.section>
  );
}
