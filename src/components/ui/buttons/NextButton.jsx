mport React from "react";
import { MdArrowForward } from "react-icons/md";

const NextButton = ({ onClick, disabled, text = "Next", icon, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-brand-500 bg-white px-4 py-2.5 text-sm font-medium text-brand-500 transition-all hover:bg-brand-50 active:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {text}
      {icon ?? <MdArrowForward className="h-4 w-4" />}
    </button>
  );
};

export default NextButton;
