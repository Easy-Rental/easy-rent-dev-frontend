import React from "react";
import { MdDirectionsCar, MdPeople } from "react-icons/md";
import { DUMMY_MODELS } from "hooks/models/_dummy";

const yearRange = (m) =>
  m.year_end ? `${m.year_start} – ${m.year_end}` : `${m.year_start} – Present`;

const FEATURED = DUMMY_MODELS.slice(0, 6);

export default function ModelsSection() {
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="sr text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">
            Catalogue
          </span>
          <h2 className="text-3xl font-black text-slate-900 lg:text-4xl">Popular Models</h2>
          <p className="mt-3 text-slate-500">
            Explore our curated selection of top-performing vehicle models.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((m, i) => (
            <div
              key={m.uid}
              className={`sr d${Math.min(i + 1, 4)} flex items-center gap-4 rounded-2xl bg-white border border-slate-100 px-5 py-4 hover:border-brand-200 hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <MdDirectionsCar className="h-6 w-6 text-brand-500" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm truncate">
                  {m.brand_name} {m.name}
                </p>
                <p className="text-[11px] text-slate-400">{yearRange(m)}</p>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                  {m.category}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <MdPeople className="h-3 w-3" />
                  {m.seats} seats
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
