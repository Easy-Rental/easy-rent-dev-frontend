import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import useCreateBrand from "hooks/brands/useCreateBrand";
import usePresignedUpload from "hooks/storage/usePresignedUpload";
import { useToast } from "context/ToastContext";
import InputField from "components/form/InputField";
import TextareaField from "components/form/TextareaField";
import SearchableSelect from "components/form/SearchableSelect";
import CompactToggle from "components/form/toggle/CompactToggle";
import Button from "components/ui/buttons/Button";
import { COUNTRIES } from "constants/lists";

/* ─── Logo upload widget ─────────────────────────────────────────────────── */
const LogoUpload = ({ displayUrl, name, onChange, onUploadError }) => {
  const { upload, uploading, progress, error, reset } = usePresignedUpload();
  const inputRef = useRef(null);

  const initial = name?.[0]?.toUpperCase() ?? "?";

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const result = await upload(file, { folder: "brands/logos", file_type: "image" });
    if (result) { onChange(result); reset(); }
    else { onUploadError?.("Failed to upload logo. Please try again."); }
  };

  return (
    <div className="flex flex-col items-center gap-3 py-6 border-b border-slate-100">
      <div className="relative group">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-100 focus:outline-none focus:ring-brand-200 transition"
          disabled={uploading}
        >
          {displayUrl ? (
            <img src={displayUrl} alt="Brand logo" className="w-full h-full object-contain bg-slate-50" />
          ) : (
            <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-3xl font-bold select-none">
              {initial}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-2xl">
            <MdPhotoCamera size={22} className="text-white" />
          </div>
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-0.5 right-0.5 w-7 h-7 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm transition"
        >
          <MdPhotoCamera size={12} />
        </button>
      </div>

      {uploading && (
        <div className="w-28 space-y-1">
          <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400 text-center">Uploading {progress}%</p>
        </div>
      )}

      {!uploading && (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="text-xs text-brand-500 hover:text-brand-700 transition font-medium">
          {displayUrl ? "Change logo" : "Upload logo"}
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden" onChange={handleChange} />
    </div>
  );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{children}</p>
);

const BrandCreatePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { createBrand, loading, error, fieldErrors } = useCreateBrand();

  const [logoUrl, setLogoUrl]   = useState("");
  const [logoKey, setLogoKey]   = useState("");

  const [form, setForm] = useState({
    name:               "",
    country_of_origin:  "",
    description:        "",
    is_active:          true,
  });

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const isFormValid = form.name.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      ...(logoKey ? { logo: logoKey } : {}),
    };
    const { brand: created, fieldErrors: fe, error: ge } = await createBrand(payload);
    if (created) {
      addToast("Brand created successfully", "success");
      navigate("/admin/brands");
    } else {
      const firstError = Object.values(fe)[0];
      addToast(firstError ?? ge ?? "Failed to create brand. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Add Car Brand</h1>
          <p className="text-xs text-slate-400 mt-0.5">Register a new vehicle brand on the platform</p>
        </div>

        <LogoUpload
          displayUrl={logoUrl}
          name={form.name}
          onChange={({ file_key, public_url }) => { setLogoKey(file_key); setLogoUrl(public_url); }}
          onUploadError={(msg) => addToast(msg, "error")}
        />

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 space-y-6">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <SectionLabel>Brand Details</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Brand Name"
                field="name"
                placeholder="e.g. Toyota"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <SearchableSelect
                label="Country of Origin"
                field="country_of_origin"
                options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                placeholder="Select country..."
              />
            </div>
            <TextareaField
              label="Description"
              field="description"
              placeholder="Brief description of the brand..."
              rows={3}
              formData={form}
              errors={fieldErrors}
              updateFormData={set}
              required={false}
            />
          </div>

          {/* Status */}
          <div className="pt-2 border-t border-slate-100">
            <SectionLabel>Visibility</SectionLabel>
            <CompactToggle
              label="Active"
              description="Brand is visible and available for vehicle listings"
              field="is_active"
              formData={form}
              errors={fieldErrors}
              updateFormData={set}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-slate-100 pt-5">
            <Button text="Cancel" variant="ghost" onClick={() => navigate("/admin/brands")} className="flex-1 py-2.5" />
            <Button type="submit" variant="primary" text={loading ? "Creating..." : "Create Brand"} disabled={loading || !isFormValid} className="flex-1 py-2.5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandCreatePage;
