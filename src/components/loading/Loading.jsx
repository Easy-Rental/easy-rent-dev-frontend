import React from "react";

const Loading = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-brand-500 animate-spin" />
    {text && <p className="mt-3 text-sm text-slate-500">{text}</p>}
  </div>
);

export default Loading;
