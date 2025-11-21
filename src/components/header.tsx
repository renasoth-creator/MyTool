import React from "react";
import { useLocation, Link } from "react-router-dom";

interface HeaderProps {
  onLogout?: () => void;
  showAuthControls?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, showAuthControls }) => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={isLoginPage ? "/login" : "/"} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white font-bold">
            P
          </div>
          <span className="text-lg font-semibold tracking-tight">
            PDF Utility Hub
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Placeholder for future "Upgrade / Ads / Credits" */}
          <span className="hidden text-xs text-slate-500 sm:inline">
            100% free tools • No watermark
          </span>

          {showAuthControls && !isLoginPage && (
            <button
              onClick={onLogout}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
