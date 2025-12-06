import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Verify2FA() {
  const [search] = useSearchParams();
  const urlEmail = search.get("email");

  // 🔥 Always fallback to stored email
  const email = urlEmail || localStorage.getItem("2fa_email") || "";

  const { setUser, setToken } = useAuth() as any;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) setError("Missing email. Please login again.");
  }, [email]);

  async function handleVerify(e: any) {
    e.preventDefault();

    if (!email) {
      setError("Email missing. Please login again.");
      return;
    }

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

    // 🔥 Save login
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.removeItem("2fa_email");

    window.location.href = "/dashboard";
  }

  // ⭐ RESEND CODE
  async function resendCode() {
    setResending(true);
    setError("");
    setInfo("");

    const res = await fetch(`${BACKEND_URL}/auth/resend-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setResending(false);

    if (!res.ok) {
      setError(data.error || "Unable to resend code");
      return;
    }

    setInfo("A new code was sent to your email.");
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-2xl font-bold mb-4 text-center">Two-Factor Code</h1>

        <p className="text-center mb-4 text-sm">
          Enter the code sent to <b>{email}</b>
        </p>

        <form
          onSubmit={handleVerify}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <input
            maxLength={7}
            className="w-full border px-3 py-3 rounded text-center text-xl tracking-[0.3em]"
            placeholder="0000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Verifying…" : "Verify Code"}
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {info && <p className="text-green-600 text-center">{info}</p>}

          <p className="text-xs text-center mt-3">
            Didn’t get the code?{" "}
            <button
              type="button"
              onClick={resendCode}
              className="text-[#ff7a1a] hover:underline font-medium"
              disabled={resending}
            >
              {resending ? "Sending…" : "Resend Code"}
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
}
