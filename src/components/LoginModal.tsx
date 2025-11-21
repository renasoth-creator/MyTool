import React, { useState } from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {mode === "login" ? "Log in" : "Create account"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              We’ll use this later to track your conversions and limits.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-1 focus:ring-brand-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-1 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            {mode === "login" ? "Continue" : "Create account"}
          </button>

          <button
            type="button"
            onClick={() =>
              setMode((m) => (m === "login" ? "signup" : "login"))
            }
            className="mt-2 w-full text-center text-[11px] text-slate-500 hover:text-slate-700"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
