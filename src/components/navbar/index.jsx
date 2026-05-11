import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdMenu,
  MdNotificationsNone,
  MdKeyboardArrowDown,
  MdPerson,
  MdSettings,
  MdLogout,
  MdDirectionsCar,
} from "react-icons/md";

const notifications = [
  { id: 1, icon: <MdDirectionsCar className="h-5 w-5 text-brand-500" />, title: "New booking received", desc: "Toyota Camry — 3 days rental", time: "2 min ago", unread: true },
  { id: 2, icon: <MdPerson className="h-5 w-5 text-green-500" />,        title: "New customer registered", desc: "Ahmad Faris created an account", time: "1 hr ago",  unread: true },
  { id: 3, icon: <MdDirectionsCar className="h-5 w-5 text-orange-400" />, title: "Car returned", desc: "Honda CR-V returned at KL outlet", time: "3 hr ago",  unread: false },
];

const Navbar = ({ onOpenSidenav, brandText }) => {
  const [showNotif, setShowNotif]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-100 bg-white px-4 md:px-6">

      {/* ── Left: hamburger + breadcrumb ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidenav}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 xl:hidden"
        >
          <MdMenu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs text-slate-400">Pages / <span className="text-slate-600">{brandText}</span></p>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">{brandText}</h1>
        </div>
      </div>

      {/* ── Right: search + notif + profile ── */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <MdNotificationsNone className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-slate-200/60">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="font-semibold text-slate-800">Notifications</p>
                <button className="text-xs font-medium text-brand-500 hover:underline">Mark all read</button>
              </div>
              <ul className="space-y-1">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`flex gap-3 rounded-xl p-3 transition-colors ${n.unread ? "bg-brand-50" : "hover:bg-slate-50"}`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                      <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                    </div>
                    <span className="shrink-0 text-[10px] text-slate-400 pt-0.5">{n.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-500">
              <MdPerson className="h-4 w-4" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">Admin</span>
            <MdKeyboardArrowDown className="h-4 w-4 text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60">
              <div className="mb-2 px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-400">admin@easyrent.my</p>
              </div>
              <ul className="space-y-0.5">
                <li>
                  <Link
                    to="/admin/profile"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <MdPerson className="h-4 w-4 text-slate-400" /> My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <MdSettings className="h-4 w-4 text-slate-400" /> Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/sign-in"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <MdLogout className="h-4 w-4" /> Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
