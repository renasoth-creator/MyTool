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

  const { setUser, setToken } = useAuth() as any;

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

    // IMPORTANT: SAVE LOGIN STATE
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/dashboard";
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Enter 2FA Code
        </h1>

        <p className="text-center mb-4 text-sm">
          We sent a code to <b>{email}</b>
        </p>

        <form
          className="bg-white p-6 shadow rounded-xl space-y-4"
          onSubmit={submitCode}
        >
          <input
            maxLength={6}
            className="w-full border px-3 py-3 rounded text-center text-xl tracking-[0.4em]"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Verifying…" : "Verify"}
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </Layout>
  );
}
