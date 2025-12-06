// src/pages/account/Security.tsx
import { useState, useEffect } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";
import type { User } from "../../context/AuthContext";

export default function Security() {
  const { user, token, setUser, setToken } = useAuth();


  // PASSWORD STATES
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");

  // 2FA STATES
  const [twoFAStatus, setTwoFAStatus] = useState("");
  const [twoFAStep, setTwoFAStep] = useState<"idle" | "code">("idle");
  const [twoFACode, setTwoFACode] = useState("");

  // STATUS
  const [status, setStatus] = useState("");

  // SESSION STATES
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionStatus, setSessionStatus] = useState("");

  /* -----------------------------------------
      LOAD SESSIONS
  ------------------------------------------ */
  useEffect(() => {
    loadSessions();
  }, [token]);

  async function loadSessions() {
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/auth/sessions`, {
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();

      if (!res.ok) {
        setSessionStatus(data.error || "Failed to load sessions");
        return;
      }

      setSessions(data.sessions || []);
    } catch {
      setSessionStatus("Failed to load sessions");
    }
  }

  /* -----------------------------------------
      REVOKE ONE SESSION
  ------------------------------------------ */
  async function revokeSession(sessionToken: string) {
  await fetch(`${BACKEND_URL}/auth/sessions/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ sessionToken }),
  });

  // If revoking the current session → logout immediately
  if (sessionToken === token) {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  // Otherwise refresh list
  loadSessions();
}


  /* -----------------------------------------
      REVOKE ALL SESSIONS EXCEPT CURRENT
  ------------------------------------------ */
  async function revokeAll() {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/sessions/revoke-all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (err) {
    console.warn("Failed to revoke sessions, but forcing logout:", err);
  }

  // 🚀 ALWAYS LOG OUT USER COMPLETELY
  setUser(null);
  setToken(null);
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");

  // Redirect to login page
  window.location.href = "/login";
}




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

    const updatedUser: User = { ...(user as User), twoFactorEnabled: true };
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
    const res = await fetch(`${BACKEND_URL}/auth/2fa/disable`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    if (!res.ok) return setTwoFAStatus(data.error);

    const updatedUser: User = { ...(user as User), twoFactorEnabled: false };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setTwoFAStatus("Two-Factor Authentication disabled.");
  }

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Security</h1>

      {status && <p className="text-green-600 mb-3">{status}</p>}

      <section className="space-y-6">
        {/* PASSWORD */}
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

        {/* ======================
            TWO-FACTOR AUTH
        ======================= */}
        <div className="p-6 bg-white border rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-bold">Two-Factor Authentication</h2>

          {twoFAStatus && (
            <p className="text-green-600 text-sm mb-2">{twoFAStatus}</p>
          )}

          {user?.twoFactorEnabled ? (
            <>
              <p className="text-sm text-slate-600">2FA is enabled.</p>

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
                Enable 2FA to require email verification on login.
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
                    placeholder="Enter 7-digit code"
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

        {/* ======================
            ACTIVE SESSIONS
        ======================= */}
        <div className="p-6 bg-white border rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-bold">Active Sessions</h2>

          {sessionStatus && (
            <p className="text-red-600 text-sm">{sessionStatus}</p>
          )}

          {sessions.length === 0 && (
            <p className="text-sm text-slate-500">No active sessions found.</p>
          )}

          {sessions.map((s, i) => (
            <div
              key={i}
              className="border p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-sm">{s.userAgent}</p>
                <p className="text-xs text-slate-500">IP: {s.ip}</p>
                <p className="text-xs text-slate-400">
                  Last Active: {new Date(s.lastActive).toLocaleString()}
                </p>
                {s.isCurrent && (
                  <p className="text-xs text-green-600 font-semibold">
                    This Device
                  </p>
                )}
              </div>

              {!s.isCurrent && (
                <button
                  onClick={() => revokeSession(s.token)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Logout
                </button>
              )}
            </div>
          ))}

          {sessions.length > 1 && (
            <button
              onClick={revokeAll}
              className="bg-red-500 w-full text-white py-2 rounded-lg mt-3"
            >
              Logout All Other Sessions
            </button>
          )}
        </div>
      </section>
    </AccountLayout>
  );
}
