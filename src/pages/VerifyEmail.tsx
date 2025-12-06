import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailParam =
    new URLSearchParams(location.search).get("email") ||
    localStorage.getItem("verify_email") ||
    "";

  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);

  /* -------------------------------
      SUBMIT VERIFICATION CODE
  --------------------------------*/
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const res = await fetch(`${BACKEND_URL}/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailParam, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid verification code");
      return;
    }

    navigate("/email-verified");
  }

  /* -------------------------------
      RESEND CODE
  --------------------------------*/
  async function resendCode() {
    if (!emailParam) {
      setError("Email address missing.");
      return;
    }

    setResending(true);
    setError("");
    setMessage("");

    const res = await fetch(`${BACKEND_URL}/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailParam }),
    });

    const data = await res.json();
    setResending(false);

    if (!res.ok) {
      setError(data.error || "Failed to resend code");
      return;
    }

    setMessage("A new verification code has been sent.");
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4 text-center">Verify Your Email</h1>

        <p className="text-sm text-slate-600 mb-6 text-center">
          Please enter the 7-digit code sent to: <br />
          <b className="text-slate-900">{emailParam}</b>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            maxLength={7}
            className="w-full text-center text-2xl tracking-widest border rounded-xl py-3 bg-white"
            placeholder="1234567"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="w-full bg-[#ff7a1a] text-white py-2 rounded-xl font-semibold hover:bg-[#e66d10] transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm">
              Didn’t receive a code?{" "}
              <button
                type="button"
                onClick={resendCode}
                disabled={resending}
                className="text-[#ff7a1a] font-medium hover:underline disabled:opacity-40"
              >
                {resending ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>

          {message && (
            <p className="text-green-600 text-xs text-center mt-2">{message}</p>
          )}

          {error && (
            <p className="text-red-500 text-xs text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </Layout>
  );
}
