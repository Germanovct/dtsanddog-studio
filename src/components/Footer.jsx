import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-4" style={{ backgroundColor: "#222", color: "#f9eedb" }}>
      <p className="mb-2">
        Hecho con 🐾 por <strong>DTS&DOG Studio</strong> — Buenos Aires, Argentina 🇦🇷
      </p>
      <div>
        <a href="https://www.instagram.com" className="text-light mx-2">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://www.linkedin.com" className="text-light mx-2">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="mailto:contacto@dtsanddog.com" className="text-light mx-2">
          <i className="bi bi-envelope"></i>
        </a>
      </div>
    </footer>
  );
}
