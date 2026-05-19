import React from "react";
import { MdDirectionsCar, MdStar, MdLocationOn } from "react-icons/md";
import { DUMMY_VEHICLES } from "hooks/vehicles/_dummy";

const FEATURED = DUMMY_VEHICLES.filter((v) => v.status === "available").slice(0, 3);

export default function FeaturedVehiclesSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="sr text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">
            Our Fleet
          </span>
          <h2 className="text-3xl font-black text-slate-900 lg:text-4xl">Featured Vehicles</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Hand-picked from our premium collection, ready for your next journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((v, i) => (
            <div
              key={v.uid}
              className={`sr d${Math.min(i + 1, 4)} group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
            >
              <div className="flex h-44 items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
                <MdDirectionsCar className="h-20 w-20 text-slate-200" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {v.brand} {v.model}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {v.year} · {v.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 shrink-0">
                    <MdStar className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs font-bold text-amber-600">{v.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[v.transmission, v.fuel_type, `${v.seats} Seats`].map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-400">
                    <MdLocationOn className="h-3.5 w-3.5 shrink-0" />
                    <span className="text-xs">{v.location}</span>
                  </div>
                  <div>
                    <span className="text-xl font-black text-slate-900">RM {v.daily_rate}</span>
                    <span className="text-xs text-slate-400">/day</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sr mt-10 text-center">
          <a
            href="/auth/sign-in"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-8 py-3.5 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
          >
            View All Vehicles →
          </a>
        </div>
      </div>
    </section>
  );
}
