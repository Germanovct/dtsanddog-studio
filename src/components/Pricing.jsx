import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaRocket, FaShoppingCart, FaCode, FaArrowRight } from "react-icons/fa";

const pricingPlans = [
    {
        name: "Landing Pro",
        tagline: "High-Ticket Conversion",
        price: "Consultar",
        duration: "Proyecto Único",
        icon: <FaRocket />,
        color: "#61dafb",
        popular: false,
        features: [
            "Arquitectura de Conversión",
            "Diseño Studio Grade (UX/UI)",
            "Optimización de Velocidad LCP",
            "Copywriting Estratégico",
            "SEO Técnico On-Page",
            "Integraciones de Leads",
        ],
        cta: "Solicitar Propuesta",
        ctaLink: "#contact",
    },
    {
        name: "E-commerce Pro",
        tagline: "Escalabilidad Digital",
        price: "Consultar",
        duration: "Proyecto Único",
        icon: <FaShoppingCart />,
        color: "#f29a41",
        popular: true,
        features: [
            "Checkout de Alta Velocidad",
            "Catálogo de Crecimiento",
            "Estrategia de Retención",
            "Pasarelas Enterprise",
            "Panel de Control Custom",
            "Soporte Post-Lanzamiento",
        ],
        cta: "Agendar Auditoría",
        ctaLink: "#contact",
    },
    {
        name: "Custom Studio",
        tagline: "Ingeniería de Software",
        price: "A Medida",
        duration: "Desarrollo Agile",
        icon: <FaCode />,
        color: "#9b59b6",
        popular: false,
        features: [
            "Software Personalizado",
            "Arquitecturas Escalables",
            "Consultoría de Negocios",
            "Testing QA Riguroso",
            "Infraestructura Cloud",
            "Documentación Técnica",
        ],
        cta: "Diseñar Proyecto",
        ctaLink: "#contact",
    },
];

const PricingCard = ({ plan, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="col-lg-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -15 }}
                style={{
                    background: isHovered
                        ? (plan.popular ? "rgba(242, 154, 65, 0.08)" : `${plan.color}15`)
                        : "rgba(255, 255, 255, 0.015)",
                    backdropFilter: "blur(25px)",
                    border: isHovered
                        ? `1px solid ${plan.color}`
                        : plan.popular
                            ? "1px solid var(--accent-orange)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "60px 45px",
                    borderRadius: "4px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isHovered
                        ? `0 30px 60px ${plan.color}25`
                        : "0 20px 40px rgba(0, 0, 0, 0.4)",
                    zIndex: isHovered ? 2 : 1
                }}
            >
                {/* 🏷️ Badge Popular integrada */}
                {plan.popular && (
                    <div
                        style={{
                            position: "absolute",
                            top: "30px",
                            left: "45px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{
                                width: "8px",
                                height: "8px",
                                background: "var(--accent-orange)",
                                borderRadius: "50%",
                                boxShadow: "0 0 12px var(--accent-orange)"
                            }}
                        />
                        <span style={{
                            color: "var(--accent-orange)",
                            fontSize: "0.75rem",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em"
                        }}>
                            RECOMENDADO
                        </span>
                    </div>
                )}

                {/* Icono con color condicional */}
                <div className="mb-4 pt-3" style={{
                    color: isHovered ? plan.color : (plan.popular ? "var(--accent-orange)" : "#fff"),
                    fontSize: "2.5rem",
                    transition: "all 0.4s ease",
                    filter: isHovered ? `drop-shadow(0 0 15px ${plan.color}60)` : "none"
                }}>
                    {plan.icon}
                </div>

                <h3 className="fw-black mb-1" style={{ fontSize: "2rem", letterSpacing: "-0.05em", color: "#fff" }}>
                    {plan.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "3.5rem", fontWeight: "500", letterSpacing: "0.02em" }}>
                    {plan.tagline}
                </p>

                <div className="mb-5">
                    <div className="display-3 fw-black text-white" style={{ lineHeight: 0.85 }}>{plan.price}</div>
                    <div className="mt-3" style={{ fontSize: "0.7rem", color: "#fff", opacity: 0.4, fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.25em" }}>
                        {plan.duration}
                    </div>
                </div>

                <ul className="list-unstyled flex-grow-1 mb-5">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="d-flex align-items-start gap-3 mb-3" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>
                            <FaCheck size={12} color={isHovered ? plan.color : "var(--accent-orange)"} style={{ marginTop: "7px", flexShrink: 0, transition: "color 0.4s" }} />
                            <span style={{ lineHeight: "1.5" }}>{feature}</span>
                        </li>
                    ))}
                </ul>

                <motion.a
                    href={plan.ctaLink}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{
                        height: "70px",
                        fontSize: "0.95rem",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.3em",
                        borderRadius: "4px",
                        textDecoration: "none",
                        transition: "all 0.4s ease",
                        // 🟠 Botón POPULAR: Naranja Sólido + Texto Negro Absoluto (Máximo Contraste)
                        background: plan.popular ? "#f29a41" : "transparent",
                        color: plan.popular ? "#000" : "#fff",
                        border: plan.popular ? "none" : `1px solid ${isHovered ? plan.color : 'rgba(255,255,255,0.2)'}`,
                        boxShadow: plan.popular ? "0 15px 30px rgba(242, 154, 65, 0.4)" : "none",
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <span style={{ position: "relative", zIndex: 2 }}>{plan.cta}</span>
                    <FaArrowRight size={14} style={{ position: "relative", zIndex: 2 }} />

                    {/* Efecto de brillo premium */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "60%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                            pointerEvents: "none",
                            zIndex: 1
                        }}
                    />
                </motion.a>
            </motion.div>
        </motion.div>
    );
};

export default function Pricing() {
    return (
        <section
            id="pricing"
            style={{
                background: "#000",
                color: "#fff",
                padding: "200px 0",
                position: "relative",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden"
            }}
        >
            {/* 🌌 Luces de ambiente sutiles */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100vw", height: "100vw", background: "radial-gradient(circle at center, rgba(242,154,65,0.02) 0%, transparent 60%)", pointerEvents: "none" }} />

            <div className="container position-relative" style={{ zIndex: 10 }}>
                {/* Header */}
                <div className="text-center mb-5 pb-5">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ borderBottom: "2px solid var(--accent-orange)", width: "60px", margin: "0 auto 30px" }}
                    />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="display-1 fw-black mb-4"
                        style={{ letterSpacing: "-0.07em", color: "#fff" }}
                    >
                        Ingeniería de <span className="text-gradient">Venta.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            fontSize: "1.2rem",
                            color: "rgba(255,255,255,0.4)",
                            lineHeight: "1.8",
                            fontWeight: "400"
                        }}
                    >
                        Soluciones digitales construidas para el crecimiento. Cada píxel está diseñado para convertir y escalar su visión corporativa.
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="row g-5 justify-content-center pt-4">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-5 pt-5"
                >
                    <div className="d-flex align-items-center justify-content-center gap-5 opacity-40">
                        <div style={{ width: "50px", height: "1px", background: "#fff" }} />
                        <span className="small text-uppercase tracking-[0.6em]" style={{ fontSize: "0.7rem", fontWeight: "800" }}>
                            Digital Studio Standard
                        </span>
                        <div style={{ width: "50px", height: "1px", background: "#fff" }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
