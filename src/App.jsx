import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// 🔹 Componentes principales
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Process from "@/pages/Process";
import WhatsAppButton from "@/components/WhatssappButton";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/pages/WhyUs";
import Insights from "@/pages/Insights";
import ArticleReact from "@/pages/articles/ArticleReact";
import ArticleUX from "@/pages/articles/ArticleUX";
import ArticleBranding from "@/pages/articles/ArticleBranding";

// 💡 Nuevo: PWA install banner
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 🔄 Loader al cambiar de ruta
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // 🌀 Pantalla de carga (entre páginas)
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "#0d0d0d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#f9eedb",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          className="spinner-border text-warning"
          role="status"
          style={{
            width: "3rem",
            height: "3rem",
            marginBottom: "1rem",
            color: "#f29a41",
          }}
        />
        <span style={{ opacity: 0.8 }}>Cargando sección...</span>
      </div>
    );
  }

  return (
    <>
      {/* 🔝 Navbar global */}
      <Navbar />

      {/* 📱 Prompt de instalación PWA */}
      <PwaInstallPrompt />

      {/* 🌍 Rutas principales */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <WhyUs />
              <Services />
              <TechStack />
              <Process />
              <Testimonials />
              <Portfolio />
              <Contact />
            </>
          }
        />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/react" element={<ArticleReact />} />
        <Route path="/insights/ux" element={<ArticleUX />} />
        <Route path="/insights/branding" element={<ArticleBranding />} />
      </Routes>

      {/* 🔸 Componentes globales */}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
