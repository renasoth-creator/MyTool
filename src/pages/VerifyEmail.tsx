import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailParam = new URLSearchParams(location.search).get("email") || "";
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${BACKEND_URL}/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailParam, code }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Invalid verification code");
      return;
    }

    navigate("/email-verified");
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>

        <p className="text-sm text-slate-600 mb-6">
          Enter the 6-digit code sent to:  
          <br />
          <b>{emailParam}</b>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            maxLength={6}
            className="w-full text-center text-xl tracking-widest border rounded-lg py-3"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            type="submit"
          >
            Verify
          </button>

          {error && (
            <p className="text-red-500 text-xs text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </Layout>
  );
}
