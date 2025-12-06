// src/pages/account/Security.tsx
import { useState } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

import type { User } from "../../context/AuthContext"; // <-- IMPORTANT

export default function Security() {
  const { user, token, setUser } = useAuth();

  // PASSWORD STATES
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");

  // 2FA STATES
  const [twoFAStatus, setTwoFAStatus] = useState("");
  const [twoFAStep, setTwoFAStep] = useState<"idle" | "code">("idle");
  const [twoFACode, setTwoFACode] = useState("");

  // GLOBAL STATUS MESSAGE
  const [status, setStatus] = useState("");

  /* -----------------------------------------
      UPDATE PASSWORD
  ------------------------------------------ */
  async function updatePassword(e: any) {
    e.preventDefault();
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        currentPassword: currentPw,
        newPassword: newPw,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Password updated successfully ✔");
    setCurrentPw("");
    setNewPw("");
  }

  /* -----------------------------------------
      START ENABLE 2FA
  ------------------------------------------ */
  async function start2FA() {
    setTwoFAStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/2fa/start`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    if (!res.ok) return setTwoFAStatus(data.error);

    setTwoFAStatus("A verification code was sent to your email.");
    setTwoFAStep("code");
  }

  /* -----------------------------------------
      CONFIRM ENABLE 2FA
  ------------------------------------------ */
  async function confirm2FA(e: any) {
    e.preventDefault();
    setTwoFAStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/2fa/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ code: twoFACode }),
    });

    const data = await res.json();
    if (!res.ok) return setTwoFAStatus(data.error);

    // SAFELY UPDATE USER TYPE
    const updatedUser: User = {
      ...(user as User),
      twoFactorEnabled: true,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setTwoFAStatus("Two-Factor Authentication enabled ✔");
    setTwoFAStep("idle");
    setTwoFACode("");
  }

  /* -----------------------------------------
      DISABLE 2FA
  ------------------------------------------ */
  async function disable2FA() {
    setTwoFAStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/2fa/disable`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    if (!res.ok) return setTwoFAStatus(data.error);

    const updatedUser: User = {
      ...(user as User),
      twoFactorEnabled: false,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setTwoFAStatus("Two-Factor Authentication disabled.");
  }

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Security</h1>

      {/* GLOBAL STATUS */}
      {status && <p className="text-green-600 mb-3">{status}</p>}

      <section className="space-y-6">
        {/* =========================
            PASSWORD BLOCK
        ========================== */}
        <div className="p-6 bg-white border rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-bold">Password</h2>

          <form className="space-y-3" onSubmit={updatePassword}>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="Current password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />

            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="New password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />

            <button className="bg-[#ff7a1a] text-white px-4 py-2 rounded-lg">
              Update Password
            </button>
          </form>
        </div>

        {/* =========================
            TWO FACTOR AUTH (2FA)
        ========================== */}
        <div className="p-6 bg-white border rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-bold">Two-Factor Authentication</h2>

          {twoFAStatus && (
            <p className="text-green-600 text-sm mb-2">{twoFAStatus}</p>
          )}

          {user?.twoFactorEnabled ? (
            <>
              <p className="text-sm text-slate-600">
                2FA is currently <strong>enabled</strong> on your account.
              </p>

              <button
                onClick={disable2FA}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Disable 2FA
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                Enable 2FA to require a login code sent to your email.
              </p>

              {twoFAStep === "idle" && (
                <button
                  onClick={start2FA}
                  className="px-4 py-2 bg-[#ff7a1a] text-white rounded-lg"
                >
                  Enable 2FA
                </button>
              )}

              {twoFAStep === "code" && (
                <form className="space-y-3" onSubmit={confirm2FA}>
                  <input
                    type="text"
                    maxLength={7}
                    className="w-full border px-3 py-2 rounded tracking-widest"
                    placeholder="Enter 6-digit code"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                  />

                  <button className="px-4 py-2 bg-[#ff7a1a] text-white rounded-lg">
                    Confirm 2FA
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </section>
    </AccountLayout>
  );
}
