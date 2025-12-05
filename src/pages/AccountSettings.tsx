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
        <div className="max-w-md mx-auto py-16 text-center">
          <p className="text-sm text-slate-600 mb-4">
            You need to be logged in to manage your account.
          </p>
          <a
            href="/login"
            className="px-4 py-2 rounded-xl bg-[#ff7a1a] text-white text-sm font-semibold"
          >
            Go to login
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
      if (!res.ok) throw new Error(data.error || "Change password failed");

      setPwMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPwMessage(err.message || "Change password failed");
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
      setEmailMessage("Code sent to new email address.");
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
      if (!res.ok) throw new Error(data.error || "Confirm email failed");

      setEmailMessage("Email updated successfully. You may need to login again.");
    } catch (err: any) {
      setEmailMessage(err.message || "Confirm email failed");
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Account settings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your profile, security, and email.
            </p>
          </div>
          <button
            onClick={logout}
            className="text-xs text-slate-500 hover:text-red-500"
          >
            Log out
          </button>
        </div>

        {/* Profile */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Profile</h2>
          <form className="space-y-3" onSubmit={saveProfile}>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Name
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Phone (optional)
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="btn-primary text-sm px-4 py-2 rounded-xl"
            >
              {savingProfile ? "Saving..." : "Save profile"}
            </button>

            {profileMessage && (
              <p className="text-xs mt-2 text-slate-600">{profileMessage}</p>
            )}
          </form>
        </section>

        {/* Password */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Change password</h2>
          <form className="space-y-3" onSubmit={changePassword}>
            <input
              type="password"
              placeholder="Current password"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password (min 6 chars)"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="btn-primary text-sm px-4 py-2 rounded-xl">
              Update password
            </button>
            {pwMessage && (
              <p className="text-xs mt-2 text-slate-600">{pwMessage}</p>
            )}
          </form>
        </section>

        {/* Email */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Change email</h2>

          {emailStep === "idle" && (
            <form className="space-y-3" onSubmit={startEmailChange}>
              <input
                type="email"
                placeholder="New email"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Current password"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
              />
              <button className="btn-primary text-sm px-4 py-2 rounded-xl">
                Send confirmation code
              </button>
            </form>
          )}

          {emailStep === "code-sent" && (
            <form className="space-y-3" onSubmit={confirmEmailChange}>
              <input
                maxLength={6}
                placeholder="Enter code from email"
                className="w-full border rounded-lg px-3 py-2 text-sm tracking-[0.3em]"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
              />
              <button className="btn-primary text-sm px-4 py-2 rounded-xl">
                Confirm new email
              </button>
            </form>
          )}

          {emailMessage && (
            <p className="text-xs mt-2 text-slate-600">{emailMessage}</p>
          )}
        </section>
      </div>
    </Layout>
  );
}
