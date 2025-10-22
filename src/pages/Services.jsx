import React from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaCode,
  FaServer,
  FaGamepad,
  FaPencilRuler,
} from "react-icons/fa";

const services = [/* 🔹 Tu array original completo sin cambios */];

export default function Services() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="services"
      className="py-5 text-center position-relative"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
        zIndex: 1,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div
        className="container py-4 position-relative"
        style={{ zIndex: 2 }}
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h6
          className="text-uppercase mb-2"
          style={{ color: "#f29a41", letterSpacing: "2px" }}
        >
          Nuestros servicios
        </h6>

        <h2 className="fw-bold mb-4">
          Soluciones digitales para cada necesidad
        </h2>

        <p
          className="text-light mb-5"
          style={{ maxWidth: "700px", margin: "0 auto", color: "#d8d0c2" }}
        >
          Desde sitios web corporativos hasta videojuegos inmersivos,
          combinamos creatividad, tecnología y estrategia para ofrecer
          resultados reales.
        </p>

        <div className="row justify-content-center g-4">
          {services.map((s, index) => (
            <motion.div
              key={index}
              className="col-12 col-sm-6 col-lg-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: `0 0 20px ${s.color}33`,
                  transition: "all 0.3s ease",
                  padding: "24px",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  {s.icon && <div style={{ color: s.color }}>{s.icon}</div>}
                  <h5 className="fw-bold mb-0 ms-2" style={{ color: s.color }}>
                    {s.title}
                  </h5>
                </div>

                <p className="text-light mb-2">{s.desc}</p>
                <p
                  className="fw-semibold mb-3"
                  style={{ color: "#f29a41", fontSize: "0.9rem" }}
                >
                  Ideal para: <br />
                  <span className="text-light">{s.ideal}</span>
                </p>

                <ul className="list-unstyled mt-3 mb-4">
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

                <a
                  href="https://wa.me/5491133888802?text=¡Hola!%20Quiero%20más%20info%20sobre%20sus%20servicios%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
                  style={{
                    background: s.color,
                    border: "none",
                    color: "#0d0d0d",
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                >
                  Cotizar ahora <FaArrowRight className="ms-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
