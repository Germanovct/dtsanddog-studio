import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaLightbulb, FaCode } from "react-icons/fa";

export default function WhyUs() {
  const color = "var(--accent-orange)";

  const reasons = [
    {
      icon: <FaRocket />,
      title: "Rendimiento Extremo",
      desc: "Optimizamos cada byte para que su web cargue en menos de un segundo, reduciendo la tasa de rebote al mínimo.",
    },
    {
      icon: <FaLightbulb />,
      title: "Prospección Inteligente",
      desc: "Nuestros sistemas de adquisición trabajan 24/7 buscando y filtrando los mejores leads para su modelo de negocio.",
    },
    {
      icon: <FaCode />,
      title: "Ingeniería de Venta",
      desc: "No solo escribimos código; diseñamos arquitecturas digitales orientadas 100% a la conversión de clientes.",
    },
  ];

  return (
    <section
      id="whyus"
      className="py-5"
      style={{
        background: "#000",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="container py-5">
        <div className="text-center mb-5">
          <h6
            className="text-uppercase mb-4"
            style={{ color, letterSpacing: "5px", fontSize: "0.75rem", fontWeight: "800" }}
          >
            Diferencial
          </h6>
          <h2 className="display-4 fw-black mb-0" style={{ letterSpacing: "-0.05em", color: "#fff" }}>
            Por qué trabajar con <span className="text-gradient">DTS&DOG</span>
          </h2>
        </div>

        <div className="row justify-content-center g-4 mt-2">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="col-lg-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="p-5 h-100"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  backdropFilter: "blur(10px)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  textAlign: "left",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div
                  className="mb-3"
                  style={{ color, fontSize: "1.2rem" }}
                >
                  {item.icon}
                </div>
                <h5 className="fw-bold mb-3" style={{ fontSize: "1.2rem" }}>
                  {item.title}
                </h5>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    margin: 0,
                    fontWeight: "400"
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
