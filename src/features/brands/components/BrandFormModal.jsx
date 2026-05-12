import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const BrandFormModal = ({ open, onClose, onSubmit, loading, error, fieldErrors, brand }) => {
  const isEdit = !!brand;

  const [form, setForm] = useState({
    name:              "",
    country_of_origin: "",
    description:       "",
    is_active:         true,
  });

  useEffect(() => {
    if (brand) {
      setForm({
        name:              brand.name              ?? "",
        country_of_origin: brand.country_of_origin ?? "",
        description:       brand.description       ?? "",
        is_active:         brand.is_active         ?? true,
      });
    } else {
      setForm({ name: "", country_of_origin: "", description: "", is_active: true });
    }
  }, [brand, open]);

  if (!open) return null;

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...form });
  };

  const inputCls = (key) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-300 ${
      fieldErrors[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Brand" : "Create Brand"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
            <MdClose size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">{error}</div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Brand Name</label>
            <input {...field("name")} required placeholder="e.g. Toyota" className={inputCls("name")} />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Country of Origin</label>
            <input {...field("country_of_origin")} placeholder="e.g. Japan" className={inputCls("country_of_origin")} />
            {fieldErrors.country_of_origin && <p className="mt-1 text-xs text-red-500">{fieldErrors.country_of_origin}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea {...field("description")} rows={3} placeholder="Brief description..." className={inputCls("description") + " resize-none"} />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">Active</span>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, is_active: !p.is_active }))}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active ? "bg-brand-500" : "bg-slate-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_active ? "translate-x-5" : ""}`} />
            </button>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition disabled:opacity-60">
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandFormModal;
