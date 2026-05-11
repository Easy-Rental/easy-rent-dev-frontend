import React from "react";

const IconButton = ({
  onClick,
  disabled,
  icon,
  bgColor = "bg-white",
  textColor = "text-brand-500",
  borderColor = "border-brand-500",
  hoverTextColor = "hover:text-brand-400",
  hoverBorderColor = "hover:border-brand-600",
  text,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50
        ${bgColor} ${textColor} ${borderColor} ${hoverTextColor} ${hoverBorderColor} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default IconButton;
