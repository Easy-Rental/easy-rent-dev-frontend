import React from "react";
import { MdAssignment } from "react-icons/md";

export default function Bookings() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-900">Bookings</h2>
        <p className="text-sm text-slate-400">Manage all vehicle rental bookings</p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
          <MdAssignment className="h-7 w-7 text-brand-500" />
        </div>
        <p className="mt-4 font-semibold text-slate-500">Bookings — Coming Soon</p>
        <p className="mt-1 text-sm text-slate-300">This module is under development</p>
      </div>
    </div>
  );
}
