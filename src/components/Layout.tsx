import React from "react";
import CookiePopup from "./CookiePopup";


interface LayoutProps {
  children: React.ReactNode;
}
<CookiePopup />

const Layout: React.FC<LayoutProps>  = ({ children }) => {
  return (
    
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-bold text-slate-800">
            PDF Utility Hub
          </h1>
        </div>
        
      </header>


      <footer className="mt-12 pb-8 text-center text-xs text-slate-400">
         © 2025 Nox — All rights reserved.
      </footer>


      <main className="mx-auto max-w-5xl px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
