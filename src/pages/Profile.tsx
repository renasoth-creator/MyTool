import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/auth/me`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((r) => r.json())
      .then(setUser)
      .catch(() => (window.location.href = "/login"));
  }, []);

  if (!user)
    return (
      <Layout>
        <p className="text-center py-20">Loading...</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

        <div className="bg-white border p-8 rounded-2xl shadow space-y-3">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.name || "Not set"}</p>

          <button className="btn-primary w-full mt-5">
            Change Email / Password
          </button>
        </div>
      </div>
    </Layout>
  );
}
