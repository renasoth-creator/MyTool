import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { apiFetch } from "../config/backend";
import { Helmet } from "react-helmet";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await apiFetch(`/auth/signup`, {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      const message = data?.error || (res.ok ? null : "Signup failed");
      if (!res.ok) {
        setStatus("error");
        setError(message);
        return;
      }

      navigate("/verify-email?email=" + encodeURIComponent(form.email));
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Signup failed");
    }
  }

  return (
    <Layout>
      <Helmet>
        <title>Create Account – PDFConvert.tech</title>
        <meta name="description" content="Sign up for PDFConvert.tech and start using our free PDF tools." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl w-full">

          {/* Left Column - Benefits */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of users who trust PDFConvert.tech for fast, secure, and free PDF conversion and management.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-600">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">No Credit Card Required</h3>
                  <p className="text-gray-600 text-sm">Start using all our tools immediately without any payment information.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">100% Free</h3>
                  <p className="text-gray-600 text-sm">Access all premium features at no cost. No hidden charges or surprise fees.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">256-Bit Encryption</h3>
                  <p className="text-gray-600 text-sm">Your data is protected with bank-level security and automatic deletion.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">20+ Tools Available</h3>
                  <p className="text-gray-600 text-sm">Merge, split, compress, convert, and manage PDFs with powerful tools.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex items-center">
            <div className="w-full bg-white rounded-3xl border border-orange-100 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Started</h2>
              <p className="text-gray-600 text-sm mb-8">Join us in seconds and start converting PDFs.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Full Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
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
                    minLength={6}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-2">Use at least 6 characters for security.</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Phone Number <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
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
                  {status === "sending" ? "Creating Account..." : "Create Account"}
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-600 text-center">
                  By signing up, you agree to our{" "}
                  <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-semibold">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-semibold">
                    Privacy Policy
                  </Link>
                </p>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-orange-600 hover:text-orange-700 font-bold">
                    Sign In
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
