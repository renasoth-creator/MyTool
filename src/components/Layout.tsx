// src/components/Layout.tsx

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookiePopup from "./CookiePopup";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      {/* PAGE CONTENT */}
      <main className="flex-1 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl py-6 sm:py-10">
          {children}
        </div>
      </main>

      <Footer />
      <CookiePopup />
    </div>
  );
}
