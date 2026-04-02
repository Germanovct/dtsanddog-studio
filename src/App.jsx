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
const ArticleIA      = lazy(() => import("@/pages/articles/ArticleIA"));
const ArticleSEO     = lazy(() => import("@/pages/articles/ArticleSEO"));
const ArticleEstrategia = lazy(() => import("@/pages/articles/ArticleEstrategia"));
const NotFound       = lazy(() => import("@/pages/NotFound"));

// ⏳ Fallback minimal mientras carga la página secundaria
const PageLoader = () => (
  <div style={{ height: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: "40px", height: "40px", border: "3px solid rgba(242,154,65,0.3)", borderTopColor: "#f29a41", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

import { useEffect } from "react";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // 📊 Registrar visita en el backend interno
    const trackVisit = async () => {
      try {
        await fetch("http://localhost:8000/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: location.pathname + location.search,
            referrer: document.referrer || "Directo"
          }),
        });
      } catch (e) {
        // Silencioso para no afectar experiencia de usuario
      }
    };
    trackVisit();
  }, [location]);

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
                description="Empresa de desarrollo y estrategia digital de alto rendimiento. En DTS&DOG combinamos ingeniería de software, diseño de impacto y sistemas inteligentes para escalar su negocio."
                keywords="desarrollo web, estrategia digital, software enterprise, diseño de impacto, prospección inteligente"
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
        
        {/* 🕵️ SEO Silencioso (Rutas activas pero sin enlaces en el menú) */}
        <Route path="/insights" element={<Suspense fallback={<PageLoader />}><Insights /></Suspense>} />
        <Route path="/insights/react" element={<Suspense fallback={<PageLoader />}><ArticleReact /></Suspense>} />
        <Route path="/insights/ux" element={<Suspense fallback={<PageLoader />}><ArticleUX /></Suspense>} />
        <Route path="/insights/branding" element={<Suspense fallback={<PageLoader />}><ArticleBranding /></Suspense>} />
        <Route path="/insights/ia" element={<Suspense fallback={<PageLoader />}><ArticleIA /></Suspense>} />
        <Route path="/insights/seo" element={<Suspense fallback={<PageLoader />}><ArticleSEO /></Suspense>} />
        <Route path="/insights/estrategia" element={<Suspense fallback={<PageLoader />}><ArticleEstrategia /></Suspense>} />


        {/* 🚨 Ruta 404 */}
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>

      {/* 🔸 Componentes globales persistentes */}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
