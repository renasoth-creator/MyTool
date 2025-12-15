import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AccountLayout({ children }: { children: any }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-4xl font-extrabold">Account Settings</h1>
          </div>
          <p className="text-slate-300 mt-2">Manage your profile, security, and preferences</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR - Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 text-slate-900 flex items-center gap-2">
                <span className="text-xl">📋</span>
                Menu
              </h2>

              <nav className="space-y-2">
                <AccountLink to="/account/profile" label="👤 Profile" icon="Profile Settings" />
                <AccountLink to="/account/security" label="🔐 Security" icon="Password & Auth" />
                <AccountLink to="/account/email" label="📧 Email" icon="Email Address" />
                <AccountLink to="/account/sessions" label="📱 Sessions" icon="Active Sessions" />
                <AccountLink to="/account/danger" label="⚠️ Danger Zone" icon="Delete Account" />
              </nav>

              <div className="border-t border-slate-200 mt-6 pt-6">
                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🚪</span>
                  Log Out
                </button>
              </div>
            </div>
          </aside>

          {/* PAGE CONTENT */}
          <main className="lg:col-span-3">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}

function AccountLink({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      onClick={() => window.scrollTo(0, 0)}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-orange-100 to-orange-50 text-[#ff7a1a] border-l-4 border-[#ff7a1a] shadow-sm"
            : "text-slate-700 hover:bg-slate-100 border-l-4 border-transparent hover:border-orange-300"
        }`
      }
      title={icon}
    >
      <div>{label}</div>
      <div className="text-xs text-slate-500 mt-1">{icon}</div>
    </NavLink>
  );
}
