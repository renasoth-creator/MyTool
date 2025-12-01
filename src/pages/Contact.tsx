// src/pages/Contact.tsx

import { useState } from "react";
import { BACKEND_URL } from "../config/backend";
import Layout from "../components/Layout";
import Popup from "../components/Popup";

// ---------------------------
//  reCAPTCHA helper
// ---------------------------
async function getRecaptchaToken() {
  return await new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute("6LeUPx4sAAAAAKXY0jct4ZP6VyjsD-qzvP7zaxQD", { action: "submit" })
        .then(resolve);
    });
  });
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // ---------------------------
  //  Submit Handler
  // ---------------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // MUST come first

    setStatus("sending");

    try {
      const token = await getRecaptchaToken(); // generate valid token

      const res = await fetch(`${BACKEND_URL}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptcha: token }), // FIXED
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("sent");
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <Layout>
      {/* Popup */}
      <div className="relative">
        {status === "sent" && (
          <Popup
            type="success"
            message="Your message has been sent successfully!"
            onClose={() => setStatus("idle")}
          />
        )}
        {status === "error" && (
          <Popup
            type="error"
            message="Something went wrong. Please try again."
            onClose={() => setStatus("idle")}
          />
        )}
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Contact Support
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Have questions or business inquiries? Fill out the form below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-5 border border-slate-200"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name (optional)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Topic *
            </label>
            <select
              required
              className="w-full border rounded-lg px-3 py-2"
              value={form.topic}
              onChange={(e) => updateField("topic", e.target.value)}
            >
              <option value="">Select a topic...</option>
              <option value="File Removal Request">File Removal Request</option>
              <option value="API Request">API Request</option>
              <option value="Business Inquiry">Business Inquiry</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message *
            </label>
            <textarea
              required
              className="w-full border rounded-lg px-3 py-2 h-36 resize-none"
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-gradient-to-r from-[#ff7a1a] to-[#e66d10] text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition disabled:opacity-40"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Message Sent ✓"
              : "Send Message"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
