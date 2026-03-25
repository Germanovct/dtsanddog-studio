import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCogs, FaAward, FaLightbulb } from "react-icons/fa";
import germanocampo from "../assets/germanocampo_optimized.JPG"; // ✅ Comprimida de 3.3MB → 55KB
import franklin from "../assets/franklin.webp"; // 🟠 Franklin real
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
        backgroundColor: "#0a0a0a",
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
            rgba(0,0,0,0.7),
            rgba(0,0,0,0.85)
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
              radial-gradient(circle at 30% 50%, rgba(242,154,65,0.25) 0%, transparent 50%),
              radial-gradient(circle at 70% 40%, rgba(255,255,255,0.08) 0%, transparent 40%)
            `,
            animation: "moveGlow 12s ease-in-out infinite alternate",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: "800px", padding: "0 20px", zIndex: 1 }}
        >
          <h1
            className="fw-bold mb-3"
            style={{
              color: "#f29a41",
              fontSize: "3rem",
              textShadow: "0 0 25px rgba(242,154,65,0.5)",
            }}
          >
            Innovamos con propósito
          </h1>
          <p
            style={{
              color: "#d8d0c2",
              fontSize: "1.2rem",
              lineHeight: 1.6,
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            En <strong style={{ color: "#f29a41" }}>DTS&DOG Studio</strong>{" "}
            combinamos arte, desarrollo y tecnología para impulsar el crecimiento
            de empresas, startups y marcas que buscan destacar en la era digital.
          </p>
        </motion.div>
      </div>

      {/* ================= NARRATIVA DE MARCA ================= */}
      <div
        className="container text-center text-md-start py-5"
        style={{
          maxWidth: "900px",
          color: "#d8d0c2",
          lineHeight: 1.8,
        }}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "1.1rem",
            marginBottom: "1rem",
            textAlign: "justify",
          }}
        >
          <strong style={{ color: "#f29a41" }}>DTS&DOG Studio</strong> nació en
          Buenos Aires como un sueño: unir el arte, la tecnología y la emoción
          humana en un solo espacio creativo. Todo comenzó con una notebook, un
          perro curioso llamado Franklin 🐾 y una visión clara:{" "}
          <em>
            “Diseñar experiencias digitales que hagan sentir, que conecten con
            las personas y que trasciendan la pantalla.”
          </em>
        </motion.p>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "1rem",
            marginBottom: "1rem",
            textAlign: "justify",
          }}
        >
          Lo que empezó como una idea personal se transformó en una empresa con
          propósito. Un espacio donde el diseño, el código y la creatividad se
          encuentran para construir marcas, productos y experiencias que respiran
          autenticidad. Creemos que cada proyecto tiene un alma, y nuestro trabajo
          es darle forma con precisión, emoción y coherencia.
        </motion.p>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontSize: "1rem",
            color: "#b8b1a4",
            textAlign: "justify",
          }}
        >
          Hoy, <strong>DTS&DOG</strong> es mucho más que un estudio. Es una forma
          de entender el mundo digital: con humanidad, pasión y visión. Desde
          Buenos Aires al mundo 🌎, seguimos creando, soñando y transformando
          ideas en realidades digitales.
        </motion.p>
      </div>

      {/* ================= EQUIPO ================= */}
      <div className="container text-center py-5">
        <motion.h3
          variants={fadeUp}
          className="fw-bold mb-5"
          style={{ color: "#f29a41" }}
        >
          Nuestro Equipo
        </motion.h3>

        <div className="row g-4 justify-content-center">
          {[
            {
              name: "Germán Ocampo",
              role: "Founder & CEO / Lead Developer",
              quote:
                "Dirigiendo cada proyecto con la misma pasión con la que nació este estudio.",
              img: germanocampo,
              highlight: true,
            },
            {
              name: "Franklin 🐾",
              role: "Chief Happiness Officer",
              quote:
                "Recordándonos que toda gran idea necesita un poco de juego y cariño.",
              img: franklin,
            },
            {
              name: "Equipo Global",
              role: "Design & Dev Partners",
              quote:
                "Una red internacional de talentos que comparten nuestra visión: crear con alma y precisión.",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="col-6 col-md-4"
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className={`p-3 rounded-4 h-100 ${p.highlight ? "founder-card" : ""
                  }`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 0 15px rgba(242,154,65,0.05)",
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className={`team-photo ${p.highlight ? "founder-photo" : ""}`}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    marginBottom: "15px",
                    transition: "all 0.5s ease",
                  }}
                />
                <h6 className="fw-bold mb-1" style={{ color: "#f29a41" }}>
                  {p.name}
                </h6>
                <p
                  style={{
                    color: "#c6bfb1",
                    fontSize: "0.9rem",
                    marginBottom: "10px",
                  }}
                >
                  {p.role}
                </p>
                <p
                  style={{
                    color: "#a39c8c",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  “{p.quote}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔧 Animaciones CSS */}
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
