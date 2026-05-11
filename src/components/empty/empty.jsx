import React from "react";

const EmptyState = ({ icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
      {icon}
    </div>
    <p className="text-sm font-semibold text-slate-700">{title}</p>
    {description && <p className="mt-1 text-xs text-slate-400 max-w-xs">{description}</p>}
  </div>
);

export default EmptyState;
