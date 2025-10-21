import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo/DTSandDOG-Studio-logo-dark.png";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Escucha el evento que lanza el navegador cuando detecta la PWA instalable
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("📲 Resultado instalación:", outcome);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed-bottom d-flex justify-content-center"
      >
        <motion.div
          className="shadow-lg d-flex align-items-center justify-content-between p-3 rounded-4"
          style={{
            width: "90%",
            maxWidth: "430px",
            background: "rgba(13,13,13,0.95)",
            color: "#f9eedb",
            border: "1px solid rgba(242,154,65,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="d-flex align-items-center">
            <motion.img
              src={logo}
              alt="DTS&DOG Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "8px",
                objectFit: "contain",
                marginRight: "12px",
                filter: "brightness(0) invert(1)",
              }}
            />
            <div>
              <h6 className="fw-bold m-0" style={{ color: "#f29a41" }}>
                📱 Instalar DTS&DOG Studio
              </h6>
              <p
                className="mb-0"
                style={{ fontSize: "0.85rem", color: "#ddd", opacity: 0.85 }}
              >
                Accedé rápido desde tu pantalla de inicio.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 ms-3">
            <motion.button
              onClick={handleInstall}
              className="btn btn-sm fw-bold"
              whileHover={{ scale: 1.05 }}
              style={{
                background: "#f29a41",
                color: "#0d0d0d",
                border: "none",
                borderRadius: "8px",
                padding: "6px 12px",
              }}
            >
              Instalar
            </motion.button>
            <button
              onClick={() => setShowPrompt(false)}
              className="btn btn-sm text-light"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1.4rem",
                lineHeight: 1,
                color: "#aaa",
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
