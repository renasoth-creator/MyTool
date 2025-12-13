import { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const { } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  function update(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.requires2FA) {
        localStorage.setItem("2fa_email", form.email);
        window.location.href = "/verify-2fa?email=" + form.email;
        return;
      }

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <Layout>
      <Helmet>
        <title>Sign In – PDFConvert.tech</title>
        <meta name="description" content="Sign in to your PDFConvert.tech account and access your tools." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl w-full">

          {/* Left Column - Benefits */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Sign in to access your conversion history, saved preferences, and all your PDF tools.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-bold text-slate-900 mb-2">Conversion History</h3>
                <p className="text-gray-600 text-sm">Access all your previous conversions and track your usage.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="font-bold text-slate-900 mb-2">Saved Preferences</h3>
                <p className="text-gray-600 text-sm">Your settings and preferences are saved for faster workflows.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-slate-900 mb-2">Premium Features</h3>
                <p className="text-gray-600 text-sm">Unlock additional benefits and priority support access.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex items-center">
            <div className="w-full bg-white rounded-3xl border border-orange-100 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
              <p className="text-gray-600 text-sm mb-8">Access your account and continue converting.</p>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                >
                  {status === "sending" ? "Signing In..." : "Sign In"}
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-bold">
                    Create One
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

