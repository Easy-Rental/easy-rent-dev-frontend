import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MdMenu,
  MdClose,
  MdDirectionsCar,
  MdKeyboardArrowDown,
} from "react-icons/md";

const FLEET_ITEMS = [
  { label: "Sedan",  sub: "Proton Saga · S70 · Persona",  href: "#fleet" },
  { label: "SUV",    sub: "Proton X50 · X70 · X90",       href: "#fleet" },
  { label: "MPV",    sub: "Proton Exora",                  href: "#fleet" },
  { label: "Hatch",  sub: "Proton Iriz",                   href: "#fleet" },
];

const NAV_LINKS = [
  { label: "Home",      href: "#"        },
  { label: "Our Fleet", href: "#fleet",  hasDropdown: true },
  { label: "Services",  href: "#services" },
  { label: "About Us",  href: "#about"   },
];

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [fleetOpen,   setFleetOpen]   = useState(false);
  const [mobileFleet, setMobileFleet] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const fleetRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (fleetRef.current && !fleetRef.current.contains(e.target))
        setFleetOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // transparent = over hero video; solid = scrolled past hero or mobile menu open
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 animate-slide-down transition-all duration-300 ${
        solid ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* ── Main bar ── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500">
            <MdDirectionsCar className="h-5 w-5 text-white" />
          </div>
          <span
            className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
              solid ? "text-gray-900" : "text-white"
            }`}
          >
            Jom<span className="text-brand-500">Drivo</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} ref={fleetRef} className="relative">
                <button
                  onClick={() => setFleetOpen((v) => !v)}
                  className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    solid
                      ? fleetOpen
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      : fleetOpen
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                  <MdKeyboardArrowDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      fleetOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute left-0 top-full mt-1 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-200 ${
                    fleetOpen
                      ? "translate-y-0 opacity-100 pointer-events-auto"
                      : "-translate-y-2 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-2">
                    {FLEET_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setFleetOpen(false)}
                        className="flex flex-col rounded-lg px-4 py-3 transition-colors duration-150 hover:bg-brand-50"
                      >
                        <span className="text-sm font-semibold text-gray-900">
                          {item.label}
                        </span>
                        <span className="mt-0.5 text-xs text-gray-400">
                          {item.sub}
                        </span>
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 px-4 py-3">
                    <a
                      href="#fleet"
                      onClick={() => setFleetOpen(false)}
                      className="text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                    >
                      View all vehicles →
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  solid
                    ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/auth/sign-in"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              solid
                ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/auth/sign-in"
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition-all duration-200 hover:bg-brand-600 hover:shadow-brand-500/40"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`md:hidden rounded-lg p-2 transition-colors duration-200 ${
            solid
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {menuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile menu — grid 0fr→1fr ── */}
      <div
        className="grid md:hidden transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="space-y-0.5 border-t border-gray-100 bg-white px-6 pb-5 pt-3">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileFleet((v) => !v)}
                    className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-gray-700"
                  >
                    {link.label}
                    <MdKeyboardArrowDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                        mobileFleet ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className="grid transition-all duration-200 ease-in-out"
                    style={{ gridTemplateRows: mobileFleet ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-100 pl-4 pb-1">
                        {FLEET_ITEMS.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => { setMenuOpen(false); setMobileFleet(false); }}
                            className="block py-2 text-sm text-gray-500 hover:text-brand-600 transition-colors"
                          >
                            {item.label}
                            <span className="ml-2 text-xs text-gray-400">{item.sub}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}

            <div className="space-y-2 pt-4">
              <Link
                to="/auth/sign-in"
                onClick={() => setMenuOpen(false)}
                className="block rounded-full border border-gray-200 py-2.5 text-center text-sm font-semibold text-gray-700 transition-all hover:border-brand-300 hover:text-brand-600"
              >
                Sign In
              </Link>
              <Link
                to="/auth/sign-in"
                onClick={() => setMenuOpen(false)}
                className="block rounded-full bg-brand-500 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-brand-600"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
