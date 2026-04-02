import React from "react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleBranding() {


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
        letterSpacing: ".4px",
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
      <SEO
        title="El futuro del branding digital"
        description="Descubre cómo el branding digital evoluciona hacia experiencias inmersivas y personalizadas. Identidad visual, motion branding y más."
        keywords="branding digital, identidad visual, motion branding, experiencia de marca, dtsanddog"
        type="article"
      />
      <div className="container" style={{ maxWidth: 920 }}>
        <header className="mb-4">
          <Pill>Branding Digital</Pill>
          <h1 className="fw-bold mt-3" style={{ lineHeight: 1.15 }}>
            El futuro del branding digital
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Las marcas del futuro no solo comunican, sino que construyen experiencias.
            La coherencia visual y emocional es la nueva moneda de confianza.
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
          <h2 className="fw-semibold">Identidad como experiencia</h2>
          <p>
            El branding digital ya no se trata solo de logotipos o colores. Se trata de cómo el usuario
            percibe cada interacción con tu marca: en redes, en tu web, en los emails o incluso en
            el tono de tus respuestas automáticas.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Tendencias clave</h2>
          <ul>
            <li><strong>Motion branding:</strong> las animaciones sutiles dan vida a la identidad visual.</li>
            <li><strong>Sonido e interacción:</strong> jingles, respuestas auditivas y UX sonora.</li>
            <li><strong>Personalización dinámica:</strong> contenido adaptado al contexto del usuario.</li>
            <li><strong>Minimalismo expresivo:</strong> menos es más, siempre que comunique intención.</li>
          </ul>
        </Section>

        <Section>
          <h2 className="fw-semibold">Cómo lo abordamos en DTS&DOG</h2>
          <p>
            Diseñamos sistemas de marca escalables. Desde moodboards interactivos en Figma hasta
            guidelines digitales que permiten a cada equipo mantener coherencia y adaptabilidad.
            Cada elección tiene propósito y métricas.
          </p>
        </Section>

        {/* CTA */}
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
            Evolucioná tu marca digital
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
