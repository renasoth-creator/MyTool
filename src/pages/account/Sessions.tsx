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
      <div className="space-y-6">

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🖥️</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Active Sessions</h1>
              <p className="text-slate-600 mt-1">Manage devices that are logged into your account</p>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-3xl mb-3">⏳</div>
              <p className="text-slate-600">Loading your sessions...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12 text-slate-600">
              <span className="text-4xl block mb-3">📱</span>
              <p>No active sessions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((s: any, i: number) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 flex items-center gap-2">
                      <span>💻</span>
                      {s.userAgent || "Unknown Device"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">IP Address: <span className="font-mono">{s.ip || "Unknown"}</span></p>
                    <p className="text-xs text-slate-500 mt-1">
                      Last Active: {new Date(s.lastActive).toLocaleDateString()} at {new Date(s.lastActive).toLocaleTimeString()}
                    </p>
                  </div>

                  <button
                    className="ml-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition whitespace-nowrap"
                    onClick={() => revokeSession(s.token)}
                  >
                    🚪 Logout
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout All Button */}
        {sessions.length > 0 && (
          <button
            onClick={revokeAll}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            🚪 Sign Out All Sessions
          </button>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-bold text-blue-900">Session Management</h3>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4 list-disc">
                <li>Each session represents a device logged into your account</li>
                <li>You can logout any device remotely</li>
                <li>Signing out all sessions will log you out on all devices</li>
                <li>Regularly review your sessions for security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

