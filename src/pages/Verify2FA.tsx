import { useState } from "react";
import { BACKEND_URL } from "../config/backend";

export default function Verify2FA() {
  const email = localStorage.getItem("2fa_email");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${BACKEND_URL}/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }

    localStorage.removeItem("2fa_email");
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/dashboard";
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl shadow">
      <h1 className="text-xl font-bold mb-3">Two-Factor Authentication</h1>
      <p className="text-sm mb-4">
        Enter the 6-digit code sent to <strong>{email}</strong>.
      </p>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <form onSubmit={submit} className="space-y-3">
        <input
          maxLength={6}
          className="w-full border px-3 py-2 rounded"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn-primary w-full">Verify</button>
      </form>
    </div>
  );
}
