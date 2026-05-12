import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdPhotoCamera, MdDirectionsCar } from "react-icons/md";
import useGetVehicle from "hooks/vehicles/useGetVehicle";
import useUpdateVehicle from "hooks/vehicles/useUpdateVehicle";
import usePresignedUpload from "hooks/storage/usePresignedUpload";
import { useToast } from "context/ToastContext";
import InputField from "components/form/InputField";
import TextareaField from "components/form/TextareaField";
import SelectField from "components/form/SelectField";
import SearchableSelect from "components/form/SearchableSelect";
import SearchableMultiSelectField from "components/form/search/SearchableMultiSelectField";
import CompactToggle from "components/form/toggle/CompactToggle";
import Button from "components/ui/buttons/Button";
import Loading from "../../../components/loading/Loading";
import {
  VEHICLE_FEATURES, VEHICLE_CATEGORIES, VEHICLE_FUEL_TYPES,
  VEHICLE_TRANSMISSIONS, VEHICLE_STATUSES,
} from "hooks/vehicles/_dummy";
import { DUMMY_BRANDS } from "hooks/brands/_dummy";
import { DUMMY_PARTNERS } from "hooks/partners/_dummy";

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{children}</p>
);

const toOptions = (arr) => arr.map((v) => ({ label: v, value: v }));

const VehicleImageUpload = ({ displayUrl, onChange, onUploadError }) => {
  const { upload, uploading, progress, error, reset } = usePresignedUpload();
  const inputRef = useRef(null);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const result = await upload(file, { folder: "vehicles/images", file_type: "image" });
    if (result) { onChange(result); reset(); }
    else { onUploadError?.("Failed to upload image. Please try again."); }
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
            <img src={displayUrl} alt="Vehicle" className="w-full h-full object-cover bg-slate-50" />
          ) : (
            <div className="w-full h-full bg-brand-50 flex items-center justify-center">
              <MdDirectionsCar size={36} className="text-brand-400" />
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
          {displayUrl ? "Change photo" : "Upload photo"}
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
        className="hidden" onChange={handleChange} />
    </div>
  );
};

const VehicleEditPage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { vehicle, loading: loadingVehicle, error: loadError } = useGetVehicle(id);
  const { updateVehicle, loading: updating, error: updateError, fieldErrors, getLastError } = useUpdateVehicle();

  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");

  const [form, setForm] = useState({
    brand:            "",
    model:            "",
    year:             "",
    color:            "",
    plate_number:     "",
    transmission:     "",
    fuel_type:        "",
    seats:            "",
    category:         "",
    daily_rate:       "",
    location:         "",
    partner_uid:      "",
    status:           "available",
    mileage:          "",
    insurance_expiry: "",
    road_tax_expiry:  "",
    features:         [],
    description:      "",
    is_active:        true,
  });

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  useEffect(() => {
    if (!vehicle) return;
    setForm({
      brand:            vehicle.brand            ?? "",
      model:            vehicle.model            ?? "",
      year:             vehicle.year             ?? "",
      color:            vehicle.color            ?? "",
      plate_number:     vehicle.plate_number     ?? "",
      transmission:     vehicle.transmission     ?? "",
      fuel_type:        vehicle.fuel_type        ?? "",
      seats:            vehicle.seats            ?? "",
      category:         vehicle.category         ?? "",
      daily_rate:       vehicle.daily_rate       ?? "",
      location:         vehicle.location         ?? "",
      partner_uid:      vehicle.partner_uid      ?? "",
      status:           vehicle.status           ?? "available",
      mileage:          vehicle.mileage          ?? "",
      insurance_expiry: vehicle.insurance_expiry ?? "",
      road_tax_expiry:  vehicle.road_tax_expiry  ?? "",
      features:         vehicle.features         ?? [],
      description:      vehicle.description      ?? "",
      is_active:        vehicle.is_active        ?? true,
    });
    setImageUrl(vehicle.images?.[0]?.public_url ?? "");
  }, [vehicle]);

  const brandOptions   = DUMMY_BRANDS.map((b) => ({ value: b.name, label: b.name }));
  const partnerOptions = DUMMY_PARTNERS.map((p) => ({ value: p.uid, label: p.name }));
  const featureOptions = VEHICLE_FEATURES.map((f) => ({ value: f, label: f }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year:       form.year       ? Number(form.year)       : undefined,
      seats:      form.seats      ? Number(form.seats)      : undefined,
      daily_rate: form.daily_rate ? Number(form.daily_rate) : undefined,
      mileage:    form.mileage    ? Number(form.mileage)    : undefined,
      ...(imageKey ? { thumbnail_key: imageKey } : {}),
    };
    const result = await updateVehicle(id, payload);
    if (result) {
      addToast("Vehicle updated successfully", "success");
      navigate(`/admin/fleet/${id}`);
    } else {
      const { fieldErrors: fe, error: ge } = getLastError();
      const firstError = Object.values(fe)[0] ?? ge ?? "Failed to save changes. Please try again.";
      addToast(firstError, "error");
    }
  };

  if (loadingVehicle) return <Loading text="Loading vehicle..." />;
  if (loadError) return (
    <div className="flex items-center justify-center py-20 text-sm text-red-500">{loadError}</div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Edit Vehicle</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Updating <span className="font-semibold text-brand-600">{vehicle?.brand} {vehicle?.model}</span>
          </p>
        </div>

        <VehicleImageUpload
          displayUrl={imageUrl}
          onChange={({ file_key, public_url }) => { setImageKey(file_key); setImageUrl(public_url); }}
          onUploadError={(msg) => addToast(msg, "error")}
        />

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 space-y-6">
          {updateError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{updateError}</div>
          )}

          {/* Vehicle Info */}
          <div className="space-y-4">
            <SectionLabel>Vehicle Info</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SearchableSelect
                label="Brand"
                field="brand"
                options={brandOptions}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                placeholder="Select brand..."
              />
              <InputField
                label="Model"
                field="model"
                placeholder="e.g. Camry"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Year"
                field="year"
                type="number"
                placeholder="e.g. 2022"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Color"
                field="color"
                placeholder="e.g. Pearl White"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Plate Number"
                field="plate_number"
                placeholder="e.g. WXY 1234"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <SelectField
                label="Category"
                field="category"
                placeholder="Select category"
                options={toOptions(VEHICLE_CATEGORIES)}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <SelectField
                label="Transmission"
                field="transmission"
                placeholder="Select transmission"
                options={toOptions(VEHICLE_TRANSMISSIONS)}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <SelectField
                label="Fuel Type"
                field="fuel_type"
                placeholder="Select fuel type"
                options={toOptions(VEHICLE_FUEL_TYPES)}
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

          {/* Pricing & Location */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <SectionLabel>Pricing & Location</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Daily Rate (RM)"
                field="daily_rate"
                type="number"
                placeholder="e.g. 180"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
              <InputField
                label="Location"
                field="location"
                placeholder="e.g. Kuala Lumpur"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
            </div>
          </div>

          {/* Partner & Status */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <SectionLabel>Partner & Status</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SearchableSelect
                label="Partner"
                field="partner_uid"
                options={partnerOptions}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                placeholder="Select partner..."
              />
              <SelectField
                label="Status"
                field="status"
                placeholder="Select status"
                options={VEHICLE_STATUSES.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
              />
            </div>
            <CompactToggle
              label="Active"
              description="Vehicle is visible and available for rental"
              field="is_active"
              formData={form}
              errors={fieldErrors}
              updateFormData={set}
            />
          </div>

          {/* Specifications */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <SectionLabel>Specifications & Documents</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Mileage (km)"
                field="mileage"
                type="number"
                placeholder="e.g. 28500"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                required={false}
              />
              <InputField
                label="Insurance Expiry"
                field="insurance_expiry"
                type="date"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                required={false}
              />
              <InputField
                label="Road Tax Expiry"
                field="road_tax_expiry"
                type="date"
                formData={form}
                errors={fieldErrors}
                updateFormData={set}
                required={false}
              />
            </div>
          </div>

          {/* Features */}
          <div className="pt-2 border-t border-slate-100">
            <SectionLabel>Features</SectionLabel>
            <SearchableMultiSelectField
              label="Vehicle Features"
              field="features"
              options={featureOptions}
              formData={form}
              errors={fieldErrors}
              updateFormData={set}
              placeholder="Select features..."
              required={false}
            />
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-slate-100">
            <SectionLabel>Description</SectionLabel>
            <TextareaField
              label="Description"
              field="description"
              placeholder="Brief description of the vehicle..."
              rows={3}
              formData={form}
              errors={fieldErrors}
              updateFormData={set}
              required={false}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-slate-100 pt-5">
            <Button text="Cancel" variant="ghost" onClick={() => navigate(`/admin/fleet/${id}`)} className="flex-1 py-2.5" />
            <Button type="submit" variant="primary" text={updating ? "Saving..." : "Save Changes"} disabled={updating || !form.brand || !form.model} className="flex-1 py-2.5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleEditPage;
