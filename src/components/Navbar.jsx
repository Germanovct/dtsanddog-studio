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
            letterSpacing: "2px",
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem"
          }}
        >
          DTS&DOG
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
          <ul className="navbar-nav ms-auto text-center" style={{ gap: "10px" }}>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-light px-3"
                onClick={() => handleScroll("services")}
                style={{ fontSize: "0.9rem", fontWeight: "400", opacity: 0.8 }}
              >
                Servicios
              </button>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-light px-3"
                onClick={() => handleScroll("tech")}
                style={{ fontSize: "0.9rem", fontWeight: "400", opacity: 0.8 }}
              >
                Tecnología
              </button>
            </li>


            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-light px-3"
                onClick={() => handleScroll("contact")}
                style={{ fontSize: "0.9rem", fontWeight: "400", opacity: 0.8 }}
              >
                Contacto
              </button>
            </li>

            <li className="nav-item ms-lg-3">
              <button
                className="btn-premium btn-primary btn-shine py-2 px-4"
                onClick={() => handleScroll("contact")}
                style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: "600"
                }}
              >
                Auditoría Gratis
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔧 Inline CSS */}
      <style>{`
        .navbar-transparent {
          background-color: transparent !important;
        }
        .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.9) !important;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .nav-link {
          transition: all 0.3s ease;
          border: none !important;
          text-decoration: none !important;
        }
        .nav-link:hover {
          color: #fff !important;
          opacity: 1 !important;
        }
      `}</style>
    </nav>
  );
}
