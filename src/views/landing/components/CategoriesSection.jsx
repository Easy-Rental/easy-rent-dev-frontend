import React from "react";
import {
  MdDirectionsCar,
  MdAirportShuttle,
  MdLocalShipping,
  MdStar,
  MdTerrain,
  MdWeekend,
} from "react-icons/md";

const CATEGORIES = [
  { name: "Sedan",     Icon: MdDirectionsCar,   desc: "Classic comfort",    count: 120 },
  { name: "SUV",       Icon: MdTerrain,          desc: "All-terrain ready",  count: 85  },
  { name: "MPV",       Icon: MdAirportShuttle,   desc: "Family spacious",    count: 60  },
  { name: "Hatchback", Icon: MdWeekend,          desc: "City agile",         count: 95  },
  { name: "Luxury",    Icon: MdStar,             desc: "Premium experience", count: 40  },
  { name: "Van",       Icon: MdLocalShipping,    desc: "Group transport",    count: 30  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="sr text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">
            Browse
          </span>
          <h2 className="text-3xl font-black text-slate-900 lg:text-4xl">Shop by Category</h2>
          <p className="mt-3 text-slate-500">
            Whatever the journey, we have the right vehicle for you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ name, Icon, desc, count }, i) => (
            <div
              key={name}
              className={`sr d${Math.min(i + 1, 4)} group flex flex-col items-center gap-3 rounded-2xl bg-white border border-slate-100 px-4 py-6 cursor-default hover:border-brand-200 hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 group-hover:bg-brand-500 transition-colors duration-200">
                <Icon className="h-6 w-6 text-brand-500 group-hover:text-white transition-colors duration-200" />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900 text-sm">{name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{desc}</p>
                <p className="mt-1.5 text-[10px] font-semibold text-brand-500">{count}+ units</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
