import { useState, useEffect } from "react";
import AccountLayout from "./AccountLayout";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/backend";

export default function Profile() {
  const { user, token } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  async function saveProfile(e: any) {
    e.preventDefault();
    setStatus("");

    const res = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error);
      return;
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setStatus("Profile updated successfully.");

  }

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {status && <p className="text-green-600 mb-4">{status}</p>}

      <form className="space-y-6" onSubmit={saveProfile}>
        <div>
          <label className="font-medium text-sm text-slate-700">Name</label>
          <input
            className="w-full border px-3 py-2 rounded-lg mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium text-sm text-slate-700">Phone</label>
          <input
            className="w-full border px-3 py-2 rounded-lg mt-1"
            placeholder="Optional"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="bg-[#ff7a1a] text-white px-5 py-2 rounded-lg hover:bg-[#e66d10] transition">
          Save Changes
        </button>
      </form>
    </AccountLayout>
  );
}
