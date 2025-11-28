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
        background: "#0d0d0d",
        color: "#f9eedb",
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
          <p style={{ color: "#cfcfcf" }}>
            Las marcas del futuro no solo comunican, sino que construyen experiencias.
            La coherencia visual y emocional es la nueva moneda de confianza.
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
            className="btn fw-bold"
            style={{
              background: "#f29a41",
              color: "#0d0d0d",
              border: "none",
              borderRadius: 10,
            }}
          >
            Evolucioná tu marca digital
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
