

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
        <div className="mx-auto max-w-6x1 px-4 py-10">{children}</div>
      </main>
      {/* <div id="container-e3c7de1a3d73afa16c42563899da41ee" className="my-10"></div> */}
      


      {/* FOOTER */}
     <footer className="border-t border-slate-200 bg-white/90">
       <div className="max-w-6xl mx-auto px-4 py-3 text-center text-xs text-slate-500">
         © 2025 Nox — All rights reserved.
       </div>
     </footer>


      {/* Cookie notice */}
      <CookiePopup />
      </div>
  );
};

export default Layout;
