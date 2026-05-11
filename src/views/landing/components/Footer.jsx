import React from "react";
import { Link } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const footerLinks = [
  {
    title: "Navigation",
    links: ["Home", "About Us", "Our Fleet", "Services", "FAQ"],
  },
  {
    title: "Support Us",
    links: ["Contact Us", "Support Center", "Security", "Privacy and Policy"],
  },
  {
    title: "Partner",
    links: ["Our Partners", "Community", "Customers", "Investors"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-10 pt-12 pb-8">

        {/* ── Links row ── */}
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-4 pt-10 pb-10 border-b border-slate-700">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
                <MdDirectionsCar className="h-5 w-5 text-white"/>
              </div>
              <span className="text-base font-bold text-white">
                Jom<span className="text-brand-500">Drivo</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              We provide several vehicles such as sedans, SUVs, and MPVs that suit
              your personal or business needs across Malaysia.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-white">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm text-slate-400">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between pt-6">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} JomDrivo. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            {[
              { Icon: FaTwitter,  href: "https://twitter.com/jomdrivo"   },
              { Icon: FaYoutube,  href: "https://youtube.com/@jomdrivo"  },
              { Icon: FaFacebook, href: "https://facebook.com/jomdrivo"  },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-white hover:text-white transition-all">
                <Icon className="h-4 w-4"/>
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
