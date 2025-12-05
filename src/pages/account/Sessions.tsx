import AccountLayout from "./AccountLayout";

export default function Sessions() {
  const sessions = [
    { device: "Chrome · Windows", ip: "192.168.1.5", lastUsed: "2 hours ago" },
    { device: "Safari · iPhone", ip: "83.120.55.22", lastUsed: "Yesterday" },
  ];

  return (
    <AccountLayout>
      <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>

      <div className="space-y-4">
        {sessions.map((s, i) => (
          <div
            key={i}
            className="p-4 bg-white border rounded-xl shadow-sm flex justify-between"
          >
            <div>
              <p className="font-medium">{s.device}</p>
              <p className="text-xs text-slate-500">
                IP: {s.ip} · Last used: {s.lastUsed}
              </p>
            </div>

            <button className="text-red-500 text-sm hover:underline">
              Logout Device
            </button>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
