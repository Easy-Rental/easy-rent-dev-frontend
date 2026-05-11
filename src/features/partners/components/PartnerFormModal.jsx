import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const ROLES = [
  { value: "fleet_owner", label: "Fleet Owner"      },
  { value: "individual",  label: "Individual Owner" },
];

const PartnerFormModal = ({ open, onClose, onSubmit, loading, error, fieldErrors, partner }) => {
  const isEdit = !!partner;

  const [form, setForm] = useState({
    name:      "",
    email:     "",
    password:  "",
    role:      "individual",
    is_active: true,
  });

  useEffect(() => {
    if (partner) {
      setForm({
        name:      partner.name,
        email:     partner.email,
        password:  "",
        role:      partner.role,
        is_active: partner.is_active,
      });
    } else {
      setForm({ name: "", email: "", password: "", role: "individual", is_active: true });
    }
  }, [partner, open]);

  if (!open) return null;

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, email: form.email, role: form.role, is_active: form.is_active };
    if (form.password) payload.password = form.password;
    await onSubmit(payload);
  };

  const inputCls = (key) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-300 ${
      fieldErrors[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Partner" : "Create Partner"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
            <MdClose size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input {...field("name")} required placeholder="John Doe" className={inputCls("name")} />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
            <input {...field("email")} type="email" required placeholder="john@example.com" className={inputCls("email")} />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password {isEdit && <span className="text-slate-400 font-normal">(leave blank to keep current)</span>}
            </label>
            <input {...field("password")} type="password" placeholder="••••••••" required={!isEdit} className={inputCls("password")} />
            {fieldErrors.password && <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Type</label>
            <select {...field("role")} className={inputCls("role")}>
              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            {fieldErrors.role && <p className="mt-1 text-xs text-red-500">{fieldErrors.role}</p>}
          </div>

          {/* Active toggle */}
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

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition disabled:opacity-60">
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Partner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerFormModal;
