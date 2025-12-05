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

            {/* EMAIL (readonly) */}
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
