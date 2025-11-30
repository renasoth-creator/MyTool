import React from "react";
import { Link, NavLink } from "react-router-dom";
import CookiePopup from "./CookiePopup";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-250">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff7a1a] text-white text-sm font-bold shadow">
              PDF
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              PDFConvert.tech
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="px-6 py-3 rounded-xl bg-[#F9F9F9] border border-slate-200 shadow-sm flex items-center gap-8 text-sm text-slate-700">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] transition ${
                  isActive ? "text-[#ff7a1a] font-semibold" : ""
                }`
              }
            >
              Tools
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] transition ${
                  isActive ? "text-[#ff7a1a] font-semibold" : ""
                }`
              }
            >
              FAQ
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] transition ${
                  isActive ? "text-[#ff7a1a] font-semibold" : ""
                }`
              }
            >
              Blog
            </NavLink>

            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] transition ${
                  isActive ? "text-[#ff7a1a] font-semibold" : ""
                }`
              }
            >
              Terms
            </NavLink>

            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `hover:text-[#ff7a1a] transition ${
                  isActive ? "text-[#ff7a1a] font-semibold" : ""
                }`
              }
            >
              Privacy
            </NavLink>
          </nav>

        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Cookies */}
      <CookiePopup />
    </div>
  );
};

export default Layout;
