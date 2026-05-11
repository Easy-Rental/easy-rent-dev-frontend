import React from "react";

const PageHeader = ({ title, subtitle, actions, className = "" }) => (
  <div className={`flex items-start justify-between gap-4 ${className}`}>
    <div>
      <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
      {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
    </div>
    {actions && <div className="flex-shrink-0">{actions}</div>}
  </div>
);

export default PageHeader;
