import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { MODEL_CATEGORIES, MODEL_TRANSMISSIONS, MODEL_FUEL_TYPES } from "hooks/models/_dummy";
import { DUMMY_BRANDS } from "hooks/brands/_dummy";

const ModelFormModal = ({ open, onClose, onSubmit, loading, error, fieldErrors, model }) => {
  const isEdit = !!model;

  const [form, setForm] = useState({
    brand_uid:    "",
    brand_name:   "",
    name:         "",
    year_start:   "",
    year_end:     "",
    category:     "",
    transmission: "",
    fuel_type:    "",
    seats:        "",
  });

  useEffect(() => {
    if (model) {
      setForm({
        brand_uid:    model.brand_uid    ?? "",
        brand_name:   model.brand_name   ?? "",
        name:         model.name         ?? "",
        year_start:   model.year_start   ?? "",
        year_end:     model.year_end     ?? "",
        category:     model.category     ?? "",
        transmission: model.transmission ?? "",
        fuel_type:    model.fuel_type    ?? "",
        seats:        model.seats        ?? "",
      });
    } else {
      setForm({ brand_uid: "", brand_name: "", name: "", year_start: "", year_end: "", category: "", transmission: "", fuel_type: "", seats: "" });
    }
  }, [model, open]);

  if (!open) return null;

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleBrandChange = (e) => {
    const uid   = e.target.value;
    const brand = DUMMY_BRANDS.find((b) => b.uid === uid);
    setForm((p) => ({ ...p, brand_uid: uid, brand_name: brand?.name ?? "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      ...form,
      year_start: form.year_start ? Number(form.year_start) : undefined,
      year_end:   form.year_end   ? Number(form.year_end)   : null,
      seats:      form.seats      ? Number(form.seats)      : undefined,
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
            {isEdit ? "Edit Model" : "Add Model"}
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
              <select value={form.brand_uid} onChange={handleBrandChange} required className={inputCls("brand_uid")}>
                <option value="">Select brand</option>
                {DUMMY_BRANDS.map((b) => (
                  <option key={b.uid} value={b.uid}>{b.name}</option>
                ))}
              </select>
              {fieldErrors?.brand_uid && <p className="mt-1 text-xs text-red-500">{fieldErrors.brand_uid}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model Name</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                placeholder="e.g. Camry"
                className={inputCls("name")}
              />
              {fieldErrors?.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Year Start</label>
              <input
                type="number"
                value={form.year_start}
                onChange={(e) => set("year_start", e.target.value)}
                required
                placeholder="e.g. 2020"
                className={inputCls("year_start")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Year End</label>
              <input
                type="number"
                value={form.year_end}
                onChange={(e) => set("year_end", e.target.value)}
                placeholder="Empty = Present"
                className={inputCls("year_end")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} required className={inputCls("category")}>
                <option value="">Select</option>
                {MODEL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Seats</label>
              <input
                type="number"
                value={form.seats}
                onChange={(e) => set("seats", e.target.value)}
                placeholder="e.g. 5"
                className={inputCls("seats")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Transmission</label>
              <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)} className={inputCls("transmission")}>
                <option value="">Select</option>
                {MODEL_TRANSMISSIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Type</label>
              <select value={form.fuel_type} onChange={(e) => set("fuel_type", e.target.value)} className={inputCls("fuel_type")}>
                <option value="">Select</option>
                {MODEL_FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition disabled:opacity-60">
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Model"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelFormModal;
