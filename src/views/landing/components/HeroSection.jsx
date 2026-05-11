import React, { useState } from "react";
import { MdSearch, MdOutlineDirectionsCar, MdOutlineVerified, MdOutlineFlashOn } from "react-icons/md";
import Navbar from "./Navbar";
import InputField from "components/form/InputField";
import Button from "components/ui/buttons/Button";
import hondaVideo from "assets/videos/honda/honda-city.mp4";

const FEATURES = [
  {
    Icon: MdOutlineDirectionsCar,
    title: "Premium Selection",
    desc: "From economy to luxury — 500+ vehicles across Sedan, SUV, MPV, and more.",
  },
  {
    Icon: MdOutlineVerified,
    title: "Transparent Pricing",
    desc: "No hidden fees, no surprises. The price you see is exactly what you pay.",
  },
  {
    Icon: MdOutlineFlashOn,
    title: "Easy Booking",
    desc: "Book in under 3 minutes. Pick-up and drop-off at locations across Malaysia.",
  },
];

export default function HeroSection() {
  const [formData, setFormData] = useState({ location: "", pickupDate: "", returnDate: "" });
  const [errors,   setErrors]   = useState({});

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev)   => ({ ...prev, [field]: "" }));
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex flex-col" style={{ minHeight: "100vh" }}>

        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={hondaVideo}
        />

        {/* Gradient overlay — dark at top for navbar, lighter mid, dark at bottom for booking panel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.70) 75%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-1 flex-col">

          {/* Fixed navbar — rendered here, positions itself to viewport top */}
          <Navbar />

          {/* Hero content — pt-20 clears the fixed navbar (~72 px) */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-52 pt-20 text-center">

            {/* Badge — fades in first */}
            <div
              className="mb-7 inline-flex animate-fade-in items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 opacity-0 backdrop-blur-sm"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Malaysia's Premier Car Rental
              </span>
            </div>

            {/* Headline — slides up after badge */}
            <h1
              className="font-playfair max-w-4xl animate-fade-up text-5xl font-bold leading-tight text-white opacity-0 md:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.3s" }}
            >
              Find the Perfect Car
              <br />
              <span className="text-brand-400">for Every Journey</span>
            </h1>

            {/* Subtext */}
            <p
              className="mt-6 max-w-lg animate-fade-up text-base leading-relaxed text-white/60 opacity-0"
              style={{ animationDelay: "0.5s" }}
            >
              Transparent pricing, 500+ vehicles, and seamless booking —
              everything you need for the perfect drive across Malaysia.
            </p>

          </div>
        </div>

        {/* ── Booking panel — floats at the bottom of the hero ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 animate-scale-in px-4 pb-10 opacity-0 sm:px-6 lg:px-8"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-black/20">
              {/* items-end aligns the button with the input row; pb-4 matches InputField's mb-4 */}
              <div className="grid items-end grid-cols-1 gap-x-5 md:grid-cols-2 lg:grid-cols-4">
                <InputField
                  label="Pick-up Location"
                  field="location"
                  placeholder="City or Airport"
                  required={false}
                  formData={formData}
                  errors={errors}
                  updateFormData={updateFormData}
                />
                <InputField
                  label="Pick-up Date"
                  field="pickupDate"
                  type="datetime-local"
                  required={false}
                  formData={formData}
                  errors={errors}
                  updateFormData={updateFormData}
                />
                <InputField
                  label="Return Date"
                  field="returnDate"
                  type="datetime-local"
                  required={false}
                  formData={formData}
                  errors={errors}
                  updateFormData={updateFormData}
                />
                <div className="pb-4">
                  <Button
                    text="Search Cars"
                    icon={<MdSearch className="h-4 w-4" />}
                    className="w-full px-6 py-3 shadow-sm shadow-brand-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Features strip — white, brand accents ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl">
          {/* gap-px + parent bg-slate-100 = 1 px dividers between columns */}
          <div className="grid grid-cols-1 gap-px bg-slate-100 md:grid-cols-3">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="sr group bg-white px-10 py-12 transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-brand-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
