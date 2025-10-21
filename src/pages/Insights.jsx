import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Insights() {
  const articles = [
    {
      title: "Por qué tu empresa necesita una web con React",
      excerpt:
        "Descubrí cómo React mejora el rendimiento, la escalabilidad y la experiencia de usuario de tu sitio.",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
      link: "/insights/react",
      tag: "Desarrollo",
    },
    {
      title: "Tendencias de diseño UX/UI en 2025",
      excerpt:
        "Los principios que definirán las interfaces del futuro: accesibilidad, microinteracciones y personalización.",
      image:
        "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1200&q=80",
      link: "/insights/ux",
      tag: "Diseño",
    },
    {
      title: "El futuro del branding digital",
      excerpt:
        "Cómo las marcas evolucionan hacia experiencias más inmersivas y personalizadas en el entorno digital.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
      link: "/insights/branding",
      tag: "Branding",
    },
    {
      title: "Cómo construir una estrategia digital efectiva en 2025",
      excerpt:
        "Aprendé cómo combinar diseño, desarrollo y análisis de datos para potenciar la presencia online de tu marca.",
      image:
        "https://images.unsplash.com/photo-1686061593269-420785fb8fa0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940",
      link: "/insights/estrategia",
      tag: "Estrategia",
    },
    {
      title: "La importancia del SEO técnico en sitios modernos",
      excerpt:
        "Cómo optimizar tu web para Google sin sacrificar diseño, velocidad ni experiencia de usuario.",
      image:
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=1200&q=80",
      link: "/insights/seo",
      tag: "SEO",
    },
    {
      title: "Cómo la inteligencia artificial redefine el diseño digital",
      excerpt:
        "De los prompts a la personalización: cómo la IA ayuda a crear experiencias más humanas y visuales.",
      image:
        "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3000",
      link: "/insights/ia",
      tag: "Innovación",
    },
  ];

  return (
    <section
      id="insights"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "100px",
      }}
    >
      <div className="container">
        {/* 🔹 Encabezado animado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h6 style={{ color: "#f29a41", letterSpacing: "2px" }}>INSIGHTS</h6>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.2rem" }}>
            Artículos y reflexiones
          </h2>
          <p style={{ maxWidth: "650px", margin: "0 auto", color: "#cfcfcf" }}>
            Explorá ideas sobre diseño, desarrollo y estrategia digital que impulsan el
            crecimiento de las marcas.
          </p>
        </motion.div>

        {/* 🔸 Grilla de artículos */}
        <div className="row row-cols-1 row-cols-md-2 g-5">
          {articles.map((article, index) => (
            <div className="col" key={index}>
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(242,154,65,0.25)",
                }}
                transition={{ duration: 0.3 }}
                className="card border-0 rounded-4 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  height: "100%",
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
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "20px",
                      background: "#f29a41",
                      color: "#0d0d0d",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    {article.tag}
                  </div>
                </div>

                {/* 📝 Contenido */}
                <div className="p-4">
                  <h4
                    className="fw-bold"
                    style={{
                      color: "#ffffff",
                      marginBottom: "0.75rem",
                      fontSize: "1.3rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {article.title}
                  </h4>
                  <p
                    style={{
                      color: "#d6d6d6",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <Link
                    to={article.link}
                    style={{
                      color: "#f29a41",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    Leer artículo →
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
