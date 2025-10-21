import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 🚀 Render principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// 🧠 Registro del Service Worker
if ("serviceWorker" in navigator) {
  const registerSW = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("✅ SW registrado:", registration);

      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.onstatechange = () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("⚡ Nueva versión disponible, aplicando...");
            newWorker.postMessage({ action: "skipWaiting" });
          }
        };
      };

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      if (registration.navigationPreload) {
        try {
          await registration.navigationPreload.enable();
          console.log("🚀 Navigation Preload habilitado");
        } catch (err) {
          console.warn("⚠️ Navigation Preload no disponible:", err.message);
        }
      }
    } catch (err) {
      console.error("❌ Error registrando Service Worker:", err);
    }
  };

  window.addEventListener("load", registerSW);
}
