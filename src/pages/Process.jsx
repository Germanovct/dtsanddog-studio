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
        background: "#000",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.05)"
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
          className="text-uppercase mb-4"
          style={{
            color: "#f29a41",
            letterSpacing: "5px",
            fontWeight: "800",
            fontSize: "0.75rem"
          }}
        >
          Nuestro proceso
        </h6>

        <h2 className="display-4 fw-black mb-5" style={{ letterSpacing: "-0.05em", color: "#fff" }}>
          Ingeniería de <span className="text-gradient">Crecimiento.</span>
        </h2>

        <p
          className="mb-5"
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            color: "rgba(255,255,255,0.4)",
            fontSize: "1.1rem",
            lineHeight: "1.8",
            fontWeight: "400"
          }}
        >
          En <strong>DTS&DOG Studio</strong> aplicamos un enfoque estratégico que combina investigación profunda, diseño de conversión y desarrollo de alto rendimiento. Cada paso está diseñado para garantizar resultados medibles.
        </p>

        <div className="row justify-content-center g-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div
                className="p-5 h-100"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  textAlign: "left"
                }}
              >
                <div className="mb-4" style={{ filter: "drop-shadow(0 0 10px rgba(242, 154, 65, 0.2))" }}>{step.icon}</div>
                <h5
                  className="fw-black mb-3"
                  style={{
                    fontSize: "1.2rem",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}
                >
                  {step.title}
                </h5>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: "1.7",
                    margin: 0
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
