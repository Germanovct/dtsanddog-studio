import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// 🧩 Componentes principales
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/pages/About";
import AboutPro from "@/pages/AboutPro";
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
import PwaInstallPrompt from "@/components/PwaInstallPrompt"; // 💡 Banner instalación PWA
import SEO from "@/components/SEO";

export default function App() {
  return (
    <>
      {/* 🔝 Navbar fijo */}
      <Navbar />

      {/* 💡 Prompt de instalación PWA */}
      <PwaInstallPrompt />

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
              <TechStack />
              <Process />
              <Testimonials />
              <Portfolio />
              <Contact />
            </>
          }
        />

        {/* 🧭 Página extendida “AboutPro” */}
        <Route path="/aboutpro" element={<AboutPro />} />
        {/* ✅ corregido: antes /about, ahora /aboutpro */}

        {/* 📰 Sección de artículos / blog */}
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/react" element={<ArticleReact />} />
        <Route path="/insights/ux" element={<ArticleUX />} />
        <Route path="/insights/branding" element={<ArticleBranding />} />

        {/* 🚨 Ruta 404 opcional */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* 🔸 Componentes globales persistentes */}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
