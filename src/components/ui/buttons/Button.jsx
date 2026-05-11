import React from "react";

const variants = {
  primary:   "bg-brand-500 text-white border-brand-500 hover:bg-brand-600 hover:border-brand-600 active:bg-brand-700",
  secondary: "bg-white text-brand-500 border-brand-500 hover:bg-brand-50",
  ghost:     "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50",
  danger:    "bg-white text-red-500 border-red-300 hover:bg-red-50 hover:border-red-400",
};

const Button = ({
  onClick,
  disabled,
  icon,
  text,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
