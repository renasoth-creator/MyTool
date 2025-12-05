import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from "../config/backend";

export default function AccountSettings() {
  const { user, token, logout } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailStep, setEmailStep] = useState<"idle" | "code-sent">("idle");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  if (!user || !token) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Access denied</h2>
          <p className="text-sm text-slate-600 mb-6">
            You must be logged in to view this page.
          </p>
          <a
            href="/login"
            className="px-5 py-2 rounded-xl bg-[#ff7a1a] text-white text-sm font-semibold hover:bg-[#e66d10] transition"
          >
            Go to Login
          </a>
        </div>
      </Layout>
    );
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Profile update failed");

      setProfileMessage("Profile updated successfully.");
    } catch (err: any) {
      setProfileMessage(err.message || "Profile update failed");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMessage("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password update failed");

      setPwMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPwMessage(err.message || "Password update failed");
    }
  }

  async function startEmailChange(e: React.FormEvent) {
    e.preventDefault();
    setEmailMessage("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/change-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ newEmail, password: emailPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Email change failed");

      setEmailStep("code-sent");
      setEmailMessage("A verification code was sent to your new email.");
    } catch (err: any) {
      setEmailMessage(err.message || "Email change failed");
    }
  }

  async function confirmEmailChange(e: React.FormEvent) {
    e.preventDefault();
    setEmailMessage("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/confirm-email-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ code: emailCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Email verification failed");

      setEmailMessage("Email updated successfully. You may need to log in again.");
    } catch (err: any) {
      setEmailMessage(err.message || "Email verification failed");
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-12">

        {/* ============================
            HEADER
        ============================= */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Account Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your personal information and account security.
            </p>
          </div>

          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-xl bg-red-50 border border-red-300 text-red-600 hover:bg-red-100 transition"
          >
            Log out
          </button>
        </div>

        {/* ============================
            PROFILE SECTION
        ============================= */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl"></div>
            <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
          </div>

          <form onSubmit={saveProfile} className="space-y-4">

            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                className="w-full border border-slate-300 px-3 py-2 rounded-lg mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Phone</label>
              <input
                className="w-full border border-slate-300 px-3 py-2 rounded-lg mt-1"
                placeholder="Optional"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition"
            >
              {savingProfile ? "Saving..." : "Save Changes"}
            </button>

            {profileMessage && (
              <p className="text-xs text-green-600 mt-2">{profileMessage}</p>
            )}
          </form>
        </section>

        {/* ============================
            PASSWORD SECTION
        ============================= */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl"></div>
            <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
          </div>

          <form onSubmit={changePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Current password"
              className="w-full border px-3 py-2 rounded-lg"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New password"
              className="w-full border px-3 py-2 rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition">
              Update Password
            </button>

            {pwMessage && <p className="text-xs text-green-600">{pwMessage}</p>}
          </form>
        </section>

        {/* ============================
            EMAIL SECTION
        ============================= */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl"></div>
            <h2 className="text-xl font-semibold text-slate-900">Change Email</h2>
          </div>

          {/* STEP 1 — ENTER NEW EMAIL */}
          {emailStep === "idle" && (
            <form onSubmit={startEmailChange} className="space-y-4">
              <input
                type="email"
                placeholder="New email address"
                className="w-full border px-3 py-2 rounded-lg"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Current password"
                className="w-full border px-3 py-2 rounded-lg"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
              />

              <button className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition">
                Send Verification Code
              </button>
            </form>
          )}

          {/* STEP 2 — ENTER CODE */}
          {emailStep === "code-sent" && (
            <form onSubmit={confirmEmailChange} className="space-y-4">
              <input
                maxLength={6}
                placeholder="Enter the 6-digit code"
                className="w-full border px-3 py-2 rounded-lg tracking-[0.3em]"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
              />

              <button className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e66d10] transition">
                Confirm Email Change
              </button>
            </form>
          )}

          {emailMessage && (
            <p className="text-xs text-green-600">{emailMessage}</p>
          )}
        </section>

        {/* ============================
            DANGER ZONE
        ============================= */}
        <section className="p-6 bg-red-50 border border-red-300 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Danger Zone</h2>

          <button
            onClick={() => logout()}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </section>

      </div>
    </Layout>
  );
}
