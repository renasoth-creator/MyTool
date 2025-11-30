// src/components/Layout.tsx

import React from "react";
import { Link, NavLink } from "react-router-dom";
import CookiePopup from "./CookiePopup";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* NEW HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl py-10">{children}</div>
      </main>

      {/* NEW FOOTER */}
      <Footer />

      {/* COOKIE POPUP */}
      <CookiePopup />
    </div>
  );
};

export default Layout;
