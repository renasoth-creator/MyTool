import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email") || "";
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${BACKEND_URL}/verify-email-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Invalid code");
      return;
    }

    navigate("/email-verified");
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>

      <p className="text-sm text-gray-600 mb-6">
        Enter the 6-digit verification code sent to:
        <br />
        <b>{email}</b>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full text-center text-xl tracking-widest border rounded-lg py-3"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
          Verify
        </button>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </form>
    </div>
  );
}
