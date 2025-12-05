import { useState } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

export default function Security() {
  const { token } = useAuth();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [status, setStatus] = useState("");

  async function updatePassword(e: any) {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Password updated successfully.");
    setCurrentPw("");
    setNewPw("");
  }

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Security</h1>

      {status && <p className="text-green-600 mb-3">{status}</p>}

      <section className="space-y-5">
        
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

        {/* TWO FACTOR AUTH */}
<div className="p-6 bg-white border rounded-2xl shadow space-y-4">
  <h2 className="text-lg font-bold">Two-Factor Authentication</h2>

  {user?.twoFactorEnabled ? (
    <>
      <p className="text-sm text-slate-600">2FA is currently <b>Enabled</b>.</p>
      <button
        onClick={disable2FA}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Disable 2FA
      </button>
    </>
  ) : (
    <>
      <p className="text-sm text-slate-600">Protect your account with email-based 2FA.</p>

      {step === "idle" && (
        <button
          onClick={start2FA}
          className="px-4 py-2 bg-[#ff7a1a] text-white rounded-lg"
        >
          Enable 2FA
        </button>
      )}

      {step === "code" && (
        <form onSubmit={confirm2FA} className="space-y-3">
          <input
            type="text"
            maxLength={6}
            className="w-full border px-3 py-2 rounded tracking-widest"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="px-4 py-2 bg-[#ff7a1a] text-white rounded-lg">
            Confirm 2FA
          </button>
        </form>
      )}
    </>
  )}

  {status && <p className="text-green-600 text-sm">{status}</p>}
</div>

      </section>
    </AccountLayout>
  );
}
