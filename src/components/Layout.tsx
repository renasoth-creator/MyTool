import React from "react";
import { Link, NavLink } from "react-router-dom";
import CookiePopup from "./CookiePopup";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-orange text-white text-xs font-bold shadow-sm">
              PDF
            </span>
            <span className="text-sm font-semibold text-primary-dark">
              PDFConvert.tech
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-primary-orange ${
                  isActive ? "text-primary-orange" : ""
                }`
              }
            >
              Tools
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `hover:text-primary-orange ${
                  isActive ? "text-primary-orange" : ""
                }`
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `hover:text-primary-orange ${
                  isActive ? "text-primary-orange" : ""
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `hover:text-primary-orange ${
                  isActive ? "text-primary-orange" : ""
                }`
              }
            >
              Terms
            </NavLink>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `hover:text-primary-orange ${
                  isActive ? "text-primary-orange" : ""
                }`
              }
            >
              Privacy
            </NavLink>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white py-4 text-center text-xs text-slate-500">
        © 2025 Nox — All rights reserved.
      </footer>

      {/* Cookies notice */}
      <CookiePopup />
    </div>
  );
};

export default Layout;
