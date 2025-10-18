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
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // 🧠 Esperar a que el script de reCAPTCHA cargue
  useEffect(() => {
    const checkRecaptcha = setInterval(() => {
      if (window.grecaptcha) {
        clearInterval(checkRecaptcha);
        window.grecaptcha.ready(() => {
          setRecaptchaReady(true);
        });
      }
    }, 500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!recaptchaReady) {
      setError("reCAPTCHA aún no está listo. Espera un momento ⏳");
      return;
    }

    const token = window.grecaptcha.getResponse();
    if (!token) {
      setError("Por favor, completa el reCAPTCHA antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        "service_pfjo63k", // 🔹 Service ID
        "template_jvb72h8", // 🔹 Template ID
        formData,
        "hpvZoNUAR-YfgsLEe" // 🔹 Public key
      );

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
      window.grecaptcha.reset();
    } catch (err) {
      console.error("❌ Error enviando el correo:", err);
      setError("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-5"
      style={{ background: "#f9eedb" }}
    >
      <div className="container py-4">
        <h2 className="text-center fw-bold mb-4">
          🚀 Contanos más sobre tu proyecto
        </h2>
        <p className="text-center mb-5 text-muted">
          Completá el formulario y te responderemos a la brevedad con una
          propuesta personalizada.
        </p>

        <div className="row g-4 align-items-start">
          {/* Columna izquierda */}
          <div className="col-md-5">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <h5 className="fw-bold">1️⃣ Envíanos un mensaje</h5>
                <p className="text-muted">
                  Completá el formulario y te responderemos lo antes posible con
                  una propuesta personalizada.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="fw-bold">2️⃣ Nos ponemos en contacto</h5>
                <p className="text-muted">
                  Escuchamos atentamente tus necesidades y te proponemos la
                  mejor opción para tu empresa.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="fw-bold">3️⃣ Empezamos a trabajar</h5>
                <p className="text-muted">
                  Nos ponemos manos a la obra creando la nueva web que tu marca
                  necesita.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Columna derecha */}
          <div className="col-md-7">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-4 shadow p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre y Apellido *"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    className="form-control"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Empresa"
                    className="form-control"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <select
                    name="servicio"
                    className="form-select"
                    value={formData.servicio}
                    onChange={handleChange}
                  >
                    <option value="">¿Qué sitio necesitás?</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Tienda Online">Tienda Online</option>
                    <option value="Web Corporativa">Web Corporativa</option>
                    <option value="Desarrollo a medida">
                      Desarrollo a medida
                    </option>
                    <option value="Branding & Diseño">Branding & Diseño</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <select
                    name="presupuesto"
                    className="form-select"
                    value={formData.presupuesto}
                    onChange={handleChange}
                  >
                    <option value="">¿Cuál es tu presupuesto (ARS)?</option>
                    <option value="300K a 500K">$300K a $500K</option>
                    <option value="500K a 800K">$500K a $800K</option>
                    <option value="800K a 1M">$800K a $1M</option>
                    <option value="1M a 2M">$1M a $2M</option>
                    <option value="+2M">Más de $2M</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    name="mensaje"
                    placeholder="Escribí tu mensaje..."
                    className="form-control"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* 🧩 reCAPTCHA */}
                <div
                  className="g-recaptcha mb-3"
                  data-sitekey="6LcI5-4rAAAAACqxhv2ePvuSrCh7lED2uUI8JdFW"
                ></div>

                {error && (
                  <p className="text-danger small mt-2 text-center">{error}</p>
                )}
                {success && (
                  <p className="text-success small mt-2 text-center">
                    ✅ ¡Mensaje enviado correctamente!
                  </p>
                )}

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-dark w-100 py-2"
                  >
                    {loading
                      ? "Enviando..."
                      : "Enviar mensaje ✉️"}
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
