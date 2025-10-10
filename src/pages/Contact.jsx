import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    empresa: "",
    email: "",
    servicio: "",
    presupuesto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola! 👋 Soy ${formData.nombre} (${formData.empresa}).%0A%0A📞 Teléfono: ${formData.telefono}%0A📧 Email: ${formData.email}%0A🛠 Servicio: ${formData.servicio}%0A💰 Presupuesto: ${formData.presupuesto}%0A💬 Mensaje: ${formData.mensaje}`;
    const url = `https://wa.me/541133888802?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="py-5" style={{ background: "#f9eedb" }}>
      <div className="container py-4">
        <h2 className="text-center fw-bold mb-4">
          🚀 Contanos más sobre tu proyecto
        </h2>
        <p className="text-center mb-5 text-muted">
          Completá el formulario y te responderemos a la brevedad con una
          propuesta personalizada.
        </p>

        <div className="row g-4 align-items-start">
          {/* Columna izquierda - pasos */}
          <div className="col-md-5">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <h5 className="fw-bold">1️⃣ Envíanos un mensaje</h5>
                <p className="text-muted">
                  Completá el formulario y te responderemos lo antes posible
                  con una propuesta personalizada.
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

          {/* Columna derecha - formulario */}
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
                  ></textarea>
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-dark w-100 py-2">
                    Enviar mensaje ✉️
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
