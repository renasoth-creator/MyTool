import { useState, useEffect } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

export default function Profile() {
  const { user, token } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  async function saveProfile(e: any) {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    const res = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      setStatus(data.error);
      return;
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setStatus("✅ Profile updated successfully!");
    setTimeout(() => setStatus(""), 3000);
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👤</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Personal Profile</h1>
              <p className="text-slate-600 mt-1">Update your profile information and preferences</p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`p-4 rounded-xl border-2 ${
            status.includes("✅") 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            <div className="font-semibold">{status}</div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={saveProfile} className="bg-white border border-slate-200 rounded-2xl shadow-md p-8 space-y-6">

          {/* Email Display */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span>📧</span>
              Email Address
            </label>
            <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium">
              {user?.email || "No email"}
            </div>
            <p className="text-xs text-slate-500 mt-1">Email cannot be changed here</p>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span>👤</span>
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
            <p className="text-xs text-slate-500 mt-1">Your public display name</p>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span>📱</span>
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Optional: +1 (555) 000-0000"
            />
            <p className="text-xs text-slate-500 mt-1">Optional - used for account recovery</p>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-400 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "💾" : "✓"}</span>
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-bold text-blue-900">Profile Tips</h3>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4 list-disc">
                <li>Your full name helps others recognize you</li>
                <li>Phone number is optional but useful for account recovery</li>
                <li>All your information is private and secure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
