import { useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function ResetPassword() {
  const email = localStorage.getItem("reset_email") || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleReset(e: any) {
    e.preventDefault();
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Password reset successfully!");
    localStorage.removeItem("reset_email");
    setTimeout(() => (window.location.href = "/login"), 1500);
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

        <form onSubmit={handleReset} className="border p-6 rounded-lg space-y-4">

          <input
            type="text"
            placeholder="Reset code"
            className="w-full border px-3 py-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <input
            type="password"
            placeholder="New password"
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="btn-primary w-full">Reset Password</button>

          {status && <p className="text-center text-green-600">{status}</p>}
        </form>
      </div>
    </Layout>
  );
}
