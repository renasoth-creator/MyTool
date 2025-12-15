import { useState } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

export default function EmailSettings() {
  const { user, token } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"idle" | "code-sent">("idle");
  const [status, setStatus] = useState("");

  async function sendCode(e: any) {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}/auth/change-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ newEmail, password }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Verification code sent.");
    setStep("code-sent");
  }

  async function confirmCode(e: any) {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}/auth/confirm-email-change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    if (!res.ok) return setStatus(data.error);

    setStatus("Email updated successfully.");
  }

  return (
    <AccountLayout>
      <div className="space-y-6">

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">@</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Email Settings</h1>
              <p className="text-slate-600 mt-1">Change your email address securely</p>
            </div>
          </div>
        </div>

        {status && (
          <div className={`p-4 rounded-xl border-2 ${
            status.includes("successfully") 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            <div className="font-semibold">{status}</div>
          </div>
        )}

        {/* Current Email Display */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 font-bold">✓</div>
            <div>
              <p className="text-sm font-semibold text-blue-900">Current Email Address</p>
              <p className="text-lg font-bold text-blue-700 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Email Change Form */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8 space-y-6">
          {step === "idle" && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">↻</span>
                <h2 className="text-xl font-bold text-slate-900">Change Email Address</h2>
              </div>

              <form className="space-y-4" onSubmit={sendCode}>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">New Email Address</label>
                  <input
                    type="email"
                    placeholder="your-new-email@example.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">You'll need to verify this email</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password for verification"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Required for security</p>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                  Send Verification Code
                </button>
              </form>
            </>
          )}

          {step === "code-sent" && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">✉</span>
                <h2 className="text-xl font-bold text-slate-900">Verify Your New Email</h2>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">We sent a verification code to your new email address. Enter it below to confirm the change.</p>
              </div>

              <form className="space-y-4" onSubmit={confirmCode}>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Verification Code</label>
                  <input
                    type="text"
                    maxLength={7}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-center text-2xl tracking-widest font-mono"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Check your email for the 6-digit code</p>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                  Confirm Email Change
                </button>
              </form>
            </>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center text-amber-700 font-bold text-sm">!</div>
            <div>
              <h3 className="font-bold text-amber-900">Important</h3>
              <ul className="text-sm text-amber-800 mt-2 space-y-1 ml-4 list-disc">
                <li>You'll need to verify your new email before it becomes active</li>
                <li>Your old email will still be valid until you confirm the change</li>
                <li>This is a security-sensitive operation requiring your password</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

