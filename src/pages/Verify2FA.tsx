import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Verify2FA() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [params] = useSearchParams();
  const email = params.get("email");

  const { setUser, setToken } = useAuth() as any; // allow updates

  async function submitCode(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`${BACKEND_URL}/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid code");
      return;
    }

    // 🔥 SAVE LOGIN STATE
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect NOW
    window.location.href = "/dashboard";
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Enter 2-Factor Code
        </h1>
        <p className="text-center text-sm mb-6">
          A login code was sent to <b>{email}</b>
        </p>

        <form
          onSubmit={submitCode}
          className="bg-white p-6 rounded-2xl shadow border space-y-4"
        >
          <input
            maxLength={6}
            className="w-full border rounded-lg px-3 py-3 text-center tracking-[0.5em] text-lg"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="btn-primary w-full py-3"
            disabled={loading || code.length !== 6}
          >
            {loading ? "Verifying…" : "Verify Code"}
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </Layout>
  );
}
