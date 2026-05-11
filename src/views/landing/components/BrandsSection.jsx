import React from "react";
import { SiBmw, SiToyota, SiHonda, SiNissan, SiAudi, SiVolkswagen, SiMazda, SiHyundai } from "react-icons/si";

const brands = [
  { name: "BMW",        Icon: SiBmw        },
  { name: "Toyota",     Icon: SiToyota     },
  { name: "Honda",      Icon: SiHonda      },
  { name: "Nissan",     Icon: SiNissan     },
  { name: "Audi",       Icon: SiAudi       },
  { name: "Volkswagen", Icon: SiVolkswagen },
  { name: "Mazda",      Icon: SiMazda      },
  { name: "Hyundai",    Icon: SiHyundai    },
];

export default function BrandsSection() {
  return (
    <section id="brands" className="px-8 pb-10">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white px-10 py-7">
        <p className="mb-6 text-center text-sm font-bold text-gray-900">Brands with body type</p>
        <div className="flex flex-wrap items-center justify-around gap-6">
          {brands.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default">
              <Icon className="h-8 w-8 text-gray-800"/>
              <span className="text-[10px] font-semibold text-gray-500">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
