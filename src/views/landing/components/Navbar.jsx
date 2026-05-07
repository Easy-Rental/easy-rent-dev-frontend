import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose, MdDirectionsCar } from "react-icons/md";
import { navLinks } from "../data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md" : "bg-transparent"
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
            <MdDirectionsCar className="h-5 w-5 text-white"/>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Jom<span className="text-brand-500">Drivo</span>
          </span>
        </Link>

        {/* Nav links — plain text, no pill container */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={`#${l.href}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/admin/default"
            className="rounded-full border border-gray-900 px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
            Contact Us 
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MdClose className="h-6 w-6"/> : <MdMenu className="h-6 w-6"/>}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-2 space-y-1">
          {navLinks.map((l) => (
            <a key={l.label} href={`#${l.href}`} onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-500">{l.label}</a>
          ))}
          <Link to="/admin/default"
            className="mt-2 block rounded-full border border-gray-900 py-2.5 text-center text-sm font-semibold text-gray-900">
            Contact Us 
          </Link>
        </div>
      )}
    </header>
  );
}
