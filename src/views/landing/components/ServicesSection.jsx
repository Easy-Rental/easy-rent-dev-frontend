import React from "react";
import { MdDirectionsCar, MdSpeed, MdVerifiedUser, MdSupportAgent } from "react-icons/md";

const services = [
  { icon: <MdDirectionsCar className="h-7 w-7"/>, title: "Wide Fleet Selection",   desc: "500+ vehicles across all categories — sedans, SUVs, luxury, vans and trucks."      },
  { icon: <MdSpeed className="h-7 w-7"/>,          title: "Instant Booking",        desc: "Book your car in under 2 minutes. No paperwork, no waiting — just drive."           },
  { icon: <MdVerifiedUser className="h-7 w-7"/>,   title: "Fully Insured Rides",    desc: "Every rental includes comprehensive insurance so you drive with total peace of mind." },
  { icon: <MdSupportAgent className="h-7 w-7"/>,   title: "24/7 Support",           desc: "Our team is always on standby to assist you anytime, anywhere on the road."         },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="sr mb-14 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-500">Why JomDrivo</p>
          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            Everything You Need,<br/>Nothing You Don't
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div key={s.title}
              className={`sr d${i + 1} group rounded-2xl border border-gray-100 bg-white p-7 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-2 transition-all duration-300`}>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {s.icon}
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
