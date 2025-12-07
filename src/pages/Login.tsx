import { useState } from "react";
import { BACKEND_URL } from "../config/backend";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function update(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

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
    }
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

        <form
          onSubmit={handleLogin}
          className="bg-white border border-slate-200 p-8 rounded-2xl shadow space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button className="btn-primary w-full">Login</button>

          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* ➤ Forgot Password */}
          <p className="text-center text-sm mt-4">
            <a
              href="/forgot-password"
              className="text-[#ff7a1a] hover:underline font-medium"
            >
              Forgot your password?
            </a>
          </p>

          

          {/* Sign Up Link */}
          <p className="text-xs text-center text-slate-600 mt-4">
            No account?{" "}
            <a href="/signup" className="text-[#ff7a1a] font-medium">
              Create one
            </a>
          </p>
        </form>
      </div>
    </Layout>
  );
}
