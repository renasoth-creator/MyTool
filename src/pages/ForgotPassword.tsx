import { useState } from "react";
import { BACKEND_URL } from "../config/backend";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    await fetch(`${BACKEND_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-xl font-bold mb-3">Reset Password</h1>

      {!sent ? (
        <form className="space-y-3" onSubmit={submit}>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-primary w-full">Send Code</button>
        </form>
      ) : (
        <p className="text-green-600">
          If that email exists, a reset code has been sent.
        </p>
      )}
    </div>
  );
}
