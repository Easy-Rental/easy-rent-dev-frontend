import React from "react";
import { MdStar } from "react-icons/md";
import { testimonials } from "../data";

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="sr mb-14 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-500">Testimonials</p>
          <h2 className="text-4xl font-black text-slate-900 md:text-5xl">What Drivers Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name}
              className={`sr d${i + 1} rounded-2xl bg-white border border-slate-100 p-7 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300`}>
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <MdStar key={j} className="h-4 w-4 text-yellow-400"/>
                ))}
              </div>
              <p className="mb-6 text-sm text-slate-600 leading-relaxed line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white font-bold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
