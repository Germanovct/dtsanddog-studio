import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaArrowRight } from "react-icons/fa";

const services = [
  {
    title: "Landing Page de Alta Conversión",
    desc: "Página ultrafocalizada en un solo objetivo: vender.",
    ideal: "Campañas, lanzamientos y ventas de servicios o productos efectivos.",
    color: "#f29a41",
    features: [
      "Optimizada para conversión",
      "Hasta 7 secciones",
      "Correos corporativos",
      "Formulario de contacto",
      "Diseño responsive",
      "Botón de WhatsApp",
      "Investigación de competencia",
      "Indexación en Google y Bing",
      "SSL gratis",
      "SEO On Page básico",
      "3 meses de soporte bonificado",
      { disabled: "Carrito de compras" },
      { disabled: "Pasarelas de pago" },
      { disabled: "Medios de envío" },
    ],
  },
  {
    title: "Web Corporativa Profesional",
    desc: "Hasta 10 páginas estratégicas e innovadoras para superar a tu competencia.",
    ideal: "Mejorar presencia, autoridad y confianza de tu marca al mundo.",
    color: "#646CFF",
    features: [
      "Optimizada para conversión",
      "Hasta 10 páginas",
      "Correos corporativos",
      "Formulario de contacto",
      "Diseño responsive",
      "Botón de WhatsApp",
      "Investigación de competencia",
      "Indexación en Google y Bing",
      "SSL gratis",
      "SEO On Page básico",
      "3 meses de soporte bonificado",
      { disabled: "Carrito de compras" },
      { disabled: "Pasarelas de pago" },
      { disabled: "Medios de envío" },
    ],
  },
  {
    title: "Tienda Online Optimizada",
    desc: "Ecommerce optimizado, profesional y veloz para no parar de vender.",
    ideal: "Campañas, lanzamientos, automatizaciones y ventas 24/7.",
    color: "#3C873A",
    features: [
      "Optimizada para conversión",
      "Hasta 10 páginas",
      "Correos corporativos",
      "Formulario de contacto",
      "Diseño responsive",
      "Botón de WhatsApp",
      "Investigación de competencia",
      "Indexación en Google y Bing",
      "SSL gratis",
      "SEO On Page básico",
      "3 meses de soporte bonificado",
      "Carrito de compras",
      "Pasarelas de pago",
      "Medios de envío",
    ],
  },
];

export default function Services() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="services"
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
          Nuestros servicios
        </h6>

        <h2 className="fw-bold mb-4">Soluciones web que impulsan tu marca</h2>

        <p
          className="text-light mb-5"
          style={{ maxWidth: "700px", margin: "0 auto", color: "#d8d0c2" }}
        >
          Diseñamos y desarrollamos sitios web enfocados en resultados:
          estética, rendimiento y estrategia digital al servicio de tu negocio.
        </p>

        <div className="row justify-content-center g-4">
          {services.map((s, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  boxShadow: `0 0 20px ${s.color}33`,
                  transition: "all 0.3s ease",
                }}
                className="p-4 h-100 text-start"
              >
                <h5 className="fw-bold mb-3" style={{ color: s.color }}>
                  {s.title}
                </h5>
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
