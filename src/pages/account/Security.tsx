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

  // SESSION STATES
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionStatus, setSessionStatus] = useState("");

  // GLOBAL STATUS MESSAGE
  const [status, setStatus] = useState("");

  /* -----------------------------------------
      LOAD SESSIONS ON MOUNT
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
      REVOKE A SINGLE SESSION
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

    // If the session being revoked is the current user session → logout user
    if (sessionToken === token) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    // Otherwise refresh list
    loadSessions();
  }

  /* -----------------------------------------
      REVOKE ALL SESSIONS (INCLUDING CURRENT)
      → FULL LOGOUT
  ------------------------------------------ */
  async function revokeAll() {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/sessions/revoke-all`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();

      // Server explicitly says to logout
      if (data.forceLogout) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        window.location.href = "/login";

        return;
      }
    } catch (err) {
      console.warn("Revoke all error", err);
    }

    // Fallback safety logout
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
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
      <div className="space-y-6">

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🔐</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Security Settings</h1>
              <p className="text-slate-600 mt-1">Manage your password, two-factor authentication, and active sessions</p>
            </div>
          </div>
        </div>

        {status && (
          <div className={`p-4 rounded-xl border-2 ${
            status.includes("✔") 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            <div className="font-semibold">{status}</div>
          </div>
        )}

        {/* PASSWORD SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔑</span>
            <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
          </div>

          <form className="space-y-4" onSubmit={updatePassword}>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                placeholder="Enter your current password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                placeholder="Enter your new password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                required
              />
              <p className="text-xs text-slate-500 mt-1">Password must be at least 8 characters</p>
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
              🔄 Update Password
            </button>
          </form>
        </div>

        {/* TWO-FACTOR AUTH SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📱</span>
            <h2 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h2>
            <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${
              user?.twoFactorEnabled 
                ? "bg-green-100 text-green-700" 
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {user?.twoFactorEnabled ? "✓ Enabled" : "⚠ Disabled"}
            </span>
          </div>

          {twoFAStatus && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
              {twoFAStatus}
            </div>
          )}

          {twoFAStep === "idle" && !user?.twoFactorEnabled && (
            <div className="space-y-4">
              <p className="text-slate-600">Add an extra layer of security to your account with two-factor authentication.</p>
              <button
                onClick={start2FA}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                🔐 Enable Two-Factor Authentication
              </button>
            </div>
          )}

          {twoFAStep === "code" && (
            <form className="space-y-4" onSubmit={confirm2FA}>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Verification Code</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-center text-2xl tracking-widest"
                  placeholder="000000"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Check your email for the code</p>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                ✓ Verify Code
              </button>
            </form>
          )}

          {user?.twoFactorEnabled && twoFAStep === "idle" && (
            <button
              onClick={disable2FA}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              ❌ Disable Two-Factor Authentication
            </button>
          )}
        </div>

        {/* SESSIONS SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🖥️</span>
            <h2 className="text-xl font-bold text-slate-900">Active Sessions</h2>
          </div>

          {sessionStatus && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {sessionStatus}
            </div>
          )}

          {sessions.length === 0 ? (
            <p className="text-slate-600">No active sessions found.</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session: any) => (
                <div key={session.token} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-100 transition">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {session.isCurrent ? "📍 This Device" : `🌐 ${session.ipAddress || "Unknown"}`}
                    </p>
                    <p className="text-sm text-slate-600">Last active: {new Date(session.lastActivity).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => revokeSession(session.token)}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={revokeAll}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                🚪 Sign Out All Sessions
              </button>
            </div>
          )}
        </div>

        {/* Security Tips */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-purple-900">Security Tips</h3>
              <ul className="text-sm text-purple-800 mt-2 space-y-1 ml-4 list-disc">
                <li>Use a strong, unique password with at least 12 characters</li>
                <li>Enable two-factor authentication for maximum security</li>
                <li>Regularly review your active sessions</li>
                <li>Sign out of sessions you don't recognize</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

