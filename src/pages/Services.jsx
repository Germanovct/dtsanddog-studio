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
      title: "Infraestructura & Performance B2B",
      desc: "Llevamos la velocidad y arquitectura de su ecosistema al estándar enterprise. Carga instantánea, optimización backend y maximización absoluta de retención de usuarios.",
      icon: <FaCode />,
      features: [
        "Auditoría y Optimización de Core Web Vitals",
        "Arquitecturas Headless y Alta Disponibilidad",
        "Estrategias de Caché Nivel Servidor",
        "Experiencia Libre de Fricción (Mobile/Desktop)"
      ],
    },
    {
      title: "Sistemas Autónomos de Adquisición",
      desc: "Diseñamos y desplegamos bóvedas de datos e Inteligencia Artificial que prospectan, perfilan y conectan con CEOs de sus clientes ideales las 24 horas del día.",
      icon: <FaLightbulb />,
      features: [
        "Mapeo Algorítmico y Data-Scraping de Leads",
        "Agentes Automáticos de Contacto Multi-canal",
        "Integración Nativa con su actual CRM B2B",
        "Sistemas de Follow-up Predictivo"
      ],
    },
    {
      title: "Ingeniería de Software a Medida",
      desc: "Soluciones de software corporativo altamente escalables. Desarrollamos infraestructuras pesadas que reducen costos operativos y automatizan procesos de negocio.",
      icon: <FaServer />,
      features: [
        "Sistemas de Gestión Interna (ERP/CRM custom)",
        "Desarrollo de APIs e Integraciones Cloud",
        "Bases de Datos Permanentes (PostgreSQL/Supabase)",
        "Soporte de Arquitectura Serverless"
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
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="container py-5">
        <div className="row align-items-end mb-5">
          <div className="col-lg-6">
            <motion.h6
              className="text-uppercase mb-3"
              style={{ color: "var(--accent-orange)", letterSpacing: "3px", fontSize: "0.75rem" }}
              variants={fadeUp}
            >
              Nuestra Expertise
            </motion.h6>

            <motion.h2
              className="display-3 fw-black mb-0"
              style={{ color: "#fff", lineHeight: 1, letterSpacing: "-0.05em" }}
              variants={fadeUp}
            >
              Soluciones de <br /><span className="text-gradient">Alto Rendimiento.</span>
            </motion.h2>
          </div>
          <div className="col-lg-6">
            <motion.p
              className="mb-0 mt-3 mt-lg-0"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.15rem",
                maxWidth: "450px",
                lineHeight: "1.7",
                fontWeight: "400"
              }}
              variants={fadeUp}
            >
              Combinamos ingeniería de punta con inteligencia artificial para escalar su presencia digital y ventas de forma autónoma.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="p-5 mb-3"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onClick={() => toggleService(i)}
            whileHover={{ background: "rgba(255,255,255,0.03)", x: 10 }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  className="me-4 d-none d-md-flex"
                  style={{
                    color: "var(--accent-orange)",
                    fontSize: "1.5rem",
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <h4 className="fw-black mb-2" style={{ color: "#fff", fontSize: "1.6rem", letterSpacing: "-0.03em" }}>
                    {s.title}
                  </h4>
                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "1rem",
                      lineHeight: "1.6"
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
              <FaArrowRight
                style={{
                  color: activeIndex === i ? "var(--accent-orange)" : "rgba(255,255,255,0.2)",
                  fontSize: "1rem",
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
                    {s.features.map((f, idx) => (
                      <li
                        key={idx}
                        className="d-flex align-items-center mb-2"
                        style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)" }}
                      >
                        <FaCheck color="var(--accent-orange)" className="me-3" size={12} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className="btn-premium btn-secondary"
                    style={{
                      fontSize: "0.9rem",
                      padding: "10px 20px"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Consultar por este servicio
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
