import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";
import { useAuth } from "../context/AuthContext";

export default function ConversionHistory() {
  const { jwt } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jwt) return;

    fetch(`${BACKEND_URL}/auth/history/all`, {
      headers: { Authorization: "Bearer " + jwt }
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.history || []);
        setLoading(false);
      });
  }, [token]);

  if (!token) {
    return (
      <Layout>
        <div className="text-center py-20 text-lg">
          Please log in to view your conversion history.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Conversion History</h1>

      <p className="text-slate-600 mb-6">
        Converted files are stored for <strong>24 hours</strong> and then deleted automatically.
        Expired items become unavailable for download.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500">No conversions yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const createdAt = new Date(item.createdAt);
            const ageHours = (Date.now() - createdAt.getTime()) / 36e5;
            const expired = ageHours > 24;

            return (
              <div
                key={item._id}
                className={`border p-4 rounded-xl flex justify-between items-center ${
                  expired ? "opacity-40" : ""
                }`}
              >
                <div>
                  <p className="font-semibold">{item.fileName}</p>
                  <p className="text-xs text-slate-600">
                    Created: {createdAt.toLocaleString()}
                  </p>
                </div>

                {expired ? (
                  <span className="text-red-500 text-sm font-semibold">
                    Expired
                  </span>
                ) : (
                  <a
                    href={item.downloadUrl}
                    className="bg-[#ff7a1a] text-white px-4 py-2 rounded-lg text-sm"
                    download
                  >
                    Download
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
