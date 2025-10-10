import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaCode, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <FaLightbulb size={50} color="#f29a41" />,
    title: "1. Descubrimiento & Estrategia",
    desc: "Comenzamos entendiendo tu visión, tu marca y tus objetivos. Creamos una estrategia digital sólida para transformar tus ideas en resultados.",
  },
  {
    icon: <FaCode size={50} color="#61dafb" />,
    title: "2. Diseño & Desarrollo",
    desc: "Diseñamos experiencias visuales únicas y desarrollamos soluciones eficientes con tecnologías modernas como React, Node.js y Vite.",
  },
  {
    icon: <FaRocket size={50} color="#3C873A" />,
    title: "3. Lanzamiento & Crecimiento",
    desc: "Optimizamos tu proyecto para rendimiento, SEO y escalabilidad. Te acompañamos en la evolución y el crecimiento digital de tu marca.",
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
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
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
          Nuestro proceso
        </h6>

        <h2 className="fw-bold mb-4">Creamos soluciones con propósito</h2>

        <p
          className="text-light mb-5"
          style={{ maxWidth: "700px", margin: "0 auto", color: "#d8d0c2" }}
        >
          En DTS&DOG Studio cada proyecto es una aventura: combinamos
          creatividad, tecnología y estrategia para lograr resultados únicos y
          sostenibles.
        </p>

        <div className="row justify-content-center g-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="p-4 h-100"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="mb-3">{step.icon}</div>
                <h5 className="fw-bold mb-3">{step.title}</h5>
                <p className="text-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
