// src/components/Header.tsx

import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LogoSplitAnimate from "./LogoSplitAnimate";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-lg border-b border-orange-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <LogoSplitAnimate />
          <span className="text-lg font-bold text-slate-900 hidden sm:inline">
            PDFConvert<span className="text-orange-500">.tech</span>
          </span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="sm:hidden text-3xl text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden sm:flex items-center gap-3">
          <NavItem to="/" label="All Tools" />
          <ConvertDropdown />
          <NavItem to="/merge" label="Merge" />
          <NavItem to="/split" label="Split" />
          <NavItem to="/protect-pdf" label="Protect" />
          <NavItem to="/compress" label="Compress" />
        </nav>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden sm:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 font-medium"
              >
                Dashboard
              </Link>

              <Link
                to="/account"
                className="text-slate-700 hover:text-[#ff7a1a] font-medium"
              >
                Account
              </Link>

              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-500 font-medium"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#ff7a1a] text-slate-700">
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ============================
          MOBILE NAVIGATION DROPDOWN
      ============================ */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-md">

          <MobileNavLink to="/" label="All Tools" />
          <MobileNavLink to="/merge" label="Merge" />
          <MobileNavLink to="/split" label="Split" />
          <MobileNavLink to="/protect-pdf" label="Protect" />
          <MobileNavLink to="/compress" label="Compress" />

          {/* MOBILE TOOLS CATEGORY */}
          <details className="bg-white border rounded-lg p-3">
            <summary className="cursor-pointer font-medium">Convert Tools</summary>
            <div className="mt-2 space-y-2 pl-2">
              <MobileNavLink to="/pdf-docx" label="PDF → DOCX" />
              <MobileNavLink to="/pdf-to-excel" label="PDF → Excel" />
              <MobileNavLink to="/pdf-to-pptx" label="PDF → PowerPoint" />
              <MobileNavLink to="/docx-pdf" label="DOCX → PDF" />
              <MobileNavLink to="/xlsx-pdf" label="Excel → PDF" />
              <MobileNavLink to="/pptx-pdf" label="PowerPoint → PDF" />
              <MobileNavLink to="/image-to-pdf" label="Image → PDF" />
              <MobileNavLink to="/pdf-to-images" label="PDF → Image" />
            </div>
          </details>

          {/* AUTH SECTION (MOBILE) */}
          <div className="pt-2 border-t border-slate-200">
            {user ? (
              <>
                <MobileNavLink to="/dashboard" label="Dashboard" />
                <MobileNavLink to="/account" label="Account" />

                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 font-medium py-2"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" label="Sign In" />
                <MobileNavLink to="/signup" label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------
   MOBILE NAV ITEM
---------------------------------------------- */
function MobileNavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="block w-full py-2 text-slate-700 font-medium hover:text-[#ff7a1a]"
    >
      {label}
    </Link>
  );
}

/* ---------------------------------------------
   DESKTOP NAV ITEM
---------------------------------------------- */
function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
          px-4 py-2 rounded-xl text-sm font-medium transition-all
          ${
            isActive
              ? "text-[#ff7a1a] bg-orange-50 border border-orange-300 shadow-sm"
              : "text-slate-700 bg-white hover:bg-slate-100 border border-slate-200"
          }
        `
      }
    >
      {label}
    </NavLink>
  );
}

/* ---------------------------------------------
   DESKTOP MEGA MENU (unchanged, but mobile-hidden)
---------------------------------------------- */

function ConvertDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="
          px-4 py-2 rounded-xl text-sm font-medium
          bg-white border border-slate-200 hover:bg-slate-100
        "
      >
        Convert ▾
      </button>

      {open && (
        <div
          className="
            absolute left-0 mt-3 w-[650px]
            grid grid-cols-3 gap-6
            bg-white/90 backdrop-blur-xl 
            border border-slate-200 shadow-2xl rounded-2xl p-6 z-50
          "
        >
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-[#ff7a1a] mb-3">PDF → Office</h3>
            <MegaLink to="/pdf-docx" label="PDF → DOCX" />
            <MegaLink to="/pdf-to-excel" label="PDF → Excel" />
            <MegaLink to="/pdf-to-pptx" label="PDF → PowerPoint" />
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-[#ff7a1a] mb-3">Office → PDF</h3>
            <MegaLink to="/docx-pdf" label="DOCX → PDF" />
            <MegaLink to="/xlsx-pdf" label="Excel → PDF" />
            <MegaLink to="/pptx-pdf" label="PowerPoint → PDF" />
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold text-[#ff7a1a] mb-3">Images & Other</h3>
            <MegaLink to="/image-to-pdf" label="Image → PDF" />
            <MegaLink to="/pdf-to-images" label="PDF → Image" />
          </div>
        </div>
      )}
    </div>
  );
}

function MegaLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="
        block w-full px-3 py-2 rounded-lg text-sm font-medium 
        bg-white border border-slate-200
        hover:bg-orange-50 hover:border-orange-300 hover:text-[#ff7a1a]
        transition shadow-sm
      "
    >
      {label}
    </Link>
  );
}
