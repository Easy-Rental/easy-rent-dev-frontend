import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdDirectionsCar, MdCalendarToday, MdArrowForward } from "react-icons/md";

const steps = [
  { num: "01", icon: <MdLocationOn className="h-6 w-6"/>,    title: "Choose Location", desc: "Select your preferred pickup location from 50+ outlets nationwide."       },
  { num: "02", icon: <MdDirectionsCar className="h-6 w-6"/>, title: "Pick Your Car",   desc: "Browse our fleet and choose the vehicle that fits your journey perfectly." },
  { num: "03", icon: <MdCalendarToday className="h-6 w-6"/>, title: "Book & Confirm",  desc: "Set your dates, confirm your booking, and we'll handle the rest."          },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="sr mb-14 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-500">Simple Process</p>
          <h2 className="text-4xl font-black text-slate-900 md:text-5xl">Ready in 3 Easy Steps</h2>
        </div>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute top-10 left-[17%] right-[17%] hidden h-0.5 step-line md:block opacity-30"/>
          {steps.map((s, i) => (
            <div key={s.num} className={`sr d${i + 1} flex flex-col items-center text-center`}>
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-brand-100 shadow-lg shadow-brand-100/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white">
                  {s.icon}
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                  {s.num}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="sr mt-12 text-center">
          <Link to="/admin/default"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-sm font-bold text-white hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25">
            Start Booking <MdArrowForward className="h-4 w-4"/>
          </Link>
        </div>
      </div>
    </section>
  );
}
