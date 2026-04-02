import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function Insights() {
  const articles = [
    {
      title: "Por qué tu empresa necesita una web con React",
      excerpt:
        "Descubrí cómo React mejora el rendimiento, la escalabilidad y la experiencia de usuario de tu sitio.",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80",
      link: "/insights/react",
      tag: "Desarrollo",
    },
    {
      title: "Tendencias de diseño UX/UI en 2025",
      excerpt:
        "Los principios que definirán las interfaces del futuro: accesibilidad, microinteracciones y personalización.",
      image:
        "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1600&q=80",
      link: "/insights/ux",
      tag: "Diseño",
    },
    {
      title: "El futuro del branding digital",
      excerpt:
        "Cómo las marcas evolucionan hacia experiencias más inmersivas y personalizadas en el entorno digital.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80",
      link: "/insights/branding",
      tag: "Branding",
    },
    {
      title: "Cómo construir una estrategia digital efectiva en 2025",
      excerpt:
        "Aprendé cómo combinar diseño, desarrollo y análisis de datos para potenciar la presencia online de tu marca.",
      image:
        "https://images.unsplash.com/photo-1686061593269-420785fb8fa0?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=80",
      link: "/insights/estrategia",
      tag: "Estrategia",
    },
    {
      title: "La importancia del SEO técnico en sitios modernos",
      excerpt:
        "Cómo optimizar tu web para Google sin sacrificar diseño, velocidad ni experiencia de usuario.",
      image:
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=1600&q=80",
      link: "/insights/seo",
      tag: "SEO",
    },
    {
      title: "Cómo la inteligencia artificial redefine el diseño digital",
      excerpt:
        "De los prompts a la personalización: cómo la IA ayuda a crear experiencias más humanas y visuales.",
      image:
        "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=80",
      link: "/insights/ia",
      tag: "Innovación",
    },
  ];

  return (
    <section
      id="insights"
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "100px",
      }}
    >
      <SEO
        title="Insights y Blog"
        description="Artículos y reflexiones sobre diseño web, desarrollo React, UX/UI y branding digital. Mantente al día con las últimas tendencias."
        keywords="blog diseño web, articulos react, tendencias ux ui, branding digital, insights"
      />
      <div className="container">
        {/* 🔹 Encabezado principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h6 style={{ color: "#f29a41", letterSpacing: "5px", fontWeight: "800", fontSize: "0.75rem" }}>INSIGHTS</h6>
          <h2 className="display-4 fw-black mb-4" style={{ letterSpacing: "-0.05em" }}>
            Ingeniería de <span className="text-gradient">Pensamiento.</span>
          </h2>
          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.4)",
              lineHeight: "1.8",
              fontSize: "1.1rem",
              fontWeight: "400"
            }}
          >
            Ideas, estrategias y tendencias que aplicamos en nuestros proyectos para potenciar marcas de alto nivel y crear infraestructuras de crecimiento real.
          </p>
        </motion.div>

        {/* 🔸 Grilla de artículos */}
        <div className="row row-cols-1 row-cols-md-2 g-5">
          {articles.map((article, index) => (
            <div className="col" key={index}>
              <motion.article
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(242,154,65,0.05)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="card border-0 overflow-hidden h-100"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              >
                {/* 🖼️ Imagen con overlay */}
                <div
                  style={{
                    position: "relative",
                    height: "260px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    className="card-img-top"
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
                    }}
                  ></div>

                  {/* Etiqueta */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      color: "#f29a41",
                      padding: "6px 15px",
                      borderRadius: "2px",
                      fontWeight: "700",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      border: "0.5px solid rgba(242,154,65,0.3)"
                    }}
                  >
                    {article.tag}
                  </div>
                </div>

                {/* 📝 Contenido */}
                <div className="p-5">
                  <h4
                    className="fw-black"
                    style={{
                      color: "#ffffff",
                      marginBottom: "1rem",
                      fontSize: "1.5rem",
                      lineHeight: "1.2",
                      letterSpacing: "-0.03em"
                    }}
                  >
                    {article.title}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      marginBottom: "2rem",
                      fontWeight: "400"
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <Link
                    to={article.link}
                    style={{
                      color: "#f29a41",
                      textDecoration: "none",
                      fontWeight: "800",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Leer ingeniería →
                  </Link>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
