import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDirectionsCar,
  MdStar,
  MdGridView,
  MdViewList,
  MdTune,
  MdLocationOn,
  MdAdd,
} from "react-icons/md";

const vehicles = [
  { id: 1,  name: "Toyota Camry",       category: "Sedan",   price: 180, rating: 4.9, reviews: 124, location: "Kuala Lumpur", status: "Available",    fuel: "Petrol",   seats: 5, color: "from-blue-100 to-blue-200",   textColor: "text-blue-400"   },
  { id: 2,  name: "Honda CR-V",         category: "SUV",     price: 250, rating: 4.8, reviews: 89,  location: "Petaling Jaya", status: "Available",   fuel: "Petrol",   seats: 7, color: "from-red-100 to-red-200",     textColor: "text-red-400"    },
  { id: 3,  name: "BMW 3 Series",       category: "Luxury",  price: 450, rating: 4.9, reviews: 56,  location: "KLCC",          status: "Rented",      fuel: "Petrol",   seats: 5, color: "from-slate-100 to-slate-200",   textColor: "text-slate-500"   },
  { id: 4,  name: "Toyota Hiace",       category: "Van",     price: 320, rating: 4.7, reviews: 43,  location: "Subang Jaya",   status: "Available",   fuel: "Diesel",   seats: 12,color: "from-white to-slate-100",     textColor: "text-slate-400"   },
  { id: 5,  name: "Mercedes C-Class",   category: "Luxury",  price: 520, rating: 5.0, reviews: 31,  location: "Bangsar",       status: "Available",   fuel: "Petrol",   seats: 5, color: "from-slate-100 to-slate-200", textColor: "text-slate-400"  },
  { id: 6,  name: "Perodua Myvi",       category: "Sedan",   price: 90,  rating: 4.6, reviews: 210, location: "Cheras",        status: "Available",   fuel: "Petrol",   seats: 5, color: "from-orange-100 to-orange-200",textColor: "text-orange-400"},
  { id: 7,  name: "Honda Odyssey",      category: "Van",     price: 290, rating: 4.8, reviews: 67,  location: "Ampang",        status: "Maintenance", fuel: "Petrol",   seats: 8, color: "from-teal-100 to-teal-200",   textColor: "text-teal-400"   },
  { id: 8,  name: "Tesla Model 3",      category: "Luxury",  price: 480, rating: 5.0, reviews: 22,  location: "Mont Kiara",    status: "Available",   fuel: "Electric", seats: 5, color: "from-red-50 to-red-100",      textColor: "text-red-300"    },
  { id: 9,  name: "Toyota Fortuner",    category: "SUV",     price: 380, rating: 4.7, reviews: 95,  location: "Puchong",       status: "Available",   fuel: "Diesel",   seats: 7, color: "from-amber-100 to-amber-200", textColor: "text-amber-400"  },
  { id: 10, name: "Proton X70",         category: "SUV",     price: 210, rating: 4.5, reviews: 178, location: "Shah Alam",     status: "Rented",      fuel: "Petrol",   seats: 7, color: "from-blue-50 to-blue-100",    textColor: "text-blue-300"   },
  { id: 11, name: "Perodua Bezza",      category: "Sedan",   price: 80,  rating: 4.4, reviews: 302, location: "Kajang",        status: "Available",   fuel: "Petrol",   seats: 5, color: "from-purple-100 to-purple-200",textColor: "text-purple-400"},
  { id: 12, name: "Ford Ranger",        category: "Truck",   price: 350, rating: 4.8, reviews: 55,  location: "Cyberjaya",     status: "Available",   fuel: "Diesel",   seats: 5, color: "from-slate-200 to-slate-300",   textColor: "text-slate-500"   },
];

const statusBadge = {
  Available:   "bg-green-50 text-green-600 border border-green-200",
  Rented:      "bg-orange-50 text-orange-600 border border-orange-200",
  Maintenance: "bg-red-50 text-red-500 border border-red-200",
};

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Top Rated"];

export default function Dashboard() {
  const [gridView, setGridView] = useState(true);
  const [sort, setSort]         = useState("Newest");
  const [search, setSearch]     = useState("");

  const filtered = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Top Rated")          return b.rating - a.rating;
    return a.id - b.id;
  });

  return (
    <div>
      {/* ── Page header ── */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">All vehicles to rent</h2>
          <p className="text-sm text-slate-400">{filtered.length} vehicles found</p>
        </div>
        <Link
          to="/admin/fleet/add"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
        >
          <MdAdd className="h-4 w-4" /> Add Vehicle
        </Link>
      </div>

      {/* ── Toolbar ── */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 w-full sm:max-w-xs shadow-sm">
          <MdDirectionsCar className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search vehicles, type or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <MdTune className="h-4 w-4 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm text-slate-600 outline-none cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          {/* View toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setGridView(true)}
              className={`p-2 transition-colors ${gridView ? "bg-brand-500 text-white" : "text-slate-400 hover:bg-slate-50"}`}
            >
              <MdGridView className="h-4 w-4" />
            </button>
            <button
              onClick={() => setGridView(false)}
              className={`p-2 transition-colors ${!gridView ? "bg-brand-500 text-white" : "text-slate-400 hover:bg-slate-50"}`}
            >
              <MdViewList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Grid view ── */}
      {gridView ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((car) => (
            <div
              key={car.id}
              className="group rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Car image */}
              <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${car.color}`}>
                <MdDirectionsCar className={`h-24 w-24 ${car.textColor} group-hover:scale-105 transition-transform duration-300`} />
                <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusBadge[car.status]}`}>
                  {car.status}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                  {car.category}
                </span>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-sm truncate">{car.name}</h3>

                <div className="mt-1 flex items-center gap-1">
                  <MdStar className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="text-xs font-semibold text-slate-700">{car.rating}</span>
                  <span className="text-xs text-slate-400">({car.reviews})</span>
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <MdLocationOn className="h-3.5 w-3.5" />
                  {car.location}
                  <span className="mx-1">·</span>
                  {car.seats} seats
                  <span className="mx-1">·</span>
                  {car.fuel}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">RM {car.price}</span>
                    <span className="text-xs text-slate-400"> / day</span>
                  </div>
                  <button className="rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-500 hover:bg-brand-500 hover:text-white transition-colors">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── List view ── */
        <div className="space-y-3">
          {sorted.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-4 rounded-2xl bg-white border border-slate-100 p-4 hover:shadow-md hover:shadow-slate-200/60 transition-all"
            >
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${car.color}`}>
                <MdDirectionsCar className={`h-9 w-9 ${car.textColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-sm">{car.name}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusBadge[car.status]}`}>
                    {car.status}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1"><MdStar className="text-yellow-400" />{car.rating} ({car.reviews})</span>
                  <span className="flex items-center gap-1"><MdLocationOn />{car.location}</span>
                  <span>{car.category} · {car.seats} seats · {car.fuel}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-base font-extrabold text-slate-900">RM {car.price}</p>
                <p className="text-xs text-slate-400">per day</p>
              </div>
              <button className="shrink-0 rounded-xl bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-500 hover:bg-brand-500 hover:text-white transition-colors">
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
