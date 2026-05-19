import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateManager from "hooks/managers/useCreateManager";
import { useToast } from "context/ToastContext";
import InputField from "components/form/InputField";
import SelectField from "components/form/SelectField";
import CompactToggle from "components/form/toggle/CompactToggle";
import PasswordField from "components/form/PasswordField";
import Button from "components/ui/buttons/Button";
import { MANAGER_DEPARTMENTS } from "hooks/managers/_dummy";

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{children}</p>
);

const ManagerCreatePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { createManager, loading, error, fieldErrors } = useCreateManager();

  const [form, setForm] = useState({
    name:          "",
    email:         "",
    password:      "",
    department:    "",
    assigned_area: "",
    is_active:     true,
  });

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const isFormValid = form.name.trim() && form.email.trim() && form.password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { manager: created, fieldErrors: fe, error: ge } = await createManager({ ...form });
    if (created) {
      addToast("Manager account created successfully", "success");
      navigate("/admin/managers");
    } else {
      const firstError = Object.values(fe)[0];
      addToast(firstError ?? ge ?? "Failed to create manager. Please try again.", "error");
    }
  };

  const deptOptions = MANAGER_DEPARTMENTS.map((d) => ({ value: d, label: d }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Add Account Manager</h1>
          <p className="text-xs text-slate-400 mt-0.5">Create a new account manager login</p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 space-y-6">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>
          )}

          {/* Account */}
          <div className="space-y-4">
            <SectionLabel>Account</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                field="name"
                placeholder="e.g. Nurul Ain"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Email"
                field="email"
                type="email"
                placeholder="manager@jomdrivo.com"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <PasswordField
                placeholder="Min. 8 characters"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
            </div>
            <CompactToggle
              label="Active"
              description="Account can log in and access the system"
              field="is_active"
              formData={form}
              errors={fieldErrors}
              updateFormData={set}
            />
          </div>

          {/* Assignment */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <SectionLabel>Assignment</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label="Department"
                field="department"
                placeholder="Select department"
                options={deptOptions}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                required={false}
              />
              <InputField
                label="Assigned Area"
                field="assigned_area"
                placeholder="e.g. Kuala Lumpur & Selangor"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                required={false}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-slate-100 pt-5">
            <Button text="Cancel" variant="ghost" onClick={() => navigate("/admin/managers")} className="flex-1 py-2.5" />
            <Button type="submit" variant="primary" text={loading ? "Creating..." : "Create Manager"} disabled={loading || !isFormValid} className="flex-1 py-2.5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerCreatePage;
