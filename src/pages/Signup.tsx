import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [status, setStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

<<<<<<< HEAD
      // SUCCESS → Redirect to verification page
      navigate("/verify-email?email=" + encodeURIComponent(form.email));
=======
      localStorage.setItem("pendingEmail", form.email);
      window.location.href = "/verify-email";
>>>>>>> 7659196798d5f464a73ec8e5435d83a0a2f00302

    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Signup failed");
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-10">
        <h1 className="text-2xl font-bold mb-2 text-slate-900">Sign up</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow border border-slate-200 space-y-4"
        >
          {/* NAME */}
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Name (optional)"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            required
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            required
            minLength={6}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />

          {/* PHONE (optional) */}
          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-xl"
          >
            {status === "sending" ? "Creating account..." : "Sign up"}
          </button>

          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        </form>
      </div>
    </Layout>
  );
}
