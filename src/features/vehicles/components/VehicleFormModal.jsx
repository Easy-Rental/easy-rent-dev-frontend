import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { VEHICLE_CATEGORIES, VEHICLE_STATUSES } from "hooks/vehicles/_dummy";
import { DUMMY_BRANDS } from "hooks/brands/_dummy";

const VehicleFormModal = ({ open, onClose, onSubmit, loading, error, fieldErrors, vehicle }) => {
  const isEdit = !!vehicle;

  const [form, setForm] = useState({
    brand:       "",
    model:       "",
    year:        "",
    plate_number: "",
    category:    "",
    daily_rate:  "",
    status:      "available",
  });

  useEffect(() => {
    if (vehicle) {
      setForm({
        brand:        vehicle.brand        ?? "",
        model:        vehicle.model        ?? "",
        year:         vehicle.year         ?? "",
        plate_number: vehicle.plate_number ?? "",
        category:     vehicle.category     ?? "",
        daily_rate:   vehicle.daily_rate   ?? "",
        status:       vehicle.status       ?? "available",
      });
    } else {
      setForm({ brand: "", model: "", year: "", plate_number: "", category: "", daily_rate: "", status: "available" });
    }
  }, [vehicle, open]);

  if (!open) return null;

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      ...form,
      year:       form.year       ? Number(form.year)       : undefined,
      daily_rate: form.daily_rate ? Number(form.daily_rate) : undefined,
    });
  };

  const inputCls = (key) =>
    `w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-300 ${
      fieldErrors?.[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Vehicle" : "Add Vehicle"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
            <MdClose size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Brand</label>
              <select value={form.brand} onChange={(e) => set("brand", e.target.value)} required className={inputCls("brand")}>
                <option value="">Select brand</option>
                {DUMMY_BRANDS.map((b) => (
                  <option key={b.uid} value={b.name}>{b.name}</option>
                ))}
              </select>
              {fieldErrors?.brand && <p className="mt-1 text-xs text-red-500">{fieldErrors.brand}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model</label>
              <input
                value={form.model}
                onChange={(e) => set("model", e.target.value)}
                required
                placeholder="e.g. Camry"
                className={inputCls("model")}
              />
              {fieldErrors?.model && <p className="mt-1 text-xs text-red-500">{fieldErrors.model}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Year</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                placeholder="e.g. 2022"
                className={inputCls("year")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Plate Number</label>
              <input
                value={form.plate_number}
                onChange={(e) => set("plate_number", e.target.value)}
                required
                placeholder="e.g. WXY 1234"
                className={inputCls("plate_number")}
              />
              {fieldErrors?.plate_number && <p className="mt-1 text-xs text-red-500">{fieldErrors.plate_number}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} required className={inputCls("category")}>
                <option value="">Select</option>
                {VEHICLE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {fieldErrors?.category && <p className="mt-1 text-xs text-red-500">{fieldErrors.category}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Daily Rate (RM)</label>
              <input
                type="number"
                value={form.daily_rate}
                onChange={(e) => set("daily_rate", e.target.value)}
                required
                placeholder="e.g. 180"
                className={inputCls("daily_rate")}
              />
              {fieldErrors?.daily_rate && <p className="mt-1 text-xs text-red-500">{fieldErrors.daily_rate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls("status")}>
              {VEHICLE_STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition disabled:opacity-60">
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleFormModal;
