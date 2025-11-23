import React from "react";
import CookiePopup from "./CookiePopup";
import { Link } from "react-router-dom";



interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps>  = ({ children }) => {
  return (
    
  <div className="min-h-screen bg-slate-50">
     <header className="border-b bg-white px-6 py-4 shadow-sm">
  <div className="mx-auto flex max-w-5xl items-center justify-between">
    <Link
      to="/"
      className="text-xl font-semibold text-slate-800 hover:text-sky-600"
    >
      PDFConvert.tech
    </Link>

    <nav className="flex items-center gap-3 text-sm text-slate-700">
      <Link to="/blog" className="hover:text-sky-600">
        Blog
      </Link>
      <Link to="/faq" className="hover:text-sky-600">
        FAQ
      </Link>
      <Link to="/terms" className="hover:text-sky-600">
        Terms
      </Link>
      <Link to="/privacy" className="hover:text-sky-600">
        Privacy
      </Link>
    </nav>
  </div>
</header>



<CookiePopup />

      <main className="mx-auto max-w-5xl px-4 py-6">
        {children}
      </main>

      {/* FOOTER — always at bottom */}
      <footer className="mt-auto border-t bg-white py-4 text-center text-xs text-slate-500">
         © 2025 Nox — All rights reserved.
      </footer>
</div>


  );
};

export default Layout;
