import { useState } from "react";
import AccountLayout from "./AccountLayout";
import { BACKEND_URL } from "../../config/backend";
import { useAuth } from "../../context/AuthContext";

export default function DangerZone() {
  const { token, logout } = useAuth();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

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
    alert("Your account has been permanently deleted. All data has been removed.");
    window.location.href = "/";
  }

  return (
    <AccountLayout>
      <div className="space-y-6">

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">!</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Danger Zone</h1>
              <p className="text-slate-600 mt-1">Irreversible account actions - proceed with caution</p>
            </div>
          </div>
        </div>

        {status && (
          <div className="p-4 rounded-xl border-2 bg-red-50 border-red-200 text-red-700">
            <div className="font-semibold">{status}</div>
          </div>
        )}

        {/* Delete Account Section */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">X</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-900">Delete Account Permanently</h2>
              <p className="text-red-700 mt-2">This action cannot be undone. All your data will be permanently deleted.</p>
            </div>
          </div>

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Delete My Account
            </button>
          ) : (
            <form className="space-y-4" onSubmit={deleteAccount}>
              <div className="p-4 bg-red-100 border border-red-400 rounded-xl">
                <p className="font-bold text-red-900 mb-2">Final Confirmation</p>
                <p className="text-sm text-red-800">
                  This will permanently delete your account and all associated data. This action cannot be reversed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">Enter Your Password to Confirm</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Yes, Delete My Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirm(false);
                    setPassword("");
                  }}
                  className="flex-1 px-6 py-3 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-xl font-bold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Warning Box */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center text-orange-700 font-bold text-sm">!</div>
            <div>
              <h3 className="font-bold text-orange-900">Before You Delete</h3>
              <ul className="text-sm text-orange-800 mt-2 space-y-1 ml-4 list-disc">
                <li>Your account will be permanently deleted</li>
                <li>All your data will be removed from our servers</li>
                <li>You cannot recover your account after deletion</li>
                <li>This action is immediate and irreversible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center text-blue-700 font-bold text-sm">?</div>
            <div>
              <h3 className="font-bold text-blue-900">Other Options</h3>
              <p className="text-sm text-blue-800 mt-2">If you're having issues with your account, consider:</p>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4 list-disc">
                <li>Changing your password to secure your account</li>
                <li>Logging out all sessions for security</li>
                <li>Contacting support if you have concerns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Donate Section */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              ❤️
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">Support Our Project</h2>
              <p className="text-amber-800 mb-4">
                Love PDFConvert.tech? Consider supporting our work to help us improve and add new features.
              </p>
              <button
                onClick={() => window.open('https://paypal.me/renas93', '_blank')}
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-lg"
              >
                Donate via PayPal
              </button>
              <p className="text-sm text-amber-700 mt-3 text-center">
                Every contribution helps us keep the service running and free for everyone
              </p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

