import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Fractal Bar",
    desc: "Sitio web para club techno con estética inmersiva, inspirada en la cultura electrónica.",
    img: "/projects/fractal.jpg",
  },
  {
    title: "TCQ Cultura Techno",
    desc: "Plataforma de eventos con venta de tickets online y diseño responsive.",
    img: "/projects/tcq.jpg",
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
      className="py-5"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      <div className="container text-center">
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
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="col-12 col-sm-6 col-lg-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                className="portfolio-card"
              >
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  <motion.img
                    src={project.img}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      transition: "all 0.4s ease",
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                <div
                  style={{
                    padding: "1.2rem",
                    textAlign: "left",
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
