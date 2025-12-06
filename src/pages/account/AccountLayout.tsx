import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AccountLayout({ children }: { children: any }) {
  const { logout } = useAuth();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 flex gap-10">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border border-slate-200 rounded-2xl shadow p-6 h-fit sticky top-20">
        <h2 className="text-lg font-bold mb-6 text-slate-800">Account</h2>

        <nav className="space-y-2">
          <AccountLink to="/account/profile" label="Profile" />
          <AccountLink to="/account/security" label="Security" />
          <AccountLink to="/account/email" label="Email" />
          <AccountLink to="/account/sessions" label="Sessions" />
          <AccountLink to="/account/danger" label="Danger Zone" />
        </nav>

        <button
          onClick={() => {
           logout();
           window.location.href = "/";
         }}
         className="mt-8 text-sm px-4 py-2 rounded-xl bg-red-50 border border-red-300 text-red-600 hover:bg-red-100 transition w-full"
        >
          Log out
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

function AccountLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-lg text-sm font-medium transition ${
          isActive
            ? "bg-orange-100 text-[#ff7a1a]"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
