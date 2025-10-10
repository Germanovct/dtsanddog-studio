import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaHandshake,
  FaPaw,
  FaCode,
} from "react-icons/fa";

export default function WhyUs() {
  const [hovered, setHovered] = useState(null);
  const color = "#f29a41";

  const reasons = [
    {
      icon: <FaPaw size={36} />,
      title: "Alma creativa",
      desc: "Diseñamos cada proyecto con pasión, energía y un toque único, como si fuera nuestro propio sueño hecho código.",
    },
    {
      icon: <FaRocket size={36} />,
      title: "Innovación constante",
      desc: "Adoptamos las últimas tecnologías y frameworks para llevar tus ideas al siguiente nivel.",
    },
    {
      icon: <FaLightbulb size={36} />,
      title: "Estrategia y visión",
      desc: "No solo construimos sitios, construimos marcas digitales con propósito y dirección.",
    },
    {
      icon: <FaCode size={36} />,
      title: "Desarrollo a medida",
      desc: "Creamos soluciones escalables, optimizadas y seguras, pensadas para el crecimiento real de tu negocio.",
    },
    {
      icon: <FaHandshake size={36} />,
      title: "Compromiso real",
      desc: "Nos involucramos en cada detalle del proceso, desde la idea inicial hasta el lanzamiento.",
    },
    {
      icon: <FaHeart size={36} />,
      title: "Cercanía humana",
      desc: "Trabajamos con empatía, transparencia y buena energía. Porque detrás del código hay personas que aman lo que hacen.",
    },
  ];

  return (
    <section
      id="whyus"
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
          style={{ color, letterSpacing: "2px" }}
        >
          Por qué elegirnos
        </h6>
        <h2 className="fw-bold mb-4">Creamos soluciones con alma digital 🐾</h2>
        <p
          className="text-light mb-5"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#d8d0c2",
          }}
        >
          En DTS&DOG Studio combinamos creatividad, tecnología y estrategia para
          dar vida a experiencias digitales que inspiran, emocionan y generan
          resultados reales.
        </p>

        <div className="row justify-content-center g-4">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="col-12 col-sm-6 col-md-4"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <div
                className="p-4 rounded-4 h-100"
                style={{
                  background:
                    hovered === index
                      ? `${color}15`
                      : "rgba(255, 255, 255, 0.03)",
                  border:
                    hovered === index
                      ? `1px solid ${color}`
                      : "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    hovered === index
                      ? `0 0 25px ${color}55`
                      : "0 0 10px rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    color: hovered === index ? "#fff" : color,
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.icon}
                </div>
                <h5
                  className="fw-bold mb-2"
                  style={{
                    color: hovered === index ? "#fff" : "#f9eedb",
                  }}
                >
                  {item.title}
                </h5>
                <p
                  style={{
                    color:
                      hovered === index
                        ? "rgba(249,238,219,0.9)"
                        : "rgba(249,238,219,0.7)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
