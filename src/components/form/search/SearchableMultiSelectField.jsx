"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const getNestedValue = (obj, path) => {
  if (!path) return undefined;

  return path
    .split(/[\.\[\]]/)
    .filter(Boolean)
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const SearchableMultiSelectField = ({
                                      label,
                                      field,
                                      options = [],
                                      required = true,
                                      formData,
                                      errors,
                                      updateFormData,
                                      placeholder = "Select...",
                                    }) => {
  const containerRef = useRef(null);

  const selectedValues = getNestedValue(formData, field) ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(opt.value)
  );

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    let updatedValues;

    if (selectedValues.includes(option.value)) {
      updatedValues = selectedValues.filter(
        (v) => v !== option.value
      );
    } else {
      updatedValues = [...selectedValues, option.value];
    }

    updateFormData(field, updatedValues);
  };

  return (
    <div className="mb-4 relative" ref={containerRef}>
      <label className="block text-sm font-medium text-blueSecondary">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      {/* Select Box */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`mt-2 flex min-h-12 w-full items-center justify-between rounded-md border bg-white p-3 text-sm transition-colors focus:ring-1 focus:ring-brand-500 ${
          getNestedValue(errors, field)
            ? "border-red-500"
            : "border-default"
        }`}
      >
        <span
          className={`flex flex-wrap gap-1 ${
            selectedOptions.length
              ? "text-blueSecondary"
              : "text-gray-400"
          }`}
        >
          {selectedOptions.length
            ? selectedOptions.map((opt) => opt.label).join(", ")
            : placeholder}
        </span>

        <ChevronDown className="h-5 w-5 text-gray-500" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-[9999] mt-1 rounded-md border bg-white p-3 shadow-lg"
          style={{
            width: containerRef.current
              ? containerRef.current.offsetWidth
              : "100%",
          }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`mb-2 flex h-10 w-full rounded-md border p-2 text-sm focus:ring-1 focus:ring-brand-500 ${
              getNestedValue(errors, field)
                ? "border-red-500"
                : "border-default"
            }`}
          />

          {/* Options */}
          <ul className="max-h-60 overflow-y-auto text-sm">
            {filteredOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className="mt-1 flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 hover:bg-brand-50"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(opt.value)}
                  readOnly
                />

                {opt.label}
              </li>
            ))}

            {!filteredOptions.length && (
              <div className="border-t mt-2 pt-2">
                <li className="px-3 py-2 text-gray-400">
                  No results found
                </li>
              </div>
            )}
          </ul>
        </div>
      )}

      {getNestedValue(errors, field) && (
        <p className="mt-1 text-xs text-red-600">
          {getNestedValue(errors, field)}
        </p>
      )}
    </div>
  );
};

export default SearchableMultiSelectField;