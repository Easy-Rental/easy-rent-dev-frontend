import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiX,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineBell,
  HiOutlineUser,
  HiChevronDown,
} from "react-icons/hi";
import {
  MdOutlineDirectionsCar,
  MdLogout,
  MdPeople,
  MdBarChart,
  MdHandshake,
  MdBrandingWatermark,
  MdViewList,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { signOut, tokenStorage, userStorage } from "lib/authClient";
import { useAuth, ROLES } from "context/AuthContext";

const ALL = Object.values(ROLES);

const NAV = [
  {
    name: "Dashboard",
    path: "/admin/default",
    icon: <HiOutlineHome className="h-4 w-4" />,
    roles: ALL,
  },
  {
    name: "Vehicles",
    path: "/admin/fleet",
    icon: <MdOutlineDirectionsCar className="h-4 w-4" />,
    roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER],
    children: [
      { name: "All Vehicles", path: "/admin/fleet",     roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER] },
      { name: "Add Vehicle",  path: "/admin/fleet/add", roles: [ROLES.ADMIN] },
    ],
  },
  {
    name: "Bookings",
    path: "/admin/bookings",
    icon: <HiOutlineClipboardList className="h-4 w-4" />,
    roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.PARTNER],
    children: [
      { name: "All Bookings", path: "/admin/bookings",         roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER] },
      { name: "Pending",      path: "/admin/bookings/pending", roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.PARTNER] },
      { name: "History",      path: "/admin/bookings/history", roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.PARTNER] },
    ],
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <MdPeople className="h-4 w-4" />,
    roles: [ROLES.ADMIN],
    children: [
      { name: "All Users", path: "/admin/users",        roles: [ROLES.ADMIN] },
      { name: "Add User",  path: "/admin/users/create", roles: [ROLES.ADMIN] },
    ],
  },
  {
    name: "Managers",
    path: "/admin/managers",
    icon: <MdSupervisedUserCircle className="h-4 w-4" />,
    roles: [ROLES.ADMIN],
    children: [
      { name: "All Managers", path: "/admin/managers",        roles: [ROLES.ADMIN] },
      { name: "Add Manager",  path: "/admin/managers/create", roles: [ROLES.ADMIN] },
    ],
  },
  {
    name: "Partners",
    path: "/admin/partners",
    icon: <MdHandshake className="h-4 w-4" />,
    roles: [ROLES.ADMIN],
    children: [
      { name: "All Partners", path: "/admin/partners",        roles: [ROLES.ADMIN] },
      { name: "Add Partner",  path: "/admin/partners/create", roles: [ROLES.ADMIN] },
    ],
  },
  {
    name: "Brands",
    path: "/admin/brands",
    icon: <MdBrandingWatermark className="h-4 w-4" />,
    roles: [ROLES.ADMIN],
    children: [
      { name: "All Brands", path: "/admin/brands",        roles: [ROLES.ADMIN] },
      { name: "Add Brand",  path: "/admin/brands/create", roles: [ROLES.ADMIN] },
    ],
  },
  {
    name: "Models",
    path: "/admin/models",
    icon: <MdViewList className="h-4 w-4" />,
    roles: [ROLES.ADMIN],
    children: [
      { name: "All Models", path: "/admin/models",        roles: [ROLES.ADMIN] },
      { name: "Add Model",  path: "/admin/models/create", roles: [ROLES.ADMIN] },
    ],
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: <MdBarChart className="h-4 w-4" />,
    roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER],
  },
  {
    name: "Favourites",
    path: "/admin/favourites",
    icon: <HiOutlineHeart className="h-4 w-4" />,
    roles: [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.USER],
  },
  {
    name: "Recents",
    path: "/admin/recents",
    icon: <HiOutlineClock className="h-4 w-4" />,
    roles: ALL,
  },
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: <HiOutlineBell className="h-4 w-4" />,
    roles: ALL,
  },
];

export default function Sidebar({ open, onClose }) {
  const { role } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();

  const [expanded, setExpanded] = useState(new Set());

  // Auto-expand the section whose child is currently active
  useEffect(() => {
    const auto = new Set();
    NAV.forEach((link) => {
      if (link.children?.some((c) => location.pathname.startsWith(c.path))) {
        auto.add(link.name);
      }
    });
    setExpanded(auto);
  }, [location.pathname]);

  const canSee      = (roles)  => roles.includes(role);
  const isActive    = (path)   => location.pathname === path;
  const isUnder     = (link)   =>
    location.pathname.startsWith(link.path) ||
    link.children?.some((c) => location.pathname.startsWith(c.path));

  const toggle = (name) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  const handleLogout = async () => {
    await signOut();
    tokenStorage.clear();
    userStorage.clear();
    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[160px] flex-col bg-white border-r border-slate-100 transition-transform duration-300 xl:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── Logo ── */}
        <div className="relative flex items-center justify-center py-5 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
              <MdOutlineDirectionsCar className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-900">
              Jom<span className="text-brand-500">Drivo</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="absolute right-2 top-3 rounded-lg p-1 text-slate-400 hover:bg-slate-100 xl:hidden"
          >
            <HiX className="h-4 w-4" />
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-0.5 px-2">
            {NAV.filter((link) => canSee(link.roles)).map((link) => {
              const hasChildren     = !!link.children?.length;
              const visibleChildren = hasChildren
                ? link.children.filter((c) => canSee(c.roles))
                : [];
              const parentActive    = isUnder(link);
              const isOpen          = expanded.has(link.name);

              return (
                <li key={link.name}>
                  {/* Parent row — button if has children, link otherwise */}
                  {hasChildren ? (
                    <button
                      onClick={() => toggle(link.name)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-all duration-200 ${
                        parentActive
                          ? "bg-brand-50 text-brand-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className={parentActive ? "text-brand-500" : "text-slate-400"}>
                        {link.icon}
                      </span>
                      <span className="flex-1 text-xs font-medium leading-none">
                        {link.name}
                      </span>
                      <HiChevronDown
                        className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        } ${parentActive ? "text-brand-400" : "text-slate-300"}`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 ${
                        parentActive
                          ? "bg-brand-50 text-brand-600 font-semibold"
                          : "text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className={parentActive ? "text-brand-500" : "text-slate-400"}>
                        {link.icon}
                      </span>
                      <span className="text-xs">{link.name}</span>
                    </Link>
                  )}

                  {/* Children — grid 0fr→1fr for smooth height animation */}
                  {hasChildren && visibleChildren.length > 0 && (
                    <div
                      className="grid transition-all duration-200 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <ul className="mt-0.5 ml-3 space-y-0.5 border-l border-slate-100 pl-2 pb-0.5">
                          {visibleChildren.map((child) => {
                            const childActive = isActive(child.path);
                            return (
                              <li key={child.name}>
                                <Link
                                  to={child.path}
                                  onClick={onClose}
                                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all duration-200 ${
                                    childActive
                                      ? "text-brand-600 font-semibold"
                                      : "text-slate-400 hover:text-slate-700"
                                  }`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                                      childActive ? "bg-brand-500" : "bg-slate-300"
                                    }`}
                                  />
                                  {child.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Footer ── */}
        <div className="border-t border-slate-100 p-2 space-y-0.5">
          <Link
            to="/admin/profile"
            onClick={onClose}
            className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 ${
              location.pathname.startsWith("/admin/profile")
                ? "bg-brand-50 text-brand-600 font-semibold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <HiOutlineUser
              className={`h-4 w-4 shrink-0 ${
                location.pathname.startsWith("/admin/profile")
                  ? "text-brand-500"
                  : "text-slate-400"
              }`}
            />
            <span className="text-xs font-medium">Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
          >
            <MdLogout className="h-4 w-4 shrink-0" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
