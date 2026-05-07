// components/form/InputField.jsx
import React from "react";

const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  return path
    .split(/[\.\[\]]/).filter(Boolean)
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const InputField = ({ label, field, type = "text", required = true, placeholder = "", formData, errors, updateFormData }) => {
  const value = getNestedValue(formData, field) ?? "";

  const dateProps = type === "date" ? { min: "1900-01-01", max: "2099-12-31" } : {};

  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-blueSecondary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => updateFormData(field, type === "email" ? e.target.value.toLowerCase() : e.target.value)}
        placeholder={placeholder}
        {...dateProps}
        className={`h-12 w-full rounded-xl border px-3 text-sm text-blueSecondary outline-none transition-all placeholder:text-slate-400 focus:outline-none ${
          getNestedValue(errors, field)
            ? "border-red-400 bg-red-50 focus:border-red-500"
            : "border-slate-200 bg-slate-50 focus:border-brand-500 focus:bg-white"
        }`}
      />

      {getNestedValue(errors, field) && (
        <p className="mt-1.5 text-xs text-red-500">{getNestedValue(errors, field)}</p>
      )}
    </div>
  );
};

export default InputField;
