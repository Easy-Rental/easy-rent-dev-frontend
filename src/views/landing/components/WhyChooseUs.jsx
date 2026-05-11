import React from "react";
import { MdDirectionsCar, MdCheckCircle, MdArrowRightAlt, MdStar } from "react-icons/md";
import { whyUs } from "../data";

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center">
        <div className="sr">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-500">Why Choose Us</p>
          <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl leading-tight">
            The Smarter Way<br/>to Rent a Car
          </h2>
          <p className="mb-8 text-gray-500 leading-relaxed">
            We're not just a car rental service — we're your driving partner. Built for
            Malaysians who value convenience, transparency, and quality above all else.
          </p>
          <ul className="space-y-3">
            {whyUs.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                <MdCheckCircle className="h-5 w-5 shrink-0 text-brand-500"/>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="sr relative flex items-center justify-center h-80">
          <div className="absolute top-0 right-4 w-52 rounded-2xl bg-gray-900 p-5 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <p className="text-xs text-gray-400 mb-1">Total Bookings</p>
            <p className="text-3xl font-black text-white">10,482</p>
            <p className="text-xs text-brand-400 mt-1 flex items-center gap-1">
              <MdArrowRightAlt className="h-4 w-4"/> +12% this month
            </p>
          </div>
          <div className="absolute bottom-0 left-4 w-52 rounded-2xl bg-brand-500 p-5 shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
            <p className="text-xs text-brand-100 mb-1">Customer Rating</p>
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => <MdStar key={i} className="h-5 w-5 text-yellow-300"/>)}
            </div>
            <p className="text-white font-bold text-sm">4.9 / 5.0 — 2,400 reviews</p>
          </div>
          <div className="w-44 h-44 rounded-full border-4 border-brand-100 flex items-center justify-center bg-white shadow-lg">
            <MdDirectionsCar className="h-20 w-20 text-brand-400"/>
          </div>
        </div>
      </div>
    </section>
  );
}
