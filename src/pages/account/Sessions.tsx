import { useEffect, useState } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

export default function Sessions() {
  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSessions() {
    const res = await fetch(`${BACKEND_URL}/auth/sessions`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    setSessions(data.sessions || []);
    setLoading(false);
  }

  async function revokeSession(sessionToken: string) {
    await fetch(`${BACKEND_URL}/auth/sessions/revoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ sessionToken }),
    });

    loadSessions();
  }

  async function revokeAll() {
    await fetch(`${BACKEND_URL}/auth/sessions/revoke-all`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    loadSessions();
  }

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>

      {loading ? (
        <p>Loading…</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-slate-600">No active sessions found.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((s: any, i: number) => (
            <div
              key={i}
              className="p-4 bg-white border rounded-xl shadow-sm flex justify-between"
            >
              <div>
                <p className="font-medium">{s.userAgent}</p>
                <p className="text-xs text-slate-500">IP: {s.ip}</p>
                <p className="text-xs text-slate-400">
                  Last Active: {new Date(s.lastActive).toLocaleString()}
                </p>
              </div>

              <button
                className="text-red-600 text-sm hover:underline"
                onClick={() => revokeSession(s.token)}
              >
                Logout Device
              </button>
            </div>
          ))}

          <button
            onClick={revokeAll}
            className="bg-red-500 text-white w-full py-2 rounded-lg"
          >
            Logout All Other Sessions
          </button>
        </div>
      )}
    </AccountLayout>
  );
}
