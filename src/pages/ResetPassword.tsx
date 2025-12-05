import { useState } from "react";
import { BACKEND_URL } from "../config/backend";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  async function submit(e: any) {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data.error);
      return;
    }

    setStatus("Password reset successfully. You may now log in.");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-xl font-bold mb-3">Enter Code</h1>

      {status && <p className="text-green-600 mb-3">{status}</p>}

      <form className="space-y-3" onSubmit={submit}>
        <input
          placeholder="Your email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="6-digit code"
          className="w-full border px-3 py-2 rounded"
          maxLength={6}
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
      </form>
    </div>
  );
}
