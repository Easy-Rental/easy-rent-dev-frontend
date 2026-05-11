import React from "react";
import { MdArrowBack } from "react-icons/md";

const PrevButton = ({ onClick, disabled, text = "Back", icon, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon ?? <MdArrowBack className="h-4 w-4" />}
      {text}
    </button>
  );
};

export default PrevButton;
