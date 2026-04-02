import React from "react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleUX() {


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
      UX/UI Design
    </span>
  );

  const Li = ({ title, children }) => (
    <li className="mb-2">
      <strong>{title}:</strong> {children}
    </li>
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
        title="Tendencias de diseño UX/UI en 2025"
        description="Descubre las tendencias de diseño UX/UI que definirán el 2025: minimalismo, dark mode, micro-interacciones y accesibilidad."
        keywords="diseño ux ui, tendencias 2025, diseño web, accesibilidad, figma"
        type="article"
      />
      <div className="container" style={{ maxWidth: 920 }}>
        {/* encabezado */}
        <header className="mb-4">
          <Pill>UX/UI Design</Pill>
          <h1 className="fw-bold mt-3" style={{ lineHeight: 1.15 }}>
            Tendencias de diseño UX/UI en 2025
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Estas son las claves que estamos aplicando para aumentar claridad,
            confianza y conversión sin perder identidad de marca.
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

        {/* contenido */}
        <Section>
          <h2 className="fw-semibold">Lo simple vende</h2>
          <p className="mb-2">
            La saturación visual quedó atrás. En 2025 prevalece un minimalismo
            cálido: tipografías legibles, composición aireada y contrastes
            claros. El objetivo es guiar la mirada, no distraerla.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Tendencias que funcionan</h2>
          <ul>
            <Li title="Dark UI consciente">
              No es solo “dark mode”. Paletas profundas con acentos cálidos
              mejoran foco y fatiga visual, y elevan la percepción premium.
            </Li>
            <Li title="Micro-interacciones">
              Animaciones sutiles de feedback (hover, carga, estados vacíos)
              aumentan claridad y reducen fricción.
            </Li>
            <Li title="Accesibilidad real">
              Contrastes AA/AAA, tamaño de toque, navegación por teclado y
              semántica correcta. Accesible = usable para todos.
            </Li>
            <Li title="Contenido primero">
              Jerarquía tipográfica y mensajes concretos. El diseño debe
              abrazar la historia de la marca y convertir.
            </Li>
            <Li title="Componentes y diseño de sistemas">
              Librerías coherentes para escalar sin romper identidad. Más
              velocidad, menos re-trabajo.
            </Li>
          </ul>
        </Section>

        <Section>
          <h2 className="fw-semibold">Cómo lo aplicamos en DTS&DOG</h2>
          <p className="mb-2">
            Empezamos con workshops cortos y mapas de objetivos. Prototipamos en{" "}
            <strong>Figma</strong>, testeamos flujos clave y recién después
            llevamos a código con React/Next y tu stack. Cada decisión está
            conectada con métricas de negocio.
          </p>
        </Section>

        <Section>
          <h2 className="fw-semibold">Resultado: claridad que convierte</h2>
          <p className="mb-2">
            Sitios más claros, carga veloz, accesibilidad que se siente y un
            lenguaje visual propio. Eso construye confianza y venta.
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
            Diseñemos tu próxima experiencia
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
