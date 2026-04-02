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
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      <div className="container" style={{ maxWidth: 920 }}>
        <header className="mb-4">
          <Pill>Estrategia Digital</Pill>
          <h1 className="fw-bold mt-3">Cómo construir una estrategia digital efectiva en 2025</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Sin estrategia, el diseño es solo decoración. Descubrí cómo alineamos
            cada decisión visual con los objetivos de negocio de nuestros clientes.
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
            Definamos tu estrategia
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
