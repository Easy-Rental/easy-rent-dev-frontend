/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiX } from "react-icons/hi";
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineBell,
  HiOutlineUser,
} from "react-icons/hi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const navLinks = [
  { name: "Home",          path: "/admin/default",       icon: <HiOutlineHome className="h-5 w-5" /> },
  { name: "Vehicles",      path: "/admin/fleet",          icon: <MdOutlineDirectionsCar className="h-5 w-5" /> },
  { name: "Bookings",      path: "/admin/bookings",       icon: <HiOutlineClipboardList className="h-5 w-5" /> },
  { name: "Favourites",    path: "/admin/favourites",     icon: <HiOutlineHeart className="h-5 w-5" /> },
  { name: "Recents",       path: "/admin/recents",        icon: <HiOutlineClock className="h-5 w-5" /> },
  { name: "Notifications", path: "/admin/notifications",  icon: <HiOutlineBell className="h-5 w-5" /> },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[160px] flex-col bg-white border-r border-gray-100 transition-transform duration-300 xl:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── Logo ── */}
        <div className="relative flex items-center justify-center py-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <MdOutlineDirectionsCar className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-gray-900">
              Jom<span className="text-brand-500">Drivo</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-lg p-1 text-gray-400 hover:bg-gray-100 xl:hidden"
          >
            <HiX className="h-4 w-4" />
          </button>
        </div>

        {/* ── Nav links ── */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5 px-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 transition-all border-l-2 ${
                      active
                        ? "border-brand-500 text-brand-600 font-semibold"
                        : "text-gray-500 font-medium hover:border-gray-300 hover:text-gray-900"
                    }`}
                  >
                    <span className={active ? "text-brand-500" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    <span className="text-xs">{item.name}</span>
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── User footer ── */}
        <div className="border-t border-gray-100 py-4">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <HiOutlineUser className="h-5 w-5 text-gray-400 shrink-0" />
            <span className="text-xs font-medium text-gray-600 truncate">Profile</span>
          </div>
          <Link
            to="/auth/sign-in"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <MdLogout className="h-5 w-5 shrink-0" />
            <span className="text-xs font-medium">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
