import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaCode, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <FaLightbulb size={50} color="#f29a41" />,
    title: "1. Descubrimiento & Estrategia",
    desc: "Analizamos tu visión, objetivos y público. Definimos una estrategia clara para convertir ideas en resultados concretos.",
  },
  {
    icon: <FaCode size={50} color="#61dafb" />,
    title: "2. Diseño & Desarrollo",
    desc: "Diseñamos experiencias digitales de alto impacto y desarrollamos con tecnologías modernas como React, Node.js y Vite.",
  },
  {
    icon: <FaRocket size={50} color="#3C873A" />,
    title: "3. Lanzamiento & Crecimiento",
    desc: "Optimizamos para rendimiento, SEO y escalabilidad. Acompañamos tu marca en su crecimiento y evolución digital.",
  },
];

export default function Process() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="process"
      className="py-5 text-center"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div
        className="container py-5"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h6
          className="text-uppercase mb-2"
          style={{
            color: "#f29a41",
            letterSpacing: "2px",
            fontWeight: "600",
          }}
        >
          Nuestro proceso
        </h6>

        <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>
          Creamos soluciones digitales con propósito
        </h2>

        <p
          className="text-light mb-5"
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            color: "#d8d0c2",
            fontSize: "1.05rem",
            lineHeight: "1.7",
          }}
        >
          En <strong>DTS&DOG Studio</strong> aplicamos un enfoque estratégico
          que combina investigación, diseño, desarrollo y crecimiento continuo.
          Cada paso está diseñado para garantizar resultados medibles y una
          experiencia digital memorable.
        </p>

        <div className="row justify-content-center g-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <div
                className="p-4 h-100"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "18px",
                  transition: "all 0.3s ease",
                  boxShadow:
                    "0 0 25px rgba(0,0,0,0.25), inset 0 0 10px rgba(255,255,255,0.02)",
                }}
              >
                <div className="mb-3">{step.icon}</div>
                <h5
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "1.1rem",
                    color: "#f9eedb",
                    textTransform: "uppercase",
                  }}
                >
                  {step.title}
                </h5>
                <p
                  className="text-light"
                  style={{
                    fontSize: "0.95rem",
                    color: "#dcd3c1",
                    lineHeight: "1.6",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
