import React from "react";
import { MdDirectionsCar, MdHandshake, MdArrowForward } from "react-icons/md";

export default function CTASection() {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Renter CTA */}
          <div className="sr d1 relative overflow-hidden rounded-3xl bg-brand-500 px-10 py-12">
            <div className="relative z-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <MdDirectionsCar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white lg:text-3xl">
                Ready to Hit the Road?
              </h3>
              <p className="mt-3 text-white/80 max-w-sm leading-relaxed">
                Browse our fleet, pick your perfect ride, and book in minutes. No hidden fees, no hassle.
              </p>
              <a
                href="/auth/sign-in"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3 text-sm font-bold text-brand-500 hover:bg-brand-50 transition-colors"
              >
                Book a Vehicle <MdArrowForward className="h-4 w-4" />
              </a>
            </div>
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-12 -right-4 h-56 w-56 rounded-full bg-white/5" />
          </div>

          {/* Partner CTA */}
          <div className="sr d2 relative overflow-hidden rounded-3xl bg-slate-800 border border-slate-700 px-10 py-12">
            <div className="relative z-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <MdHandshake className="h-6 w-6 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-white lg:text-3xl">
                Have a Fleet to Share?
              </h3>
              <p className="mt-3 text-slate-400 max-w-sm leading-relaxed">
                Partner with JomDrivo and earn from your vehicles. We handle the bookings, you collect the revenue.
              </p>
              <a
                href="/auth/sign-in"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-7 py-3 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
              >
                Become a Partner <MdArrowForward className="h-4 w-4" />
              </a>
            </div>
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-12 -right-4 h-56 w-56 rounded-full bg-brand-500/5" />
          </div>

        </div>
      </div>
    </section>
  );
}
