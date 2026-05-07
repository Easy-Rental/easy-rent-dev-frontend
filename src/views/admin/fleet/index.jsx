import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdAdd,
  MdSearch,
  MdDirectionsCar,
  MdLocationOn,
  MdEdit,
  MdDeleteOutline,
  MdStar,
  MdFilterList,
} from "react-icons/md";
import { vehicles as initialVehicles, STATUS_STYLE } from "./data";

const TABS = ["All", "Available", "Rented", "Maintenance"];

const StatCard = ({ label, value, color }) => (
  <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5">
    <p className="text-xs font-medium text-gray-400">{label}</p>
    <p className={`mt-1 text-2xl font-extrabold ${color}`}>{value}</p>
  </div>
);

export default function Fleet() {
  const navigate = useNavigate();
  const [vehicles, setVehicles]   = useState(initialVehicles);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch]       = useState("");
  const [deleteId, setDeleteId]   = useState(null);

  const stats = {
    total:       vehicles.length,
    available:   vehicles.filter((v) => v.status === "Available").length,
    rented:      vehicles.filter((v) => v.status === "Rented").length,
    maintenance: vehicles.filter((v) => v.status === "Maintenance").length,
  };

  const filtered = vehicles.filter((v) => {
    const matchTab    = activeTab === "All" || v.status === activeTab;
    const matchSearch = [v.name, v.category, v.location, v.plateNo]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleDelete = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Fleet Management</h2>
          <p className="text-sm text-gray-400">{filtered.length} vehicles shown</p>
        </div>
        <Link
          to="/admin/fleet/add"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
        >
          <MdAdd className="h-4 w-4" />
          Add Vehicle
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="mb-6 flex gap-3 flex-wrap sm:flex-nowrap">
        <StatCard label="Total Vehicles" value={stats.total}       color="text-gray-900" />
        <StatCard label="Available"      value={stats.available}   color="text-green-600" />
        <StatCard label="Rented"         value={stats.rented}      color="text-orange-500" />
        <StatCard label="Maintenance"    value={stats.maintenance}  color="text-red-500" />
      </div>

      {/* ── Toolbar ── */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 w-full sm:max-w-xs shadow-sm">
          <MdSearch className="h-4 w-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search name, plate, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Vehicle</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Plate No.</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Price/Day</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Rating</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((v) => {
                  const style = STATUS_STYLE[v.status];
                  return (
                    <tr key={v.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                            <MdDirectionsCar className="h-5 w-5 text-brand-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">{v.name}</p>
                            <p className="text-xs text-gray-400">{v.category} · {v.seats} seats · {v.fuel}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">{v.plateNo}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1 text-gray-500">
                          <MdLocationOn className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          <span className="truncate max-w-[120px]">{v.location}</span>
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                          {v.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-gray-900">RM {v.price}</span>
                        <span className="text-xs text-gray-400">/day</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1">
                          <MdStar className="h-3.5 w-3.5 text-yellow-400" />
                          <span className="font-semibold text-gray-700">{v.rating}</span>
                          <span className="text-xs text-gray-400">({v.reviews})</span>
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/admin/fleet/${v.id}/edit`)}
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:border-brand-300 hover:text-brand-500 transition-colors"
                            title="Edit"
                          >
                            <MdEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(v.id)}
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:border-red-300 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <MdDeleteOutline className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16">
          <MdDirectionsCar className="h-12 w-12 text-gray-200" />
          <p className="mt-3 font-semibold text-gray-400">No vehicles found</p>
          <p className="mt-1 text-sm text-gray-300">Try adjusting your search or filter</p>
        </div>
      )}

      {/* ── Delete confirm modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <MdDeleteOutline className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Delete vehicle?</h3>
            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone. The vehicle will be permanently removed from your fleet.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
