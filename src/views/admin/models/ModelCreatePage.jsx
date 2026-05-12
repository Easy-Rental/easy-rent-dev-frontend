import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateModel from "hooks/models/useCreateModel";
import { useToast } from "context/ToastContext";
import InputField from "components/form/InputField";
import SelectField from "components/form/SelectField";
import SearchableSelect from "components/form/SearchableSelect";
import Button from "components/ui/buttons/Button";
import { MODEL_CATEGORIES, MODEL_TRANSMISSIONS, MODEL_FUEL_TYPES } from "hooks/models/_dummy";
import { DUMMY_BRANDS } from "hooks/brands/_dummy";

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{children}</p>
);

const toOptions = (arr) => arr.map((v) => ({ label: v, value: v }));

const ModelCreatePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { createModel, loading, error, fieldErrors } = useCreateModel();

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

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleBrandChange = (key, value) => {
    const brand = DUMMY_BRANDS.find((b) => b.uid === value);
    setForm((p) => ({ ...p, brand_uid: value, brand_name: brand?.name ?? "" }));
  };

  const brandOptions = DUMMY_BRANDS.map((b) => ({ value: b.uid, label: b.name }));

  const isFormValid = form.brand_uid && form.name && form.year_start && form.category;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year_start: form.year_start ? Number(form.year_start) : undefined,
      year_end:   form.year_end   ? Number(form.year_end)   : null,
      seats:      form.seats      ? Number(form.seats)      : undefined,
    };
    const { model: created, fieldErrors: fe, error: ge } = await createModel(payload);
    if (created) {
      addToast("Model created successfully", "success");
      navigate("/admin/models");
    } else {
      const firstError = Object.values(fe)[0];
      addToast(firstError ?? ge ?? "Failed to create model. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Add Car Model</h1>
          <p className="text-xs text-slate-400 mt-0.5">Register a new vehicle model under a brand</p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 space-y-6">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>
          )}

          {/* Identity */}
          <div className="space-y-4">
            <SectionLabel>Model Identity</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SearchableSelect
                label="Brand"
                field="brand_uid"
                options={brandOptions}
                formData={form}
                errors={fieldErrors}
                updateFormData={handleBrandChange}
                placeholder="Select brand..."
              />
              <InputField
                label="Model Name"
                field="name"
                placeholder="e.g. Camry"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
            </div>
          </div>

          {/* Year Range */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <SectionLabel>Production Years</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Year Start"
                field="year_start"
                type="number"
                placeholder="e.g. 2020"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Year End"
                field="year_end"
                type="number"
                placeholder="Leave empty if still in production"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                required={false}
              />
            </div>
            {!form.year_end && (
              <p className="text-xs text-slate-400">Leave Year End empty to indicate the model is still in production.</p>
            )}
          </div>

          {/* Specs */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <SectionLabel>Specifications</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label="Category"
                field="category"
                placeholder="Select category"
                options={toOptions(MODEL_CATEGORIES)}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <SelectField
                label="Transmission"
                field="transmission"
                placeholder="Select transmission"
                options={toOptions(MODEL_TRANSMISSIONS)}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <SelectField
                label="Fuel Type"
                field="fuel_type"
                placeholder="Select fuel type"
                options={toOptions(MODEL_FUEL_TYPES)}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Seats"
                field="seats"
                type="number"
                placeholder="e.g. 5"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-slate-100 pt-5">
            <Button text="Cancel" variant="ghost" onClick={() => navigate("/admin/models")} className="flex-1 py-2.5" />
            <Button type="submit" variant="primary" text={loading ? "Creating..." : "Create Model"} disabled={loading || !isFormValid} className="flex-1 py-2.5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelCreatePage;
