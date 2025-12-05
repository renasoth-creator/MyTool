import { useState } from "react";
import AccountLayout from "./AccountLayout";
import { BACKEND_URL } from "../../config/backend";
import { useAuth } from "../../context/AuthContext";

export default function DangerZone() {
  const { token, logout } = useAuth();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function deleteAccount(e: any) {
    e.preventDefault();
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/delete-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data.error);
      return;
    }

    logout();
    alert("Account has been permanently deleted.");
    window.location.href = "/";
  }

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Danger Zone</h1>

      <div className="p-6 bg-red-50 border border-red-300 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Delete Account
        </h2>

        {status && <p className="text-red-600 text-sm mb-2">{status}</p>}

        <form className="space-y-3" onSubmit={deleteAccount}>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Confirm your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="px-5 py-2 bg-red-600 text-white rounded-lg">
            Delete My Account Permanently
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}
