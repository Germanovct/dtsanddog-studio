import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Process from "./pages/Process";
import WhatsAppButton from "./components/WhatssappButton";
import Footer from "./components/Footer";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
import WhyUs from "./pages/WhyUs";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhyUs />
      <Services />
      <TechStack />
      <Process />
      <Testimonials />
      <Portfolio />
      <Contact />
      <WhatsAppButton/>
      <Footer />
    </>
  );
}
