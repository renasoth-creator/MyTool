import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";

export default function DangerZone() {
  const { logout } = useAuth();

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Danger Zone</h1>

      <div className="p-6 bg-red-50 border border-red-300 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Delete Account
        </h2>
        <p className="text-sm text-red-600 mb-4">
          This action is permanent and cannot be undone.
        </p>

        <button className="px-5 py-2 bg-red-600 text-white rounded-lg">
          Delete My Account
        </button>
      </div>

      <button
        onClick={logout}
        className="mt-8 px-4 py-2 bg-slate-200 text-slate-800 rounded"
      >
        Log out
      </button>
    </AccountLayout>
  );
}
