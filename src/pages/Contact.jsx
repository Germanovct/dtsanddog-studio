import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, Send, CheckCircle } from "lucide-react";

const SERVICES = [
  "Rendimiento & Core Web Vitals",
  "Sistemas de Prospección Inteligente",
  "Desarrollo Web & Software",
  "Consultoría de Estrategia Digital",
  "Otro",
];

const BUDGETS = [
  "Inversión de Escalamiento",
  "Inversión Enterprise",
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
      setError("El reCAPTCHA aún no está listo. Esperá unos segundos.");
      return;
    }

    const token = window.grecaptcha.getResponse();
    if (!token) {
      setError("Por favor, completá el reCAPTCHA antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      // 1. Enviar notificación al admin via EmailJS (Backup)
      await emailjs.send(
        "service_pfjo63k",
        "template_jvb72h8",
        formData,
        "hpvZoNUAR-YfgsLEe"
      );

      // 2. Enviar datos al motor de ventas (CRM + Gmail API) via local FastAPI
      try {
        await fetch("http://localhost:8000/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (apiErr) {
        console.warn("⚠️ API de ventas no disponible (local), prosiguiendo solo con EmailJS.");
      }

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
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "4px",
    color: "#fff",
    padding: "14px 16px",
    width: "100%",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#000",
        color: "#fff",
        padding: "120px 0",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="container">
        <div className="row g-5">
          {/* Side Info */}
          <div className="col-lg-5">
            <motion.h6
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ color: "var(--accent-orange)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "1.5rem" }}
            >
              Consultoría & Estrategia
            </motion.h6>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="display-4 fw-bold mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Iniciemos una Conversación.
            </motion.h2>
            <p className="lead mb-5" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
              Analizamos su infraestructura actual y diseñamos una hoja de ruta orientada a resultados medibles.
            </p>

            <div className="d-flex flex-column gap-4 mb-5">
              {[
                { icon: <Mail size={20} />, title: "Email Directo", value: "contacto@dtsanddog-studio.com.ar" },
                { icon: <MessageSquare size={20} />, title: "WhatsApp Business", value: "Consultar disponibilidad" },
                { icon: <Clock size={20} />, title: "SLA de Respuesta", value: "Menos de 24 horas hábiles" },
              ].map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-4">
                  <div 
                    style={{ 
                      width: "50px", 
                      height: "50px", 
                      background: "rgba(255,255,255,0.03)", 
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-orange)"
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>{item.title}</div>
                    <div style={{ fontWeight: "600", fontSize: "1rem" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Steps Minimalist */}
            <div style={{ padding: "30px", background: "rgba(242,154,65,0.02)", border: "1px solid rgba(242,154,65,0.05)", borderRadius: "4px" }}>
              <h6 style={{ fontSize: "0.8rem", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", color: "var(--accent-orange)" }}>Metodología de Inicio</h6>
              {["Briefing de Negocio", "Análisis de Factibilidad", "Propuesta Arquitectónica"].map((step, i) => (
                <div key={i} className="d-flex align-items-center gap-3 mb-3">
                  <CheckCircle size={14} color="var(--accent-orange)" />
                  <span style={{ fontSize: "0.95rem", opacity: 0.8 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "40px",
                borderRadius: "4px"
              }}
            >
              <div className="row g-4">
                <div className="col-md-6">
                  <label style={labelStyle}>Nombre & Apellido *</label>
                  <input 
                    type="text" name="nombre" placeholder="Ej: Juan Pérez" style={inputStyle}
                    value={formData.nombre} onChange={handleChange} required
                  />
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Empresa / Organización</label>
                  <input 
                    type="text" name="empresa" placeholder="Nombre de su negocio" style={inputStyle}
                    value={formData.empresa} onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Correo Corporativo *</label>
                  <input 
                    type="email" name="email" placeholder="email@empresa.com" style={inputStyle}
                    value={formData.email} onChange={handleChange} required
                  />
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Teléfono de Contacto</label>
                  <input 
                    type="text" name="telefono" placeholder="+54 ..." style={inputStyle}
                    value={formData.telefono} onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Interés Principal</label>
                  <select name="servicio" style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.servicio} onChange={handleChange}
                  >
                    <option value="" style={{ background: "#000" }}>Seleccione una opción</option>
                    {SERVICES.map((s, i) => <option key={i} value={s} style={{ background: "#000" }}>{s}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Rango de Inversión</label>
                  <select name="presupuesto" style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.presupuesto} onChange={handleChange}
                  >
                    <option value="" style={{ background: "#000" }}>Seleccione un rango</option>
                    {BUDGETS.map((b, i) => <option key={i} value={b} style={{ background: "#000" }}>{b}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label style={labelStyle}>Breve descripción del proyecto *</label>
                  <textarea 
                    name="mensaje" placeholder="¿Qué objetivos busca alcanzar?" rows="4"
                    style={{ ...inputStyle, resize: "none" }}
                    value={formData.mensaje} onChange={handleChange} required
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="col-12">
                   <div ref={captchaRef} style={{ transform: "scale(0.9)", transformOrigin: "0 0" }} />
                </div>

                {/* Feedback */}
                {error && (
                  <div className="col-12">
                    <div style={{ color: "#ff4d4d", fontSize: "0.85rem", padding: "10px", background: "rgba(255,77,77,0.05)", borderLeft: "2px solid #ff4d4d" }}>
                      {error}
                    </div>
                  </div>
                )}
                {success && (
                  <div className="col-12">
                    <div style={{ color: "#00e676", fontSize: "0.85rem", padding: "10px", background: "rgba(0,230,118,0.05)", borderLeft: "2px solid #00e676" }}>
                      ✅ Su consulta ha sido recibida. Nos contactaremos a la brevedad.
                    </div>
                  </div>
                )}

                <div className="col-12 pt-2">
                  <button
                    type="submit" disabled={loading}
                    className="btn-premium btn-primary btn-shine w-100"
                    style={{ height: "55px", fontSize: "1rem" }}
                  >
                    {loading ? "Procesando..." : "Solicitar Auditoría Estratégica"}
                    {!loading && <Send size={16} />}
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
