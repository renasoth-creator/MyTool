// src/components/Header.tsx

import { Link, NavLink } from "react-router-dom";
import OrbitCircles from "./OrbitCircles";

export default function Header() {
  return (
    <header className="w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        
        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#ff7a1a] text-white font-bold text-lg shadow">
            PDF
          </div>
          <span className="text-lg font-semibold text-slate-900">
            PDFConvert.tech
          </span>
        </Link>

        {/* CENTER — NAVIGATION */}
        <nav className="flex items-center gap-3">
          
          <MenuLink to="/" label="All Tools" />
          <MenuLink to="/pdf-docx" label="Convert" />
          <MenuLink to="/merge" label="Merge" />
          <MenuLink to="/split" label="Split" />
          <MenuLink to="/protect-pdf" label="Protect" />
          <MenuLink to="/compress" label="Compress" />

        </nav>

        {/* RIGHT — AUTH */}
        <div className="flex items-center gap-4 text-sm">
          <button className="text-slate-700 hover:text-[#ff7a1a] transition font-medium">
            Sign In
          </button>

          <button className="px-5 py-2 rounded-full bg-[#ff7a1a] text-white font-semibold hover:bg-[#e76a12] transition">
            Sign Up
          </button>
        </div>

      </div>


    </header>
  );
}


/* ---------------------------------------------
   Reusable Premium Menu Button Component
---------------------------------------------- */

function MenuLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        relative px-4 py-2 rounded-xl font-medium text-sm transition

        ${isActive
          ? "text-[#ff7a1a] bg-orange-50 border border-orange-300 shadow-sm"
          : "text-slate-700 bg-white hover:bg-slate-100 border border-slate-200"}
        `
      }
    >
      {label}
    </NavLink>
  );
}
