import { useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function sendResetCode(e: any) {
    e.preventDefault();
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    localStorage.setItem("reset_email", email);
    setStatus("Reset code sent! Check your email.");
    window.location.href = "/reset-password";
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>

        <form onSubmit={sendResetCode} className="border p-6 rounded-lg space-y-4">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn-primary w-full">Send Reset Code</button>

          {status && <p className="text-center text-green-600">{status}</p>}
        </form>
      </div>
    </Layout>
  );
}
