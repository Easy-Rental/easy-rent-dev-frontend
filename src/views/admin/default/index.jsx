import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineDirectionsCar,
  MdPeople,
  MdHandshake,
  MdAssignment,
  MdArrowForward,
  MdTrendingUp,
  MdCheckCircle,
  MdSchedule,
} from "react-icons/md";

/* ─── Stat card ──────────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, accent = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-5 py-5 shadow-sm flex-1 min-w-0 text-left hover:shadow-md hover:border-brand-100 transition-all group"
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ? "bg-brand-500" : "bg-brand-50 border border-brand-100"}`}>
      <Icon size={20} className={accent ? "text-white" : "text-brand-500"} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-2xl font-extrabold tabular-nums leading-none text-slate-900">{value}</p>
      <p className="text-xs text-slate-400 mt-1 font-medium">{label}</p>
      {sub && <p className="text-[11px] text-brand-500 mt-0.5 font-medium">{sub}</p>}
    </div>
    <MdArrowForward size={15} className="text-slate-300 group-hover:text-brand-400 flex-shrink-0 transition-colors" />
  </button>
);

/* ─── Quick action card ──────────────────────────────────────────────────── */
const ActionCard = ({ icon: Icon, title, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-4 shadow-sm text-left hover:shadow-md hover:border-brand-100 transition-all group w-full"
  >
    <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
      <Icon size={17} className="text-brand-500" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
  </button>
);

/* ─── Recent activity row ────────────────────────────────────────────────── */
const ActivityRow = ({ icon: Icon, iconBg, text, time }) => (
  <div className="flex items-center gap-3 py-2.5">
    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon size={13} className="text-white" />
    </div>
    <p className="text-sm text-slate-600 flex-1">{text}</p>
    <span className="text-xs text-slate-400 whitespace-nowrap">{time}</span>
  </div>
);

/* ─── Dashboard ──────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Welcome banner */}
      <div className="bg-brand-500 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-white leading-tight">Welcome back 👋</h1>
          <p className="text-brand-100 text-sm mt-1">Here's what's happening with JomDrivo today.</p>
        </div>
        <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 items-center justify-center">
          <MdOutlineDirectionsCar size={28} className="text-white" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={MdOutlineDirectionsCar}
          label="Total Vehicles"
          value="0"
          sub="Manage fleet →"
          accent
          onClick={() => navigate("/admin/fleet")}
        />
        <StatCard
          icon={MdAssignment}
          label="Total Bookings"
          value="0"
          sub="View bookings →"
          onClick={() => navigate("/admin/bookings")}
        />
        <StatCard
          icon={MdHandshake}
          label="Partners"
          value="0"
          sub="View partners →"
          onClick={() => navigate("/admin/partners")}
        />
        <StatCard
          icon={MdPeople}
          label="Staff Users"
          value="0"
          sub="View users →"
          onClick={() => navigate("/admin/users")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Quick actions */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-sm font-bold text-slate-900 mb-4">Quick Actions</p>
          <div className="space-y-2">
            <ActionCard
              icon={MdOutlineDirectionsCar}
              title="Add Vehicle"
              description="Register a new vehicle to the fleet"
              onClick={() => navigate("/admin/fleet/add")}
            />
            <ActionCard
              icon={MdHandshake}
              title="Add Partner"
              description="Onboard a new fleet or individual owner"
              onClick={() => navigate("/admin/partners/create")}
            />
            <ActionCard
              icon={MdPeople}
              title="Add Staff User"
              description="Create an admin or account manager"
              onClick={() => navigate("/admin/users/create")}
            />
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-900">Recent Activity</p>
            <span className="text-xs text-slate-400">Today</span>
          </div>

          <div className="divide-y divide-slate-50">
            <ActivityRow
              icon={MdTrendingUp}
              iconBg="bg-brand-500"
              text="Platform is live and ready for operations."
              time="Now"
            />
            <ActivityRow
              icon={MdCheckCircle}
              iconBg="bg-green-500"
              text="Users and Partners modules are set up."
              time="Today"
            />
            <ActivityRow
              icon={MdSchedule}
              iconBg="bg-slate-400"
              text="Fleet and Bookings modules coming soon."
              time="Pending"
            />
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-center">
            <p className="text-xs text-slate-400">Booking and fleet activity will appear here once data is connected.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
