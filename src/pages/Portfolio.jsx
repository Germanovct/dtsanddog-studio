import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Fractal Bar",
    desc: "Sitio web para club techno con estética inmersiva, inspirada en la cultura electrónica.",
    img: "/projects/fractal.jpg",
    url: "https://fractalbar.com.ar",
  },
  {
    title: "TCQ Cultura Techno",
    desc: "Plataforma de eventos con venta de tickets online y diseño responsive.",
    img: "/projects/tcq.jpg",
    url: "https://tcqclub.com",
  },
  {
    title: "Estudio Jurídico",
    desc: "Landing Page institucional creada con React y animaciones fluidas.",
    img: "/projects/venti.jpg",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-5"
      style={{
        background: "radial-gradient(circle at top, #111 0%, #000 100%)",
        color: "#f9eedb",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fondo animado */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(255,153,0,0.05), rgba(255,255,255,0.02))",
          mixBlendMode: "overlay",
          animation: "pulseGlow 8s ease-in-out infinite",
        }}
      />

      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }

          .portfolio-link {
            text-decoration: none;
            color: inherit;
          }

          .portfolio-link:hover {
            text-decoration: none;
          }
        `}
      </style>

      <div className="container text-center position-relative" style={{ zIndex: 2 }}>
        <motion.h6
          className="text-uppercase mb-2"
          style={{ color: "#f29a41", letterSpacing: "2px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nuestro trabajo
        </motion.h6>

        <motion.h2
          className="fw-bold mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Proyectos Destacados
        </motion.h2>

        <motion.p
          className="mb-5 text-light"
          style={{ maxWidth: "700px", margin: "0 auto", color: "#d8d0c2" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          Cada proyecto refleja nuestra pasión por el diseño, la tecnología y la
          innovación. Creamos experiencias digitales que conectan y generan
          resultados reales.
        </motion.p>

        <div className="row g-4 justify-content-center">
          {projects.map((project, i) => {
            const card = (
              <motion.div
                key={i}
                className="portfolio-card"
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                  position: "relative",
                  cursor: project.url ? "pointer" : "default",
                }}
              >
                {/* Imagen */}
                <motion.img
                  src={project.img}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    filter: "brightness(0.9)",
                    transition: "all 0.4s ease",
                  }}
                  whileHover={{ scale: 1.1, filter: "brightness(1)" }}
                />

                {/* Overlay SIEMPRE visible */}
                <motion.div
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
                    padding: "1.2rem",
                    textAlign: "left",
                    backdropFilter: "blur(6px)",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    pointerEvents: "none", // ✅ evita que bloquee el click del enlace
                  }}
                >
                  <h5
                    style={{
                      color: "#f29a41",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.title}
                  </h5>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#d8d0c2",
                      margin: 0,
                    }}
                  >
                    {project.desc}
                  </p>
                </motion.div>
              </motion.div>
            );

            return (
              <div key={i} className="col-12 col-sm-6 col-lg-4">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>

        {/* 🔶 Botón final */}
        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/portfolio"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              borderRadius: "30px",
              border: "2px solid #f29a41",
              color: "#f29a41",
              fontWeight: "600",
              letterSpacing: "1px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f29a41";
              e.target.style.color = "#0d0d0d";
              e.target.style.boxShadow = "0 0 20px #f29a41aa";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#f29a41";
              e.target.style.boxShadow = "none";
            }}
          >
            Ver más proyectos →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
