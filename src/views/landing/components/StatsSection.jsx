import React from "react";
import { MdDirectionsCar, MdBrandingWatermark, MdLocationOn, MdPeople } from "react-icons/md";

const STATS = [
  { icon: MdDirectionsCar,     value: "500+",  label: "Vehicles Available"  },
  { icon: MdBrandingWatermark, value: "6+",    label: "Premium Brands"      },
  { icon: MdLocationOn,        value: "50+",   label: "Pickup Locations"    },
  { icon: MdPeople,            value: "10K+",  label: "Happy Customers"     },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-900 py-14 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-px bg-slate-700 rounded-2xl overflow-hidden lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="sr bg-slate-900 px-8 py-10 text-center hover:bg-slate-800 transition-colors duration-300 group"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors">
                <Icon className="h-6 w-6 text-brand-400" />
              </div>
              <p className="text-3xl font-black text-white tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
