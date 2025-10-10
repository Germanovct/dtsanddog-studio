import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5491133888802?text=¡Hola!%20Quiero%20más%20info%20sobre%20sus%20servicios%20web"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "22px",
        right: "22px",
        backgroundColor: "#25D366", // color oficial
        borderRadius: "50%",
        width: "68px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        zIndex: 9999,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 211, 102, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
      }}
    >
      <FaWhatsapp
        size={38}
        color="#ffffff" // color blanco original del ícono
        style={{
          filter: "drop-shadow(0 0 3px rgba(0,0,0,0.2))",
        }}
      />
    </a>
  );
}
