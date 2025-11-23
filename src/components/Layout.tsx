import React from "react";
import CookiePopup from "./CookiePopup";
import { Link } from "react-router-dom";



interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps>  = ({ children }) => {
  return (
    
  <div className="min-h-screen bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
         {/* Left side - Logo */}
          <div className="text-lg font-bold text-slate-800">
              PDFConvert.tech
          </div>

        {/* Middle spacer */}  
        <div className="flex-1"></div>

        {/* Terms button (between middle and right) */}
       <div className="mr-10">
         <Link
          to="/terms"
           className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
      >
              Terms of Use
         </Link>
      </div>
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
