import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    servicio: "",
    presupuesto: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Cargar el script de reCAPTCHA automáticamente si no está
  useEffect(() => {
    if (!document.querySelector("#recaptcha-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // ✅ Validar reCAPTCHA
    const token = window.grecaptcha?.getResponse();
    if (!token) {
      setError("⚠️ Por favor, completa el reCAPTCHA antes de enviar.");
      setLoading(false);
      return;
    }

    try {
      const result = await emailjs.send(
        "service_pfjo63k", // tu Service ID
        "template_jvb72h8", // tu Template ID
        formData,
        "hpvZoNUAR-YfgsLEe" // tu Public Key de EmailJS
      );

      console.log("✅ Correo enviado:", result.status, result.text);
      setSuccess(true);
      setFormData({
        nombre: "",
        empresa: "",
        telefono: "",
        email: "",
        servicio: "",
        presupuesto: "",
        mensaje: "",
      });
      window.grecaptcha.reset(); // resetear el captcha
    } catch (err) {
      console.error("❌ Error enviando el correo:", err);
      setError("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="contacto"
      className="py-5 text-center"
      style={{
        background: "#0d0d0d",
        color: "#f9eedb",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h6
          className="text-uppercase mb-2"
          style={{ color: "#f29a41", letterSpacing: "2px" }}
        >
          Contacto
        </h6>
        <h2 className="fw-bold mb-4">Contanos sobre tu proyecto</h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "600px", textAlign: "left" }}
        >
          {["nombre", "empresa", "telefono", "email", "servicio", "presupuesto"].map(
            (field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label text-light">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field === "nombre" || field === "email"}
                  style={{
                    background: "#1a1a1a",
                    color: "#f9eedb",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>
            )
          )}

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label text-light">
              Mensaje
            </label>
            <textarea
              className="form-control"
              name="mensaje"
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              required
              style={{
                background: "#1a1a1a",
                color: "#f9eedb",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
          </div>

          {/* ✅ Google reCAPTCHA */}
          <div
            className="g-recaptcha mb-3"
            data-sitekey="6LcI5-4rAAAAACqxhv2ePvuSrCh7lED2uUI8JdFW"
          ></div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "#00FFAA" }}>✅ ¡Mensaje enviado correctamente!</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-dark w-100 fw-bold mt-3"
            style={{
              background: "#f29a41",
              border: "none",
              color: "#0d0d0d",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </motion.div>
    </motion.section>
  );
}
