import { useState } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

export default function EmailSettings() {
  const { user, token } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"idle" | "code-sent">("idle");
  const [status, setStatus] = useState("");

  async function sendCode(e: any) {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}/auth/change-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ newEmail, password }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Verification code sent.");
    setStep("code-sent");
  }

  async function confirmCode(e: any) {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}/auth/confirm-email-change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Email updated successfully.");
  }

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Email</h1>

      {status && <p className="text-green-600 mb-3">{status}</p>}

      <section className="p-6 bg-white border rounded-2xl shadow space-y-4">

        <p className="text-sm text-slate-700">
          Current email: <span className="font-medium">{user?.email}</span>
        </p>

        {step === "idle" && (
          <form className="space-y-4" onSubmit={sendCode}>
            <input
              type="email"
              placeholder="New email"
              className="w-full border px-3 py-2 rounded"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#ff7a1a] text-white px-4 py-2 rounded-lg">
              Send Code
            </button>
          </form>
        )}

        {step === "code-sent" && (
          <form className="space-y-4" onSubmit={confirmCode}>
            <input
              maxLength={7}
              className="w-full border px-3 py-2 rounded tracking-[0.3em]"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="bg-[#ff7a1a] text-white px-4 py-2 rounded-lg">
              Confirm Change
            </button>
          </form>
        )}

      </section>
    </AccountLayout>
  );
}
