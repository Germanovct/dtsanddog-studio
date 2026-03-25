import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const SERVICES = [
  "Landing Page Premium",
  "E-commerce / Tienda Online",
  "App Web Custom",
  "Rediseño Web",
  "Consultoría Técnica",
  "Otro",
];

const BUDGETS = [
  "Menos de $500 USD",
  "$500 - $2,000 USD",
  "$2,000 - $5,000 USD",
  "Más de $5,000 USD",
  "No lo sé todavía",
];

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

  useEffect(() => {
    const checkRecaptcha = setInterval(() => {
      if (window.grecaptcha && captchaRef.current && !recaptchaReady) {
        clearInterval(checkRecaptcha);
        window.grecaptcha.ready(() => {
          window.grecaptcha.render(captchaRef.current, {
            sitekey:
              window.location.hostname === "localhost"
                ? "6LfNxxxxLOCALxxxxxx"
                : "6LcI5-4rAAAAACqxhv2ePvuSrCh7lED2uUI8JdFW",
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
      setFormData({ nombre: "", empresa: "", telefono: "", email: "", servicio: "", presupuesto: "", mensaje: "" });
      window.grecaptcha.reset();
    } catch (err) {
      console.error("❌ Error enviando el correo:", err);
      setError("Hubo un problema al enviar el mensaje. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    color: "#f9eedb",
    padding: "12px 16px",
    width: "100%",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    color: "#b8b1a4",
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <motion.section
      id="contact"
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
        color: "#f9eedb",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow decorativo */}
      <div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(242,154,65,0.08), transparent 70%)",
        filter: "blur(80px)", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "-5%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(97,218,251,0.06), transparent 70%)",
        filter: "blur(80px)", zIndex: 0,
      }} />

      <div className="container py-4 position-relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-5">
          <motion.h6
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ color: "#f29a41", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}
          >
            💬 Hablemos
          </motion.h6>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="fw-bold mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            Contanos sobre tu proyecto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: "#d8d0c2", maxWidth: "600px", margin: "0 auto" }}
          >
            Completá el formulario y te respondemos en menos de 24 horas con una propuesta personalizada.
          </motion.p>
        </div>

        <div className="row g-5 justify-content-center">
          {/* Info lateral */}
          <div className="col-12 col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              {[
                { icon: "📩", title: "Email directo", value: "contacto@dtsanddog-studio.com.ar" },
                { icon: "💬", title: "WhatsApp", value: "Consultá por WhatsApp" },
                { icon: "⏱️", title: "Tiempo de respuesta", value: "Menos de 24 horas hábiles" },
              ].map((item, i) => (
                <div key={i} className="d-flex align-items-start gap-3 mb-4">
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                    background: "rgba(242,154,65,0.1)", border: "1px solid rgba(242,154,65,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ color: "#b8b1a4", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#f9eedb", fontSize: "0.9rem", marginTop: "2px" }}>{item.value}</div>
                  </div>
                </div>
              ))}

              {/* Pasos */}
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px", padding: "20px", marginTop: "16px"
              }}>
                <div style={{ color: "#f29a41", fontWeight: 700, fontSize: "0.85rem", marginBottom: "14px", textTransform: "uppercase" }}>
                  ¿Cómo funciona?
                </div>
                {["Nos enviás el formulario", "Analizamos tu proyecto", "Te enviamos una propuesta"].map((step, i) => (
                  <div key={i} className="d-flex align-items-center gap-3 mb-3">
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, #f29a41, #e8813a)",
                      color: "#0a0a0a", display: "flex", alignItems: "center",
                      justifyContent: "center", fontWeight: 700, fontSize: "0.8rem",
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ color: "#d8d0c2", fontSize: "0.9rem" }}>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Formulario */}
          <div className="col-12 col-lg-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)",
              }}
            >
              <div className="row g-3">
                {/* Nombre */}
                <div className="col-md-6">
                  <label style={labelStyle}>Nombre *</label>
                  <input type="text" name="nombre" placeholder="Tu nombre completo" style={inputStyle}
                    value={formData.nombre} onChange={handleChange} required
                    onFocus={e => e.target.style.borderColor = "#f29a41"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                </div>
                {/* Empresa */}
                <div className="col-md-6">
                  <label style={labelStyle}>Empresa / Marca</label>
                  <input type="text" name="empresa" placeholder="Nombre de tu empresa" style={inputStyle}
                    value={formData.empresa} onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = "#f29a41"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                </div>
                {/* Email */}
                <div className="col-md-6">
                  <label style={labelStyle}>Email *</label>
                  <input type="email" name="email" placeholder="tu@email.com" style={inputStyle}
                    value={formData.email} onChange={handleChange} required
                    onFocus={e => e.target.style.borderColor = "#f29a41"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                </div>
                {/* Teléfono */}
                <div className="col-md-6">
                  <label style={labelStyle}>Teléfono / WhatsApp</label>
                  <input type="text" name="telefono" placeholder="+54 11 0000-0000" style={inputStyle}
                    value={formData.telefono} onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = "#f29a41"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                </div>
                {/* Servicio */}
                <div className="col-md-6">
                  <label style={labelStyle}>¿Qué necesitás?</label>
                  <select name="servicio" style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.servicio} onChange={handleChange}
                  >
                    <option value="" style={{ background: "#1a1a1a" }}>Seleccioná un servicio</option>
                    {SERVICES.map((s, i) => <option key={i} value={s} style={{ background: "#1a1a1a" }}>{s}</option>)}
                  </select>
                </div>
                {/* Presupuesto */}
                <div className="col-md-6">
                  <label style={labelStyle}>Presupuesto estimado</label>
                  <select name="presupuesto" style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.presupuesto} onChange={handleChange}
                  >
                    <option value="" style={{ background: "#1a1a1a" }}>¿Cuánto pensás invertir?</option>
                    {BUDGETS.map((b, i) => <option key={i} value={b} style={{ background: "#1a1a1a" }}>{b}</option>)}
                  </select>
                </div>
                {/* Mensaje */}
                <div className="col-12">
                  <label style={labelStyle}>Contanos tu proyecto *</label>
                  <textarea name="mensaje" placeholder="Describí qué querés lograr con tu nuevo sitio web..." rows="4"
                    style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
                    value={formData.mensaje} onChange={handleChange} required
                    onFocus={e => e.target.style.borderColor = "#f29a41"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="col-12 d-flex justify-content-center">
                  <div ref={captchaRef} />
                </div>

                {/* Feedback */}
                {error && (
                  <div className="col-12">
                    <div style={{ background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: "10px", padding: "10px 16px", color: "#e74c3c", fontSize: "0.9rem" }}>
                      ⚠️ {error}
                    </div>
                  </div>
                )}
                {success && (
                  <div className="col-12">
                    <div style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)", borderRadius: "10px", padding: "10px 16px", color: "#2ecc71", fontSize: "0.9rem" }}>
                      ✅ ¡Mensaje enviado! Te respondemos en menos de 24 horas.
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="col-12">
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(242,154,65,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%", padding: "14px", borderRadius: "12px", border: "none",
                      background: loading ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #f29a41, #e8813a)",
                      color: loading ? "#888" : "#0a0a0a", fontWeight: 700, fontSize: "1rem",
                      cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? "Enviando..." : "Enviar consulta →"}
                  </motion.button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
