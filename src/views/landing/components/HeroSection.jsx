import React from "react";
import { MdPlayArrow } from "react-icons/md";
import Navbar from "./Navbar";
import hondaVideo from "assets/videos/honda/honda-city.mp4";

export default function HeroSection() {
  return (
    <div className="overflow-hidden relative">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={hondaVideo}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <div className="mx-auto max-w-7xl min-h-[460px] flex items-start px-10 pt-10 pb-16">

          {/* Left — text */}
          <div className="max-w-lg">
            <h1 className="h1 text-7xl md:text-8xl font-bold leading-none tracking-tight text-white uppercase">
              JOM, LET'S
            </h1>
            <h2 className="h2 text-7xl md:text-8xl font-black leading-none tracking-tight text-white uppercase mb-6">
              DRIVE.
            </h2>

            {/* Gradient divider */}
            <div className="h3 h-0.5 w-56 mb-6"
              style={{ background: "linear-gradient(to right, #2F6BFF, transparent)" }}/>

            <p className="h4 text-sm text-gray-300 leading-relaxed mb-8 max-w-xs">
              Discover Malaysia's top car rental experience — quick booking,
              500+ vehicles, and support around the clock.
            </p>

            {/* Button with circle icon */}
            <a href="#fleet"
              className="h5 inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 pl-1.5 pr-6 py-1.5 text-sm font-bold text-white hover:bg-white/20 transition-colors">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 shrink-0">
                <MdPlayArrow className="h-5 w-5 text-white"/>
              </span>
              GET STARTED
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
