import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
   const jwt = localStorage.getItem("jwt");

   if (!jwt) {
    window.location.href = "/login";
    return;
  }

  fetch(`${BACKEND_URL}/auth/me`, {
    headers: { Authorization: "Bearer " + jwt },
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error) {
        window.location.href = "/login";
      } else {
        setUser(data);
      }
    })
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
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user.name || user.email}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow">
            <h2 className="font-semibold text-lg mb-2">Your Conversions</h2>
            <p className="text-sm text-slate-600">
              (Later we will store history here)
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow">
            <h2 className="font-semibold text-lg mb-2">Donate ❤️</h2>
            <p className="text-sm mb-3 text-slate-600">
              Support this project to keep tools free.
            </p>
            <button className="btn-primary w-full">Donate</button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
