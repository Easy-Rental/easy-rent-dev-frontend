import React from "react";
import { SiBmw, SiToyota, SiHonda } from "react-icons/si";
import { DUMMY_BRANDS } from "hooks/brands/_dummy";

const BRAND_ICONS = {
  Toyota: SiToyota,
  BMW:    SiBmw,
  Honda:  SiHonda,
};

export default function BrandsSection() {
  const active = DUMMY_BRANDS.filter((b) => b.is_active);

  return (
    <section id="brands" className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="sr text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">
            Trusted Partners
          </span>
          <h2 className="text-3xl font-black text-slate-900 lg:text-4xl">Premium Brands</h2>
          <p className="mt-3 text-slate-500">
            We work with the world's most trusted automotive brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {active.map((brand, i) => {
            const Icon = BRAND_ICONS[brand.name];
            return (
              <div
                key={brand.uid}
                className={`sr d${Math.min(i + 1, 4)} group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-8 hover:border-brand-200 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-default`}
              >
                {Icon ? (
                  <Icon className="h-10 w-10 text-slate-400 group-hover:text-slate-800 transition-colors duration-200" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500">
                    <span className="text-sm font-black text-white">{brand.name[0]}</span>
                  </div>
                )}
                <div className="text-center">
                  <p className="font-bold text-sm text-slate-900">{brand.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{brand.country_of_origin}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
