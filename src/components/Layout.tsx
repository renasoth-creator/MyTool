import React from "react";
import { Link, NavLink } from "react-router-dom";
import CookiePopup from "./CookiePopup";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
          {/* Logo / brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff7a1a] text-white text-sm font-bold shadow">
              PDF
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              PDFConvert.tech
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-9 text-xs md:text-sm text-slate-600">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] ${isActive ? "text-[#ff7a1a]" : ""}`
              }
            >
              Tools
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] ${isActive ? "text-[#ff7a1a]" : ""}`
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] ${isActive ? "text-[#ff7a1a]" : ""}`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] ${isActive ? "text-[#ff7a1a]" : ""}`
              }
            >
              Terms
            </NavLink>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] ${isActive ? "text-[#ff7a1a]" : ""}`
              }
            >
              Privacy
            </NavLink>
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6x1 px-4 py-10">{children}</div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-3 text-center text-xs text-slate-500"></div>
          <div className="min-h-screen flex flex-col bg-white">
          © 2025 Nox All rights reserved.
        </div>
      </footer>

      {/* Cookie notice */}
      <CookiePopup />
      </div>
  );
};

export default Layout;
