import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// 🧩 Componentes críticos (carga inmediata - se ven en el 1er scroll)
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
import Pricing from "@/components/Pricing";
import WhyUs from "@/pages/WhyUs";
import SEO from "@/components/SEO";

// 🚀 Lazy Loading: Páginas secundarias (se cargan solo cuando el usuario las visita)
const AboutPro       = lazy(() => import("@/pages/AboutPro"));
const Insights       = lazy(() => import("@/pages/Insights"));
const ArticleReact   = lazy(() => import("@/pages/articles/ArticleReact"));
const ArticleUX      = lazy(() => import("@/pages/articles/ArticleUX"));
const ArticleBranding = lazy(() => import("@/pages/articles/ArticleBranding"));
const NotFound       = lazy(() => import("@/pages/NotFound"));

// ⏳ Fallback minimal mientras carga la página secundaria
const PageLoader = () => (
  <div style={{ height: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: "40px", height: "40px", border: "3px solid rgba(242,154,65,0.3)", borderTopColor: "#f29a41", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);


export default function App() {
  return (
    <>
      {/* 🔝 Navbar fijo */}
      <Navbar />

      {/* 💡 Prompt de instalación PWA (Oculto a petición) */}
      {/* <PwaInstallPrompt /> */}

      {/* 🌍 Rutas principales */}
      <Routes>
        {/* 🏠 Página principal */}
        <Route
          path="/"
          element={
            <>
              <SEO
                title="Inicio"
                description="DTS&DOG Studio combina diseño, desarrollo y tecnología para crear experiencias digitales con alma. Sitios web, branding, UX/UI y desarrollo a medida."
                keywords="diseño web, desarrollo web, branding, ux ui, agencia digital"
              />
              <Hero />
              <About />
              <WhyUs />
              <Services />
              <Pricing />
              <TechStack />
              <Process />
              <Testimonials />
              <Portfolio />
              <Contact />
            </>
          }
        />

        {/* 🧭 Página extendida “AboutPro” */}
        <Route path="/aboutpro" element={<Suspense fallback={<PageLoader />}><AboutPro /></Suspense>} />
        {/* ✅ corregido: antes /about, ahora /aboutpro */}

        {/* 📰 Sección de artículos / blog */}
        <Route path="/insights" element={<Suspense fallback={<PageLoader />}><Insights /></Suspense>} />
        <Route path="/insights/react" element={<Suspense fallback={<PageLoader />}><ArticleReact /></Suspense>} />
        <Route path="/insights/ux" element={<Suspense fallback={<PageLoader />}><ArticleUX /></Suspense>} />
        <Route path="/insights/branding" element={<Suspense fallback={<PageLoader />}><ArticleBranding /></Suspense>} />

        {/* 🚨 Ruta 404 */}
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>

      {/* 🔸 Componentes globales persistentes */}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
