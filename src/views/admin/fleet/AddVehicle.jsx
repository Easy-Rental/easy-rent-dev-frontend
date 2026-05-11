import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdDirectionsCar } from "react-icons/md";
import { InputField, SelectField } from "components/form";
import { CATEGORIES, FUEL_TYPES, STATUSES, LOCATIONS } from "./data";

const toOptions = (arr) => arr.map((v) => ({ label: v, value: v }));

const INITIAL = {
  name: "", category: "", fuel: "", seats: "", price: "", location: "", status: "", plateNo: "",
};

export default function AddVehicle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name     = "Vehicle name is required";
    if (!formData.category)       e.category = "Category is required";
    if (!formData.fuel)           e.fuel     = "Fuel type is required";
    if (!formData.seats)          e.seats    = "Number of seats is required";
    else if (isNaN(formData.seats) || +formData.seats < 1) e.seats = "Enter a valid seat count";
    if (!formData.price)          e.price    = "Price per day is required";
    else if (isNaN(formData.price) || +formData.price < 1) e.price = "Enter a valid price";
    if (!formData.location)       e.location = "Location is required";
    if (!formData.status)         e.status   = "Status is required";
    if (!formData.plateNo.trim()) e.plateNo  = "Plate number is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    navigate("/admin/fleet");
  };

  return (
    <div className="max-w-2xl">
      {/* ── Header ── */}
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/fleet")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-colors"
        >
          <MdArrowBack className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Add New Vehicle</h2>
          <p className="text-sm text-slate-400">Fill in the details to add a vehicle to your fleet</p>
        </div>
      </div>

      {/* ── Form card ── */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        {/* Vehicle icon preview */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50">
          <MdDirectionsCar className="h-10 w-10 text-brand-500" />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <InputField
                label="Vehicle Name"
                field="name"
                placeholder="e.g. Toyota Camry"
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
              />
            </div>

            <SelectField
              label="Category"
              field="category"
              placeholder="Select category"
              options={toOptions(CATEGORIES)}
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />

            <SelectField
              label="Fuel Type"
              field="fuel"
              placeholder="Select fuel type"
              options={toOptions(FUEL_TYPES)}
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />

            <InputField
              label="Seats"
              field="seats"
              type="number"
              placeholder="e.g. 5"
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />

            <InputField
              label="Price per Day (RM)"
              field="price"
              type="number"
              placeholder="e.g. 180"
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />

            <SelectField
              label="Location"
              field="location"
              placeholder="Select location"
              options={toOptions(LOCATIONS)}
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />

            <SelectField
              label="Status"
              field="status"
              placeholder="Select status"
              options={toOptions(STATUSES)}
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />

            <InputField
              label="Plate Number"
              field="plateNo"
              placeholder="e.g. WXY 1234"
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
            />
          </div>

          {/* ── Actions ── */}
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/fleet")}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
