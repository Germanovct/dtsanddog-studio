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
    desc: "Ecommerce profesional y veloz para vender sin límites.",
    ideal: "Negocios que buscan automatizar sus ventas y crecer online.",
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
  {
    title: "Desarrollo Frontend Profesional",
    desc: "Interfaces modernas, interactivas y de alto rendimiento.",
    ideal: "Startups, empresas y proyectos que buscan impacto visual.",
    color: "#61DAFB",
    icon: <FaCode size={22} />,
    features: [
      "SPA con React, Next.js o Vite",
      "Animaciones con Framer Motion",
      "Diseño responsive y accesible",
      "Integración con APIs externas",
      "Optimización de rendimiento",
      "SEO técnico y microdatos",
      "Deploy en Netlify o Vercel",
      { disabled: "Backend o base de datos" },
    ],
  },
  {
    title: "Desarrollo Backend & APIs",
    desc: "Potencia tu sistema con lógica sólida, rápida y segura.",
    ideal: "Aplicaciones que requieren bases de datos, lógica y escalabilidad.",
    color: "#FF9900",
    icon: <FaServer size={22} />,
    features: [
      "Node.js + Express.js",
      "Base de datos con MongoDB o MySQL",
      "APIs REST y GraphQL",
      "Autenticación JWT / OAuth",
      "Integraciones con AWS / Google Cloud",
      "Hosting en Render o Railway",
      "Documentación Swagger",
      { disabled: "Interfaz de usuario" },
    ],
  },
  {
    title: "Desarrollo de Videojuegos & Multimedia",
    desc: "Experiencias interactivas y visuales con tecnología de vanguardia.",
    ideal: "Estudios, marcas o artistas que buscan proyectos 3D, VR o inmersivos.",
    color: "#9B4F96",
    icon: <FaGamepad size={22} />,
    features: [
      "Motor Unity y Unreal Engine",
      "Programación en C#, C++, GLSL, HLSL",
      "Sound Design y efectos VFX",
      "Arte 3D y animación avanzada",
      "Diseño de niveles y experiencia de usuario",
      "Realidad virtual / aumentada (VR/XR)",
      "Optimización para desktop y mobile",
      { disabled: "Integración e-commerce" },
    ],
  },
  {
    title: "UX/UI Design & Prototyping",
    desc: "Diseño centrado en el usuario con interfaces limpias, usables y memorables.",
    ideal: "Empresas y startups que buscan mejorar la experiencia digital de sus productos.",
    color: "#E91E63",
    icon: <FaPencilRuler size={22} />,
    features: [
      "Research de usuario y journey mapping",
      "Wireframes y mockups interactivos",
      "Prototipado en Figma o Adobe XD",
      "Test de usabilidad y accesibilidad",
      "Diseño de sistemas y componentes UI",
      "Identidad visual y branding digital",
      "Guías de estilo y manual de marca",
      { disabled: "Desarrollo backend" },
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

        <h2 className="fw-bold mb-4">Soluciones digitales para cada necesidad</h2>

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
              className="col-12 col-md-6 col-lg-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  border: `1px solid rgba(255,255,255,0.1)`,
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

      {/* ✅ FIX para que se vea en todas las resoluciones */}
      <style jsx="true">{`
        #services {
          position: relative;
          z-index: 1;
        }
        #services .container {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </motion.section>
  );
}
