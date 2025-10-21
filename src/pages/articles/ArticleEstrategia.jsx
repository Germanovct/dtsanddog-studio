import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleEstrategia() {
  useEffect(() => {
    document.title =
      "Cómo construir una estrategia digital efectiva en 2025 | DTS&DOG Studio";
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

  const Pill = ({ children }) => (
    <span
      className="badge"
      style={{
        background: "rgba(242,154,65,.15)",
        color: "#f29a41",
        border: "1px solid rgba(242,154,65,.35)",
        padding: "8px 12px",
      }}
    >
      {children}
    </span>
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
          <Pill>Estrategia Digital</Pill>
          <h1 className="fw-bold mt-3">Cómo construir una estrategia digital efectiva en 2025</h1>
          <p style={{ color: "#cfcfcf" }}>
            El éxito digital no es cuestión de suerte. Es planificación, ejecución y medición continua.
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
          <h2 className="fw-semibold">Del insight a la acción</h2>
          <p>
            Toda estrategia parte de entender al público: datos, comportamiento, emociones y contexto.
            Reunimos esas variables en mapas de experiencia que guían decisiones creativas y técnicas.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Métricas que importan</h2>
          <ul>
            <li>Visibilidad de marca y crecimiento orgánico.</li>
            <li>Conversión en embudos digitales.</li>
            <li>Retención y recurrencia de usuarios.</li>
            <li>Engagement en contenido y comunidad.</li>
          </ul>
        </Section>

        <Section>
          <h2 className="fw-semibold">Nuestra metodología</h2>
          <p>
            Combinamos <strong>design thinking</strong>, <strong>growth marketing</strong> y 
            <strong> data analytics</strong>. Cada etapa tiene un propósito: diseñar, testear, optimizar y escalar.
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
            Creá tu estrategia con nosotros
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
