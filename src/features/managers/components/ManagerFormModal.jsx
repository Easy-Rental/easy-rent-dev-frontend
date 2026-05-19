import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { MANAGER_DEPARTMENTS } from "hooks/managers/_dummy";

const ManagerFormModal = ({ open, onClose, onSubmit, loading, error, fieldErrors, manager }) => {
  const isEdit = !!manager;

  const [form, setForm] = useState({
    name:          "",
    email:         "",
    password:      "",
    department:    "",
    assigned_area: "",
    is_active:     true,
  });

  useEffect(() => {
    if (manager) {
      setForm({
        name:          manager.name                    ?? "",
        email:         manager.email                   ?? "",
        password:      "",
        department:    manager.profile?.department     ?? "",
        assigned_area: manager.profile?.assigned_area  ?? "",
        is_active:     manager.is_active               ?? true,
      });
    } else {
      setForm({ name: "", email: "", password: "", department: "", assigned_area: "", is_active: true });
    }
  }, [manager, open]);

  if (!open) return null;

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...form });
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
            {isEdit ? "Edit Manager" : "Add Manager"}
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Full name" className={inputCls("name")} />
            {fieldErrors?.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder="email@jomdrivo.com" className={inputCls("email")} />
            {fieldErrors?.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
          </div>

          {!isEdit && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required placeholder="Min. 8 characters" className={inputCls("password")} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Department</label>
              <select value={form.department} onChange={(e) => set("department", e.target.value)} className={inputCls("department")}>
                <option value="">Select</option>
                {MANAGER_DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Area</label>
              <input value={form.assigned_area} onChange={(e) => set("assigned_area", e.target.value)} placeholder="e.g. Penang" className={inputCls("assigned_area")} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">Active</span>
            <button
              type="button"
              onClick={() => set("is_active", !form.is_active)}
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
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Manager"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerFormModal;
