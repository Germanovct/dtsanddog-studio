import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function Contact() {
  const captchaRef = useRef(null);
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

  // 🧠 Cargar captcha solo una vez
  useEffect(() => {
    const checkRecaptcha = setInterval(() => {
      if (window.grecaptcha && captchaRef.current && !recaptchaReady) {
        clearInterval(checkRecaptcha);
        window.grecaptcha.ready(() => {
          window.grecaptcha.render(captchaRef.current, {
            sitekey:
              window.location.hostname === "localhost"
                ? "6LfNxxxxLOCALxxxxxx" // 🔹 tu clave local
                : "6LcI5-4rAAAAACqxhv2ePvuSrCh7lED2uUI8JdFW", // 🔹 tu clave producción
          });
          setRecaptchaReady(true);
        });
      }
    }, 500);
  }, [recaptchaReady]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!recaptchaReady) {
      setError("El reCAPTCHA aún no está listo. Esperá unos segundos ⏳");
      return;
    }

    const token = window.grecaptcha.getResponse();
    if (!token) {
      setError("Por favor, completá el reCAPTCHA antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        "service_pfjo63k",
        "template_jvb72h8",
        formData,
        "hpvZoNUAR-YfgsLEe"
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
    <motion.section id="contact" className="py-5" style={{ background: "#f9eedb" }}>
      <div className="container py-4">
        <h2 className="text-center fw-bold mb-4">🚀 Contanos más sobre tu proyecto</h2>
        <p className="text-center mb-5 text-muted">
          Completá el formulario y te responderemos a la brevedad con una propuesta personalizada.
        </p>

        <div className="row g-4 align-items-start">
          <div className="col-md-5">
            <h5 className="fw-bold">1️⃣ Envíanos un mensaje</h5>
            <p className="text-muted">Completá el formulario con tus datos y mensaje.</p>
            <h5 className="fw-bold mt-4">2️⃣ Nos ponemos en contacto</h5>
            <p className="text-muted">Te contactamos para ajustar detalles y objetivos.</p>
            <h5 className="fw-bold mt-4">3️⃣ Empezamos a trabajar</h5>
            <p className="text-muted">Creamos la web que tu marca necesita 🚀</p>
          </div>

          <div className="col-md-7">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-4 shadow p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="row g-3">
                {["nombre", "empresa", "telefono", "email", "servicio", "presupuesto"].map(
                  (field, i) => (
                    <div className="col-md-6" key={i}>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={
                          field === "nombre"
                            ? "Nombre y Apellido *"
                            : field === "email"
                            ? "Email *"
                            : field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        className="form-control"
                        value={formData[field]}
                        onChange={handleChange}
                        required={["nombre", "email"].includes(field)}
                      />
                    </div>
                  )
                )}

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

                {/* ✅ reCAPTCHA renderizado manual */}
                <div ref={captchaRef} className="mb-3 d-flex justify-content-center"></div>

                {error && <p className="text-danger text-center small">{error}</p>}
                {success && <p className="text-success text-center small">✅ ¡Mensaje enviado correctamente!</p>}

                <div className="col-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-dark w-100 py-2"
                  >
                    {loading ? "Enviando..." : "Enviar mensaje ✉️"}
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
