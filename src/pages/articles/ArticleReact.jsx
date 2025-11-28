import React from "react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleReact() {


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
        title="Por qué tu empresa necesita una web con React"
        description="Descubre cómo React mejora el rendimiento, la escalabilidad y la experiencia de usuario de tu sitio web. Desarrollo web moderno con DTS&DOG Studio."
        keywords="react, desarrollo web, rendimiento web, escalabilidad, spa, seo"
        type="article"
      />
      <div className="container" style={{ maxWidth: 920 }}>
        {/* encabezado */}
        <header className="mb-4">
          <Pill>Desarrollo Web</Pill>
          <h1 className="fw-bold mt-3" style={{ lineHeight: 1.15 }}>
            Por qué tu empresa necesita una web con React
          </h1>
          <p className="text-muted" style={{ color: "#cfcfcf" }}>
            React es el estándar de facto para construir interfaces rápidas,
            escalables y mantenibles. En este artículo explicamos por qué
            conviene para tu negocio y cómo lo implementamos en DTS&DOG Studio.
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

        {/* contenido */}
        <Section>
          <h2 className="fw-semibold">Velocidad que impacta conversiones</h2>
          <p className="mb-2">
            Sitios lentos generan tasas de rebote altas y menos ventas. React
            usa un{" "}
            <em>Virtual DOM</em> que minimiza actualizaciones y permite
            interfaces que responden en milisegundos. Integrado con bundlers
            modernos (Vite) y técnicas como code-splitting, logramos{" "}
            <strong>Time to Interactive</strong> y{" "}
            <strong>Core Web Vitals</strong> que mejoran tu SEO y tus
            conversiones.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Escalabilidad para crecer sin fricción</h2>
          <p className="mb-2">
            React se organiza en componentes reutilizables y testeables. Esa
            modularidad permite iterar rápido, agregar nuevas secciones
            (ecommerce, dashboards, landings) y mantener un código limpio con
            estándares de la industria (Hooks, Context, Zustand).
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">SEO y render híbrido</h2>
          <p className="mb-2">
            ¿SPA y SEO? Sí. Usamos <strong>render híbrido</strong>: pre-render
            de páginas críticas y actualización en cliente. Y para proyectos que
            requieren indexación agresiva, combinamos React con{" "}
            <strong>Next.js</strong> para <em>SSR/SSG</em>, sitemaps automáticos
            y metadatos por ruta.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Experiencias modernas</h2>
          <ul className="mb-2">
            <li>Animaciones fluidas con Framer Motion.</li>
            <li>Accesibilidad (WAI-ARIA) y diseño responsive.</li>
            <li>Integración con APIs/Backends (Express, AWS, Firebase).</li>
            <li>Internacionalización, dark mode y PWA offline.</li>
          </ul>
        </Section>

        <Section>
          <h2 className="fw-semibold">Mini caso: sitio corporativo ágil</h2>
          <p className="mb-2">
            Migramos un sitio legacy a React + Vite. Resultado:{" "}
            <strong>−48% de tiempo de carga</strong>,{" "}
            <strong>+22% de conversión</strong> en formularios y un equipo que
            ahora itera nuevas páginas en horas en lugar de días.
          </p>
        </Section>

        {/* CTA */}
        <div className="d-flex gap-2 mt-4">
          <a
            href="#contact"
            className="btn btn-dark fw-bold"
            style={{
              background: "#f29a41",
              color: "#0d0d0d",
              border: "none",
              borderRadius: 10,
            }}
          >
            Modernizá tu web con React
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
