import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Fractal Bar",
    desc: "Sitio web para club techno con estética inmersiva.",
    img: "/projects/fractal.jpg",
  },
  {
    title: "TCQ Cultura Techno",
    desc: "Plataforma de eventos con venta de tickets online.",
    img: "/projects/tcq.jpg",
  },
  {
    title: "Estudio Juridico",
    desc: "Landing Page utilizando ReactJs.",
    img: "/projects/venti.jpg",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-5" style={{ backgroundColor: "#f9eedb" }}>
      <div className="container text-center">
        <motion.h2
          className="fw-bold mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Proyectos Destacados
        </motion.h2>

        <div className="row g-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
            >
              <div
                className="card border-0 shadow-sm"
                style={{
                  backgroundColor: "#fffaf2",
                  borderRadius: "16px",
                }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="card-img-top"
                  style={{ borderRadius: "16px 16px 0 0" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold">{project.title}</h5>
                  <p className="text-muted">{project.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
