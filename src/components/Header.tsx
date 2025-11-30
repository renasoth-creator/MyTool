import { Link, NavLink } from "react-router-dom";
import OrbitGlow from "./OrbitGlow";

export default function Header() {
  return (
    <header className="relative w-full bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* --- Animated Glow Layer --- */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <OrbitGlow />
      </div>

      {/* --- MAIN HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">

        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-2 relative">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#ff7a1a] text-white font-bold text-lg shadow-xl relative">
            PDF
          </div>
          <span className="text-lg font-semibold text-slate-900">
            PDFConvert.tech
          </span>
        </Link>

        {/* CENTER — NAVIGATION */}
        <nav className="flex items-center gap-3">
          <NavItem to="/" label="All Tools" />
          <NavItem to="/pdf-docx" label="Convert" />
          <NavItem to="/merge" label="Merge" />
          <NavItem to="/split" label="Split" />
          <NavItem to="/protect-pdf" label="Protect" />
          <NavItem to="/compress" label="Compress" />
        </nav>

        {/* RIGHT — AUTH */}
        <div className="flex items-center gap-4 text-sm">
          <button className="text-slate-600 hover:text-[#ff7a1a] transition font-medium">
            Sign In
          </button>

          <button className="px-5 py-2 rounded-full bg-[#ff7a1a] text-white font-semibold hover:bg-[#e66d10] transition shadow">
            Sign Up
          </button>
        </div>

      </div>
    </header>
  );
}

/* ---------------------------------------------
   Reusable Stylish Nav Button Component
---------------------------------------------- */

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        px-4 py-2 rounded-xl text-sm font-medium transition-all
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
