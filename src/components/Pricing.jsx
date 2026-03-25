import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaRocket, FaShoppingCart, FaCode } from "react-icons/fa";

const pricingPlans = [
    {
        name: "Landing Pro",
        tagline: "Perfecto para emprendedores",
        price: "A medida",
        currency: "",
        duration: "Landing Page",
        icon: <FaRocket />,
        color: "#61dafb",
        gradient: "linear-gradient(135deg, #61dafb 0%, #4fa8c5 100%)",
        popular: false,
        deliveryTime: "7 días hábiles",
        features: [
            "1 página responsive premium",
            "Formulario de contacto funcional",
            "SEO on-page optimizado",
            "Integración con Google Analytics",
            "Hosting gratuito por 1 año",
            "2 rondas de ajustes incluidas",
            "Diseño personalizado",
            "Optimización de velocidad",
        ],
        cta: "Comprar Ahora",
        ctaLink: "#contact",
    },
    {
        name: "E-commerce Starter",
        tagline: "Ideal para vender online",
        price: "Consultar",
        currency: "",
        duration: "Tiendas Online",
        icon: <FaShoppingCart />,
        color: "#f29a41",
        gradient: "linear-gradient(135deg, #f29a41 0%, #e8813a 100%)",
        popular: true,
        deliveryTime: "21 días hábiles",
        features: [
            "Hasta 50 productos",
            "Carrito de compras dinámico",
            "Checkout optimizado",
            "Pasarela de pagos (Stripe/MP)",
            "Panel de administración",
            "Sistema de inventario",
            "Diseño responsive custom",
            "SEO para e-commerce",
            "Integración con envíos",
            "3 rondas de ajustes",
        ],
        cta: "Agendar Reunión",
        ctaLink: "#contact",
    },
    {
        name: "App Web Custom",
        tagline: "Soluciones a medida",
        price: "Custom",
        currency: "",
        duration: "Desarrollo a medida",
        icon: <FaCode />,
        color: "#9b59b6",
        gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
        popular: false,
        deliveryTime: "Variable (30-90 días)",
        features: [
            "Consultoría estratégica inicial",
            "Desarrollo frontend + backend",
            "Base de datos escalable",
            "APIs REST personalizadas",
            "Autenticación de usuarios",
            "Panel de administración",
            "Testing completo (QA)",
            "Deploy en servidor propio",
            "Documentación técnica",
            "Soporte post-lanzamiento",
        ],
        cta: "Solicitar Propuesta",
        ctaLink: "#contact",
    },
];

export default function Pricing() {
    return (
        <section
            id="pricing"
            className="py-5"
            style={{
                background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)",
                color: "#f9eedb",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Efectos de fondo */}
            <div
                style={{
                    position: "absolute",
                    top: "-20%",
                    left: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(97,218,251,0.08), transparent 70%)",
                    filter: "blur(100px)",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    right: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(242,154,65,0.08), transparent 70%)",
                    filter: "blur(100px)",
                    zIndex: 0,
                }}
            />

            <div className="container position-relative" style={{ zIndex: 1 }}>
                {/* Header */}
                <div className="text-center mb-5">
                    <motion.h6
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-uppercase mb-2"
                        style={{ color: "#f29a41", fontWeight: 600, letterSpacing: "2px" }}
                    >
                        💰 Planes y Precios
                    </motion.h6>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="fw-bold mb-3"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                    >
                        Paquetes diseñados para tu éxito
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            maxWidth: "700px",
                            margin: "0 auto",
                            fontSize: "1.05rem",
                            color: "#d8d0c2",
                        }}
                    >
                        Precios transparentes, proyectos de calidad. Sin sorpresas, sin letra chica.
                        <br />
                        <strong style={{ color: "#f29a41" }}>Todo incluido, listo para crecer.</strong>
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="row g-4 justify-content-center">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="col-12 col-md-6 col-lg-4"
                        >
                            <motion.div
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="h-100 p-4 d-flex flex-column"
                                style={{
                                    background: plan.popular
                                        ? `linear-gradient(135deg, ${plan.color}15, rgba(255,255,255,0.05))`
                                        : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                                    borderRadius: "24px",
                                    border: plan.popular
                                        ? `2px solid ${plan.color}`
                                        : "1px solid rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                    boxShadow: plan.popular
                                        ? `0 12px 40px ${plan.color}40`
                                        : "0 8px 30px rgba(0,0,0,0.3)",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Badge Popular */}
                                {plan.popular && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "20px",
                                            right: "-30px",
                                            background: plan.color,
                                            color: "#0d0d0d",
                                            padding: "4px 40px",
                                            fontSize: "0.75rem",
                                            fontWeight: 700,
                                            transform: "rotate(45deg)",
                                            boxShadow: `0 4px 15px ${plan.color}60`,
                                        }}
                                    >
                                        MÁS POPULAR
                                    </div>
                                )}

                                {/* Icon */}
                                <div
                                    className="d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "50%",
                                        background: plan.gradient,
                                        color: "#0d0d0d",
                                        fontSize: "2rem",
                                        boxShadow: `0 8px 20px ${plan.color}50`,
                                    }}
                                >
                                    {plan.icon}
                                </div>

                                {/* Plan Name */}
                                <h3 className="fw-bold mb-1" style={{ color: plan.color }}>
                                    {plan.name}
                                </h3>
                                <p className="text-secondary mb-3" style={{ fontSize: "0.9rem" }}>
                                    {plan.tagline}
                                </p>

                                {/* Price */}
                                <div className="mb-3">
                                    <div className="d-flex align-items-baseline">
                                        <span
                                            className="fw-bold"
                                            style={{
                                                fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
                                                color: "#f9eedb",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {plan.price}
                                        </span>
                                        <span className="ms-2 text-secondary">{plan.currency}</span>
                                    </div>
                                    <small style={{ color: "#d8d0c2" }}>{plan.duration}</small>
                                </div>

                                {/* Delivery Time */}
                                <div
                                    className="mb-4 px-3 py-2"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <small style={{ color: "#61dafb", fontWeight: 600 }}>
                                        ⏱️ Entrega: {plan.deliveryTime}
                                    </small>
                                </div>

                                {/* Features */}
                                <ul className="list-unstyled mb-4 flex-grow-1">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="d-flex align-items-start mb-2"
                                            style={{ fontSize: "0.9rem", color: "#d8d0c2" }}
                                        >
                                            <FaCheck
                                                style={{
                                                    color: plan.color,
                                                    marginRight: "10px",
                                                    marginTop: "4px",
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <motion.a
                                    href={plan.ctaLink}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: `0 8px 25px ${plan.color}70`,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn fw-semibold py-3 w-100"
                                    style={{
                                        background: plan.gradient,
                                        color: "#0d0d0d",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {plan.cta}
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-5 pt-4"
                >
                    <div
                        className="d-inline-flex align-items-center gap-3 px-4 py-3"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "50px",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <span style={{ fontSize: "1.3rem" }}>💡</span>
                        <div className="text-start">
                            <div className="fw-semibold" style={{ color: "#f9eedb" }}>
                                ¿Necesitás algo diferente?
                            </div>
                            <small style={{ color: "#d8d0c2" }}>
                                Contáctanos para un presupuesto personalizado
                            </small>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
