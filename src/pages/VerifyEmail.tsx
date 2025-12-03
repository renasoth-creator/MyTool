import { useState } from "react";
import { BACKEND_URL } from "../config/backend";
import Layout from "../components/Layout";

export default function VerifyEmail() {
  const email = localStorage.getItem("pendingEmail");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${BACKEND_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Invalid code");
      return;
    }

    // login automatically
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Verify Email</h1>
        <p className="text-sm text-slate-600 mb-6">
          We sent a 6-digit code to <strong>{email}</strong>.
        </p>

        <form
          onSubmit={submit}
          className="bg-white border border-slate-200 p-8 rounded-2xl shadow space-y-5"
        >
          <input
            type="text"
            maxLength={6}
            placeholder="Enter verification code"
            className="w-full border rounded-lg px-3 py-2 text-center text-lg tracking-widest"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button className="btn-primary w-full">Verify</button>

          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </Layout>
  );
}
