import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // íconos elegantes

const projects = [
  {
    title: "TCQ Cultura Techno",
    desc: "Plataforma de eventos con venta de tickets online y diseño inmersivo.",
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
    url: "https://tcqclub.com",
    tag: "Desarrollo Web / Full Stack",
  },
  {
    title: "Estudio Jurídico SNA",
    desc: "Landing page profesional con estructura optimizada y carga veloz.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940",
    url: "https://estudio-juridicosna.netlify.app/",
    tag: "Desarrollo Web",
  },
  {
    title: "Calen Design",
    desc: "Diseño de tienda digital experiencia fluida , upgrade de Tienda Nube a web Propia.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940",
    url: "https://calendesign.mitiendanube.com/",
    tag: "E-commerce",
  },
  {
    title: "Landing Pag MP ",
    desc: "Landing page profesional con estructura optimizada y carga veloz.",
    img: "https://plus.unsplash.com/premium_photo-1682106686018-80ac772927d2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1932",
    url: "https://www.behance.net/gallery/171719855/Landing-Promocional",
    tag: "Diseño UX/UI",
  },
  {
    title: "Vincor App & Web ",
    desc: "Landing page profesional con estructura optimizada y carga veloz.",
    img: "https://images.unsplash.com/photo-1732142007807-c49145899f45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    url: "https://www.behance.net/gallery/133650053/Web-Desing-Vincor-Online",
    tag: "Diseño web & UX/UI",
  },
  {
    title: "App Mobile , Ir",
    desc: "App Mobile profesional con estructura optimizada y carga veloz.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    url: "https://www.behance.net/gallery/133581149/IR-%28con-vos-a-todos-lados%29",
    tag: "Diseño UX/UI",
  },
  
];

export default function Portfolio() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 350;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="portfolio"
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #000 100%)",
        color: "#f9eedb",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Encabezado */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h6 style={{ color: "#f29a41", letterSpacing: "2px" }}>
            PORTFOLIO
          </h6>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.2rem" }}>
            Proyectos que hablan por nosotros
          </h2>
          <p
            style={{
              color: "#d8d0c2",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1rem",
            }}
          >
            Cada proyecto combina estrategia, estética y tecnología. Deslizá o usá las
            flechas para explorar.
          </p>
        </motion.div>

        {/* Contenedor del carrusel */}
        <div style={{ position: "relative" }}>
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            style={arrowStyle("left")}
            aria-label="Anterior"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            style={arrowStyle("right")}
            aria-label="Siguiente"
          >
            <ChevronRight size={26} />
          </button>

          {/* Carrusel */}
          <motion.div
            ref={scrollRef}
            className="d-flex gap-4"
            style={{
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "1rem",
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.url || "#"}
                target={project.url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: "0 0 300px",
                  scrollSnapAlign: "start",
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                }}
              >
                <motion.img
                  src={project.img}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    filter: "brightness(0.9)",
                    transition: "filter 0.4s ease",
                  }}
                  whileHover={{ filter: "brightness(1)" }}
                />
                <div style={{ padding: "1rem" }}>
                  <span
                    style={{
                      background: "rgba(242,154,65,0.15)",
                      color: "#f29a41",
                      border: "1px solid rgba(242,154,65,0.3)",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    {project.tag}
                  </span>
                  <h5
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      marginTop: "0.8rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {project.title}
                  </h5>
                  <p
                    style={{
                      color: "#cfcfcf",
                      fontSize: "0.9rem",
                      margin: 0,
                    }}
                  >
                    {project.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 🔹 Estilo reutilizable para las flechas
const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "1rem",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.4)",
  color: "#f29a41",
  border: "none",
  borderRadius: "50%",
  width: "42px",
  height: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
  zIndex: 5,
  transition: "all 0.3s ease",
});
