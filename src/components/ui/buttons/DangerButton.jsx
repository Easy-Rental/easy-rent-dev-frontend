mport React from "react";

const DangerButton = ({ onClick, disabled, text = "Delete", icon, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-500 transition-all hover:border-red-400 hover:bg-red-50 active:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default DangerButton;
