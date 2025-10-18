import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ─────────────────────────────────────────────────────────────
// 🧠 Registro del Service Worker con auto-update
// ─────────────────────────────────────────────────────────────
if ("serviceWorker" in navigator) {
  const registerSW = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("✅ SW registrado:", registration);

      // Si aparece un nuevo SW, pedimos que tome control y recargamos
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.onstatechange = () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("⚡ Nueva versión disponible. Actualizando...");
            newWorker.postMessage({ action: "skipWaiting" });
          }
        };
      };

      // Cuando el controlador cambia (SW nuevo activo), recargamos una sola vez
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    } catch (err) {
      console.error("❌ Error registrando SW:", err);
    }
  };

  window.addEventListener("load", registerSW);
}
