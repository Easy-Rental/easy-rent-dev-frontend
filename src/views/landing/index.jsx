import React, { useEffect } from "react";
import HeroSection     from "./components/HeroSection";
import BrandsSection   from "./components/BrandsSection";
import ServicesSection from "./components/ServicesSection";
import HowItWorks      from "./components/HowItWorks";
import WhyChooseUs     from "./components/WhyChooseUs";
import Testimonials    from "./components/Testimonials";
import Footer          from "./components/Footer";

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

        .sr{opacity:0;transform:translateY(30px);transition:opacity .65s ease,transform .65s ease}
        .sr-show{opacity:1;transform:translateY(0)}
        .sr.d1.sr-show{transition-delay:.05s}
        .sr.d2.sr-show{transition-delay:.15s}
        .sr.d3.sr-show{transition-delay:.25s}
        .sr.d4.sr-show{transition-delay:.35s}

        .step-line{background:linear-gradient(90deg,#2F6BFF,#4D82FF)}
      `}</style>

      <div className="min-h-screen bg-white font-montserrat text-gray-900 overflow-x-hidden">
        <HeroSection />
        <BrandsSection />
        <ServicesSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
