import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import hondaImg from "assets/img/auth/honda-auth-signin.jpg";
import routes from "routes.js";

const socials = [
  { icon: <FaInstagram className="h-4 w-4" />,  href: "https://instagram.com/jomdrivo",  label: "Instagram" },
  { icon: <FaFacebookF className="h-4 w-4" />,  href: "https://facebook.com/jomdrivo",   label: "Facebook"  },
  { icon: <FaWhatsapp  className="h-4 w-4" />,  href: "https://wa.me/60123456789",       label: "WhatsApp"  },
  { icon: <MdMailOutline className="h-4 w-4" />, href: "mailto:hello@jomdrivo.com",      label: "Email"     },
];

export default function Auth() {
  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return <Route path={prop.path} element={prop.component} key={key} />;
      }
      return null;
    });

  document.documentElement.dir = "ltr";

  return (
    <div className="flex min-h-screen bg-white">

      {/* ── Left — form panel ── */}
      <div className="flex w-full flex-col md:w-1/2">

        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-8 py-10 lg:px-14">
          <div className="w-full max-w-sm">
            <Routes>
              {getRoutes(routes)}
              <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
            </Routes>
          </div>
        </div>

      </div>

      {/* ── Right — image panel ── */}
      <div className="relative hidden md:sticky md:top-0 md:block md:h-screen md:w-1/2 bg-gray-900 shrink-0">
        <img
          src={hondaImg}
          alt="JomDrivo"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Bottom row — brand text left, socials right */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-10">

          {/* Brand text */}
          <div>
            <h2 className="text-3xl font-black leading-tight text-white">
              Malaysia's Premier<br />Car Rental Platform
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Thousands of vehicles. Flexible rentals. Zero hassle.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex flex-col items-center gap-3 pb-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
