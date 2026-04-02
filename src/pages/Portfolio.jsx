import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "TCQ Cultura Techno",
    desc: "Plataforma enterprise de gestión de eventos y venta de tickets.",
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
    url: "https://tcqclub.com",
    tag: "Full Stack Development",
    impact: "+2,500 Tickets Vendidos"
  },
  {
    title: "Estudio Jurídico SNA",
    desc: "Arquitectura digital de alto rendimiento para servicios legales.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940",
    url: "https://estudio-juridicosna.netlify.app/",
    tag: "Web Architecture",
    impact: "+180% Leads Orgánicos"
  },
  {
    title: "Calen Design",
    desc: "E-commerce boutique con experiencia de usuario optimizada.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940",
    url: "https://calendesign.mitiendanube.com/",
    tag: "E-commerce Strategy",
    impact: "Migración Exitosa"
  },
  {
    title: "Vincor Online",
    desc: "Dashboard de gestión y presencia digital de alto nivel.",
    img: "https://images.unsplash.com/photo-1732142007807-c49145899f45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    url: "https://www.behance.net/gallery/133650053/Web-Desing-Vincor-Online",
    tag: "Product Design",
    impact: "UX Score 95/100"
  },
];

export default function Portfolio() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 400;
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
        background: "#000",
        color: "#fff",
        padding: "120px 0",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-8">
            <motion.h6
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ color: "var(--accent-orange)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.75rem" }}
            >
              Portfolio Seleccionado
            </motion.h6>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="display-4 fw-bold"
              style={{ letterSpacing: "-0.03em" }}
            >
              Casos de Impacto.
            </motion.h2>
          </div>
          <div className="col-lg-4 text-lg-end d-none d-lg-block">
            <div className="d-flex justify-content-end gap-2">
              <button 
                onClick={() => scroll("left")}
                className="btn-premium btn-secondary" 
                style={{ width: "50px", height: "50px", padding: 0 }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="btn-premium btn-secondary" 
                style={{ width: "50px", height: "50px", padding: 0 }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          ref={scrollRef}
          className="d-flex gap-4"
          style={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "2rem",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              style={{
                flex: "0 0 380px",
                scrollSnapAlign: "start",
                position: "relative",
                cursor: "pointer"
              }}
              whileHover="hover"
            >
              <a 
                href={project.url} 
                target="_blank" 
                rel="noreferrer" 
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Image Container */}
                <div 
                  style={{
                    height: "450px",
                    overflow: "hidden",
                    borderRadius: "4px",
                    position: "relative",
                    background: "#0a0a0a"
                  }}
                >
                  <motion.img
                    variants={{
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={project.img}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.7
                    }}
                  />
                  
                  {/* Overlay Meta */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      right: "20px",
                      zIndex: 2
                    }}
                  >
                    <span 
                      style={{
                        background: "rgba(0,0,0,0.8)",
                        backdropFilter: "blur(4px)",
                        color: "var(--accent-orange)",
                        padding: "6px 12px",
                        borderRadius: "2px",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        borderLeft: "2px solid var(--accent-orange)"
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Impact Badge */}
                  <motion.div
                    variants={{
                      hover: { y: 0, opacity: 1 }
                    }}
                    initial={{ y: 10, opacity: 0 }}
                    style={{
                      position: "absolute",
                      bottom: "100px",
                      left: "20px",
                      zIndex: 2,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "10px 15px",
                      borderRadius: "4px"
                    }}
                  >
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Resultado</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>{project.impact}</div>
                  </motion.div>

                  {/* Info Overlay Bottom */}
                  <div 
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "30px 20px",
                      background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
                      zIndex: 1
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <h4 className="fw-bold mb-1" style={{ fontSize: "1.5rem" }}>{project.title}</h4>
                        <p className="mb-0" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", maxWidth: "250px" }}>
                          {project.desc}
                        </p>
                      </div>
                      <div 
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff"
                        }}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
