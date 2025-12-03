import { useState } from "react";
import { BACKEND_URL } from "../config/backend";
import Layout from "../components/Layout";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  function update(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      localStorage.setItem("pendingEmail", form.email);
      window.location.href = "/verify-email";

    } catch (err: any) {
      setError(err.message);
    }

    setStatus("idle");
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Create Account</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 p-8 rounded-2xl shadow space-y-5"
        >
          <input
            type="text"
            placeholder="Name (optional)"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="email"
            required
            placeholder="Email address"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full"
          >
            {status === "sending" ? "Creating..." : "Sign Up"}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <p className="text-xs text-center text-slate-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#ff7a1a] font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </Layout>
  );
}
