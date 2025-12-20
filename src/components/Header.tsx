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
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
          <NavItem to="/pdf-editor" label="Edit PDF" />
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
          <MobileNavLink to="/pdf-editor" label="Edit PDF" />

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
      onClick={() => window.scrollTo(0, 0)}
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
      onClick={() => window.scrollTo(0, 0)}
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

  const categories = [
    {
      title: "PDF to Office Documents",
      icon: "",
      tools: [
        { label: "PDF → Word", route: "/pdf-docx" },
        { label: "PDF → Excel", route: "/pdf-to-excel" },
        { label: "PDF → PowerPoint", route: "/pdf-to-pptx" },
        { label: "PDF → HTML", route: "/pdf/to-html" },
      ]
    },
    {
      title: "Office Documents to PDF",
      icon: "",
      tools: [
        { label: "Word → PDF", route: "/docx-pdf" },
        { label: "Excel → PDF", route: "/xlsx-pdf" },
        { label: "PowerPoint → PDF", route: "/pptx-pdf" },
        { label: "HTML → PDF", route: "/html-to-pdf" },
      ]
    },
    {
      title: "Images to Media",
      icon: "",
      tools: [
        { label: "Image → PDF", route: "/image-to-pdf" },
        { label: "PDF → Images", route: "/pdf-to-images" },
        { label: "Extract Images", route: "/extract-images" },
      ]
    },
    {
      title: "Text to Data",
      icon: "",
      tools: [
        { label: "PDF → Text", route: "/pdf-to-text" },
        { label: "PDF OCR (Scan to Text)", route: "/pdf-ocr" },
        { label: "PDF Spreadsheet", route: "/pdf-spreadsheet" },
      ]
    }
  ];

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="
          px-4 py-2 rounded-xl text-sm font-medium
          bg-white border border-slate-200 hover:bg-slate-100
          transition-all duration-200
        "
      >
        Convert {open ? "▲" : "▾"}
      </button>

      {open && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 mt-3 w-[640px] max-h-[550px] overflow-y-auto
            bg-gradient-to-b from-white via-white to-slate-50
            backdrop-blur-xl
            border border-slate-200/50 shadow-2xl rounded-3xl p-6 z-50
            animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-500
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/5 before:via-transparent before:to-blue-500/5 before:rounded-3xl before:pointer-events-none
          "
        >
          {/* Header with gradient text */}
          <div className="mb-6 relative">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Conversion Tools
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 font-medium">Explore 20+ powerful conversion options</p>
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </div>

          {/* Grid Layout with card style */}
          <div className="grid grid-cols-2 gap-5 mt-8">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="
                  p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50
                  border border-slate-200/50 hover:border-orange-300/50
                  hover:bg-gradient-to-br hover:from-orange-50 hover:to-slate-100
                  transition-all duration-300 ease-out
                  animate-in fade-in slide-in-from-top duration-500
                "
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl">{category.icon}</div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-2 pl-8">
                  {category.tools.map((tool, i) => (
                    <MegaLink key={i} to={tool.route} label={tool.label} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Divider with gradient */}
          <div className="mt-6 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Footer CTA with glow effect */}
          <div className="flex items-center justify-between animate-in fade-in slide-in-from-top duration-500" style={{ animationDelay: "320ms" }}>
            <p className="text-xs text-slate-500">Need more tools?</p>
            <Link
              to="/all-tools"
              onClick={() => window.scrollTo(0, 0)}
              className="
                inline-flex items-center gap-2 px-4 py-2 rounded-xl
                bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white
                text-xs font-bold shadow-lg shadow-orange-500/30
                hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105
                hover:from-orange-600 hover:via-orange-600 hover:to-orange-700
                transition-all duration-300
                relative overflow-hidden
              "
            >
              <span className="relative z-10">View All Tools</span>
              <span className="relative z-10">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
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
      onClick={() => window.scrollTo(0, 0)}
      className="
        block w-full px-3 py-2 rounded-lg text-xs font-semibold
        text-slate-700 bg-white/50
        border border-transparent hover:border-orange-300/50
        hover:bg-gradient-to-r hover:from-orange-100/80 hover:to-orange-50/80
        hover:text-orange-600 hover:shadow-md
        transition-all duration-300 ease-out
        relative overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 to-orange-300/0 hover:from-orange-400/10 hover:to-orange-300/10 rounded-lg transition-all duration-300"></div>
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
