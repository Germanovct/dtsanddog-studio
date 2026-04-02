import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleIA() {
  useEffect(() => {
    document.title =
      "Cómo la inteligencia artificial redefine el diseño digital | DTS&DOG Studio";
  }, []);

  const Section = ({ children }) => (
    <motion.section
      className="mb-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.section>
  );

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      <div className="container" style={{ maxWidth: 920 }}>
        <header className="mb-4">
          <span
            className="badge"
            style={{
              background: "rgba(242,154,65,.15)",
              color: "#f29a41",
              border: "1px solid rgba(242,154,65,.35)",
              padding: "8px 12px",
            }}
          >
            Innovación
          </span>
          <h1 className="fw-bold mt-3">
            Cómo la inteligencia artificial redefine el diseño digital
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            El panorama de la Inteligencia Artificial está cambiando. Ya no se trata de
            curiosidad, sino de integración profunda en el ROI del negocio.
          </p>
          <div
            style={{
              height: 240,
              background:
                "radial-gradient(1200px 240px at 50% 0%, rgba(242,154,65,.15), rgba(255,255,255,0) 60%)",
              border: "0.5px solid rgba(255,255,255,.12)",
              borderRadius: "4px",
            }}
          />
        </header>

        <Section>
          <h2 className="fw-semibold">Diseño aumentado</h2>
          <p>
            Herramientas como Midjourney, Runway o Figma AI aceleran la etapa de exploración visual. 
            Pero el criterio humano sigue definiendo el rumbo y la coherencia de marca.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Personalización inteligente</h2>
          <p>
            Aplicamos IA para generar experiencias dinámicas: contenidos, layouts o mensajes 
            que se adaptan al comportamiento de cada usuario sin perder estética.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Ética y autenticidad</h2>
          <p>
            La clave está en usar la IA como asistente, no como reemplazo.  
            Cada imagen, texto o flujo debe respetar la identidad y valores de la marca.
          </p>
        </Section>

        <div className="d-flex gap-2 mt-4">
          <a
            href="#contact"
            className="btn fw-black"
            style={{
              background: "#f29a41",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              padding: "15px 30px",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            Implementemos IA en tu empresa
          </a>
          <Link
            to="/insights"
            className="btn"
            style={{
              border: "0.5px solid rgba(255,255,255,.2)",
              color: "#fff",
              borderRadius: "4px",
              padding: "15px 30px",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            ← Volver a Insights
          </Link>
        </div>
      </div>
    </div>
  );
}
