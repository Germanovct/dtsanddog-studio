import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // 🔹 Detecta scroll para activar fondo suave
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Scroll suave o redirección entre rutas
  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse?.classList.contains("show")) {
      new window.bootstrap.Collapse(navbarCollapse).toggle();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top py-3 ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
      style={{
        transition: "all 0.4s ease-in-out",
      }}
    >
      <div className="container">
        {/* 🔸 Marca */}
        <Link
          className="navbar-brand fw-bold text-light"
          to="/"
          style={{
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontFamily: "Inter, sans-serif",
            textShadow: "0 2px 4px rgba(0,0,0,0.4)",
          }}
        >
          DTS&DOG Studio
        </Link>

        {/* 🔹 Botón mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            {/* ✅ BOTÓN INTELIGENTE: en Home hace scroll, en otras páginas navega */}
            <li className="nav-item">
              {location.pathname === "/" ? (
                <button
                  className="btn btn-link nav-link text-light"
                  onClick={() => handleScroll("about")}
                >
                  Nosotros
                </button>
              ) : (
                <Link
                  to="/aboutpro"
                  className={`nav-link text-light ${
                    location.pathname === "/aboutpro" ? "active" : ""
                  }`}
                >
                  Nosotros
                </Link>
              )}
            </li>

            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-light"
                onClick={() => handleScroll("services")}
              >
                Servicios
              </button>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-light"
                onClick={() => handleScroll("tech")}
              >
                Tecnologías
              </button>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link text-light ${
                  location.pathname.startsWith("/insights") ? "active" : ""
                }`}
                to="/insights"
              >
                Insights
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-light"
                onClick={() => handleScroll("contacto")}
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔧 Inline CSS */}
      <style>{`
        .navbar-transparent {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        .navbar-scrolled {
          background-color: rgba(13, 13, 13, 0.85) !important;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .nav-link {
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .nav-link:hover {
          color: #f29a41 !important;
          transform: translateY(-1px);
        }
        .nav-link.active {
          color: #f29a41 !important;
        }
      `}</style>
    </nav>
  );
}
