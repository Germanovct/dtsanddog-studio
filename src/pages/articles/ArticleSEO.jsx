import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleSEO() {
  useEffect(() => {
    document.title =
      "La importancia del SEO técnico en sitios modernos | DTS&DOG Studio";
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
        background: "#0d0d0d",
        color: "#f9eedb",
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
            SEO Técnico
          </span>
          <h1 className="fw-bold mt-3">La importancia del SEO técnico en sitios modernos</h1>
          <p style={{ color: "#cfcfcf" }}>
            Un sitio rápido, estructurado y accesible es el punto de partida para destacar en buscadores y convertir.
          </p>
          <div
            className="rounded-4 mb-4"
            style={{
              height: 240,
              background:
                "radial-gradient(1200px 240px at 50% 0%, rgba(242,154,65,.18), rgba(255,255,255,0) 60%)",
              border: "1px solid rgba(255,255,255,.06)",
            }}
          />
        </header>

        <Section>
          <h2 className="fw-semibold">Velocidad y performance</h2>
          <p>
            La experiencia del usuario es la base del SEO moderno. Medimos y optimizamos métricas 
            como <strong>LCP</strong>, <strong>FID</strong> y <strong>CLS</strong> para lograr puntajes de 
            Core Web Vitals por encima del 90%.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Estructura y accesibilidad</h2>
          <p>
            HTML semántico, etiquetas correctas, meta descripciones y títulos optimizados.  
            Un buen código facilita el rastreo e indexación de los bots de Google.
          </p>
        </Section>

        <div className="d-flex gap-2 mt-4">
          <a
            href="#contact"
            className="btn fw-bold"
            style={{
              background: "#f29a41",
              color: "#0d0d0d",
              borderRadius: 10,
            }}
          >
            Optimicemos tu sitio
          </a>
          <Link
            to="/insights"
            className="btn"
            style={{
              border: "1px solid rgba(255,255,255,.18)",
              color: "#f9eedb",
              borderRadius: 10,
            }}
          >
            ← Volver a Insights
          </Link>
        </div>
      </div>
    </div>
  );
}
