import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BACKEND_URL } from "../config/backend";
import { useAuth } from "../context/AuthContext";

export default function ConversionHistory() {
  const { token } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch(`${BACKEND_URL}/history`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  function isExpired(createdAt: string) {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    return now - created > 24 * 60 * 60 * 1000; // 24 hours
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Conversion History</h1>

        <p className="text-slate-600 mb-6 text-sm">
          All files are <b>automatically deleted after 24 hours</b>.  
          Expired records are disabled.
        </p>

        {loading ? (
          <p>Loading…</p>
        ) : history.length === 0 ? (
          <p className="text-slate-500">You have no conversions yet.</p>
        ) : (
          <div className="space-y-4">

            {history.map((item) => {
              const expired = isExpired(item.createdAt);

              return (
                <div
                  key={item.id}
                  className={`
                    p-4 rounded-xl border shadow-sm flex justify-between items-center
                    ${expired ? "bg-slate-100 opacity-60 cursor-not-allowed" : "bg-white"}
                  `}
                >

                  <div>
                    <p className="font-semibold">{item.fileName}</p>
                    <p className="text-xs text-slate-500">
                      Converted: {new Date(item.createdAt).toLocaleString()}
                    </p>

                    {expired && (
                      <p className="text-xs text-red-500 font-semibold mt-1">
                        Expired — File removed
                      </p>
                    )}
                  </div>

                  {!expired ? (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      className="px-4 py-2 bg-[#ff7a1a] text-white rounded-lg text-sm hover:bg-[#e66d10]"
                    >
                      Download
                    </a>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-slate-300 text-white rounded-lg text-sm cursor-not-allowed"
                    >
                      Download
                    </button>
                  )}
                </div>
              );
            })}

          </div>
        )}
      </div>
    </Layout>
  );
}
