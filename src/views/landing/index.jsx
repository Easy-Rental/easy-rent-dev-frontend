import React, { useEffect } from "react";
import HeroSection             from "./components/HeroSection";
import StatsSection            from "./components/StatsSection";
import FeaturedVehiclesSection from "./components/FeaturedVehiclesSection";
import CategoriesSection       from "./components/CategoriesSection";
import BrandsSection           from "./components/BrandsSection";
import ModelsSection           from "./components/ModelsSection";
import HowItWorks              from "./components/HowItWorks";
import ServicesSection         from "./components/ServicesSection";
import WhyChooseUs             from "./components/WhyChooseUs";
import Testimonials            from "./components/Testimonials";
import CTASection              from "./components/CTASection";
import Footer                  from "./components/Footer";

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("sr-show"); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function LandingPage() {
  useScrollReveal();

  return (
    <>
      <style>{`
        @keyframes navIn  { from{transform:translateY(-100%);opacity:0} to{transform:translateY(0);opacity:1} }
        .nav-in { animation: navIn .55s cubic-bezier(.4,0,.2,1) forwards; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        .h1{opacity:0;animation:fadeUp .75s ease .1s forwards}
        .h2{opacity:0;animation:fadeUp .75s ease .3s forwards}
        .h3{opacity:0;animation:fadeUp .75s ease .5s forwards}
        .h4{opacity:0;animation:fadeUp .75s ease .7s forwards}
        .h5{opacity:0;animation:fadeUp .75s ease .9s forwards}

        .sr{opacity:0;transform:translateY(28px);transition:opacity .6s cubic-bezier(0.4,0,0.2,1),transform .6s cubic-bezier(0.4,0,0.2,1)}
        .sr-show{opacity:1;transform:translateY(0)}
        .sr.d1.sr-show{transition-delay:.08s}
        .sr.d2.sr-show{transition-delay:.18s}
        .sr.d3.sr-show{transition-delay:.28s}
        .sr.d4.sr-show{transition-delay:.38s}

        .step-line{background:linear-gradient(90deg,#FF8533,#FF9B4D)}
      `}</style>

      <div className="min-h-screen bg-white font-montserrat text-slate-900 overflow-x-hidden">
        <HeroSection />
        <StatsSection />
        <FeaturedVehiclesSection />
        <CategoriesSection />
        <BrandsSection />
        <ModelsSection />
        <HowItWorks />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
