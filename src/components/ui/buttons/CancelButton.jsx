import React from "react";

const CancelButton = ({ onClick, disabled, text = "Cancel", icon, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default CancelButton;
