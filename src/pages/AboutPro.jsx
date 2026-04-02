import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCogs, FaAward, FaLightbulb } from "react-icons/fa";
import germanocampo from "../assets/germanocampo_optimized.JPG";
import franklin from "../assets/franklin.webp";
import SEO from "@/components/SEO";

export default function AboutPro() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="text-light"
      style={{
        backgroundColor: "#000",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.15 }}
    >
      <SEO
        title="Sobre Nosotros"
        description="Conoce a DTS&DOG Studio. Somos un equipo apasionado por el diseño y la tecnología, creando experiencias digitales únicas desde Buenos Aires."
        keywords="sobre nosotros, equipo, agencia digital, dtsanddog, historia"
      />
      {/* ================= HERO ================= */}
      <div
        className="position-relative"
        style={{
          height: "80vh",
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.8),
            rgba(0,0,0,0.9)
          ), url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          className="glow-overlay"
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            background: `
              radial-gradient(circle at 30% 50%, rgba(242,154,65,0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 40%, rgba(255,255,255,0.05) 0%, transparent 40%)
            `,
            animation: "moveGlow 15s ease-in-out infinite alternate",
            filter: "blur(120px)",
            zIndex: 0,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: "850px", padding: "0 20px", zIndex: 1 }}
        >
          <h1
            className="display-2 fw-black mb-4"
            style={{
              color: "#fff",
              letterSpacing: "-0.06em",
              textShadow: "0 0 30px rgba(242,154,65,0.2)",
            }}
          >
            Innovamos con <span className="text-gradient">Propósito.</span>
          </h1>
          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "1.25rem",
              lineHeight: 1.8,
              maxWidth: "700px",
              margin: "0 auto",
              fontWeight: "400"
            }}
          >
            En <strong style={{ color: "#f29a41" }}>DTS&DOG Studio</strong>{" "}
            combinamos ingeniería de alto rendimiento, diseño estratégico y visión de negocio para escalar marcas en la era digital.
          </p>
        </motion.div>
      </div>

      {/* ================= NARRATIVA DE MARCA ================= */}
      <div
        className="container text-center text-md-start py-5"
        style={{
          maxWidth: "900px",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 2,
        }}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
            textAlign: "justify",
          }}
        >
          <strong style={{ color: "#f29a41" }}>DTS&DOG Studio</strong> nació en Buenos Aires con una visión clara: elevar el estándar del desarrollo digital uniendo precisión técnica y diseño de vanguardia. Lo que comenzó con una notebook, mucha ambición y un perro curioso llamado Franklin 🐾, hoy es un estudio que diseña infraestructuras de crecimiento para empresas globales.
        </motion.p>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
            textAlign: "justify",
          }}
        >
          Creemos que el software no debe ser solo funcional, sino una ventaja competitiva. Cada línea de código y cada píxel que entregamos está orientado a maximizar la conversión, la velocidad y la escalabilidad. No solo construimos sitios; construimos motores de venta.
        </motion.p>
      </div>

      {/* ================= EQUIPO ================= */}
      <div className="container text-center py-5">
        <motion.h3
          variants={fadeUp}
          className="display-4 fw-black mb-5 pb-4"
          style={{ color: "#fff", letterSpacing: "-0.04em" }}
        >
          Nuestro <span className="text-gradient">Core.</span>
        </motion.h3>

        <div className="row g-5 justify-content-center">
          {[
            {
              name: "Germán Ocampo",
              role: "Founder & Lead Engineer",
              quote:
                "Construyendo el futuro digital con la misma pasión con la que nació este estudio.",
              img: germanocampo,
              highlight: true,
            },
            {
              name: "Franklin 🐾",
              role: "Chief Happiness Officer",
              quote:
                "Recordándonos que toda gran estrategia necesita equilibrio y carácter.",
              img: franklin,
            },
            {
              name: "Equipo Global",
              role: "Partners & Experts",
              quote:
                "Una red de especialistas alineados con nuestra visión de excelencia y resultados.",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="col-12 col-md-4"
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="p-4 h-100"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  boxShadow: p.highlight ? "0 10px 30px rgba(242,154,65,0.05)" : "none",
                  transition: "all 0.4s ease"
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="team-photo"
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginBottom: "20px",
                    transition: "all 0.5s ease",
                  }}
                />
                <h5 className="fw-black mb-1" style={{ color: "#f29a41", letterSpacing: "-0.02em" }}>
                  {p.name}
                </h5>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.9rem",
                    marginBottom: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}
                >
                  {p.role}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    lineHeight: "1.6"
                  }}
                >
                  “{p.quote}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes moveGlow {
          0% { transform: translate(-10%, -10%) scale(1); opacity: 0.8; }
          100% { transform: translate(10%, 10%) scale(1.2); opacity: 1; }
        }

        .team-photo {
          filter: grayscale(100%) brightness(0.8);
        }

        .team-photo:hover {
          filter: grayscale(0%) brightness(1);
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(242,154,65,0.4);
        }

        .founder-card {
          border: 1px solid rgba(242,154,65,0.3);
          box-shadow: 0 0 30px rgba(242,154,65,0.15);
        }

        .founder-photo {
          filter: grayscale(90%) brightness(0.9);
          transition: all 0.5s ease;
        }

        .founder-photo:hover {
          filter: grayscale(0%) brightness(1.05);
          box-shadow: 0 0 35px rgba(242,154,65,0.6);
          transform: scale(1.05);
        }
      `}</style>
    </motion.section>
  );
}
