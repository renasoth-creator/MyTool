import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";
import { useAuth } from "../context/AuthContext";

export default function Verify2FA() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const { setUser, setToken } = useAuth() as any;

  /* ----------------------------------
     LOAD EMAIL FROM LOCALSTORAGE
  -------------------------------------*/
  useEffect(() => {
    const savedEmail = localStorage.getItem("2fa_email") || "";
    setEmail(savedEmail);
  }, []);

  /* ----------------------------------
      SUBMIT CODE
  -------------------------------------*/
  async function submitCode(e: any) {
    e.preventDefault();
    setError("");
    setStatus("");
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

    // Save full login session
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Cleanup
    localStorage.removeItem("2fa_email");

    window.location.href = "/dashboard";
  }

  /* ----------------------------------
      RESEND CODE
  -------------------------------------*/
  async function resendCode() {
    setError("");
    setStatus("");
    setResending(true);

    const res = await fetch(`${BACKEND_URL}/auth/resend-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setResending(false);

    if (!res.ok) {
      setError(data.error || "Could not resend code");
      return;
    }

    setStatus("A new code was sent to your email.");
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-2xl font-bold text-center mb-3">
          Two-Factor Authentication
        </h1>

        <p className="text-center text-sm text-slate-600 mb-6">
          Enter the 2FA code sent to <br />
          <b>{email}</b>
        </p>

        <form
          onSubmit={submitCode}
          className="bg-white p-6 shadow rounded-xl space-y-5"
        >
          <input
            maxLength={7}
            className="w-full border px-3 py-3 rounded text-center text-xl tracking-[0.4em]"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Verifying…" : "Verify"}
          </button>

          {/* Resend link */}
          <p className="text-center text-xs text-slate-600">
            Didn’t receive a code?{" "}
            <button
              type="button"
              onClick={resendCode}
              disabled={resending}
              className="text-[#ff7a1a] font-semibold hover:underline disabled:opacity-40"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          </p>

          {status && <p className="text-green-600 text-center text-sm">{status}</p>}
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        </form>
      </div>
    </Layout>
  );
}
