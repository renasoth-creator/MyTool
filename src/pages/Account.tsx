import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";
import { useAuth } from "../context/AuthContext";

export default function AccountSettings() {
  const { user, logout } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <p className="text-lg text-slate-600">You must be logged in</p>
          <a href="/login" className="text-[#ff7a1a] underline font-medium">
            Go to Login
          </a>
        </div>
      </Layout>
    );
  }

  async function updateName() {
    setLoading(true);
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/update-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setStatus(data.error);

    setStatus("Name updated!");
  }

  async function updateEmail() {
    if (!newEmail) return setStatus("Enter a new email");

    setLoading(true);
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/change-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ newEmail }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setStatus(data.error);

    setStatus("Verification sent to your new email!");
  }

  async function updatePassword() {
    if (!password || !newPassword)
      return setStatus("Enter your old and new password");

    setLoading(true);
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ password, newPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setStatus(data.error);

    setStatus("Password updated!");
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Account Settings
        </h1>

        {status && (
          <p className="text-center mb-6 text-sm text-[#ff7a1a]">{status}</p>
        )}

        <div className="space-y-10">

          {/* =========================
              PROFILE SECTION
          ==========================*/}
          <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Profile
            </h2>

            <div className="space-y-4">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">
                  Name
                </label>
                <input
                  className="w-full border border-slate-300 px-3 py-2 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* EMAIL (read only) */}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">
                  Email (current)
                </label>
                <input
                  disabled
                  className="w-full border border-slate-300 px-3 py-2 rounded-lg bg-slate-100 text-slate-500"
                  value={email}
                />
              </div>

              <button
                onClick={updateName}
                className="mt-2 bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition"
              >
                Save Changes
              </button>
            </div>
          </section>

          {/* =========================
              CHANGE EMAIL SECTION
          ==========================*/}
          <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Change Email
            </h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="New email address"
                className="w-full border border-slate-300 px-3 py-2 rounded-lg"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />

              <button
                onClick={updateEmail}
                className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition"
              >
                Update Email
              </button>
            </div>
          </section>

          {/* =========================
              CHANGE PASSWORD SECTION
          ==========================*/}
          <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Change Password
            </h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full border border-slate-300 px-3 py-2 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="New password"
                className="w-full border border-slate-300 px-3 py-2 rounded-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                onClick={updatePassword}
                className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition"
              >
                Change Password
              </button>
            </div>
          </section>

          {/* =========================
              DANGER ZONE
          ==========================*/}
          <section className="p-6 bg-red-50 border border-red-300 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-red-700 mb-4">
              Danger Zone
            </h2>

            <button
              onClick={() => {
                if (confirm("Are you sure you want to log out?")) logout();
              }}
              className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Log Out
            </button>
          </section>

        </div>
      </div>
    </Layout>
  );
}
