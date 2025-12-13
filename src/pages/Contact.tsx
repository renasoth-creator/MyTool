// src/pages/Contact.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";
import Layout from "../components/Layout";
import Popup from "../components/Popup";
import { Helmet } from "react-helmet";

// Let TypeScript know global grecaptcha exists:
declare const grecaptcha: any;

// Helper to get reCAPTCHA v3 token
async function getRecaptchaToken(): Promise<string> {
  return await new Promise((resolve, reject) => {
    if (typeof grecaptcha === "undefined") {
      return reject(new Error("reCAPTCHA not loaded"));
    }

    grecaptcha.ready(() => {
      grecaptcha
        .execute("6LeUPx4sAAAAAKXY0jct4ZP6VyjsD-qzvP7zaxQD", { action: "submit" })
        .then((token: string) => resolve(token))
        .catch(reject);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      // 1) Get reCAPTCHA token
      const token = await getRecaptchaToken();

      // 2) Send to backend
      const res = await fetch(`${BACKEND_URL}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recaptcha: token,
        }),
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
      <Helmet>
        <title>Contact Us – PDFConvert.tech</title>
        <meta name="description" content="Get in touch with PDFConvert.tech for support, inquiries, or business opportunities." />
      </Helmet>

      {/* --- Popup Layer --- */}
      <div className="relative">
        {status === "sent" && (
          <Popup
            type="success"
            message="Your message has been sent successfully! We'll get back to you shortly."
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

      {/* ================================
          HERO HEADER - Enhanced
      ================================= */}
      <header className="text-center mb-12">
        <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
          Get In Touch
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Support</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have questions, need support, or want to discuss business opportunities? We're here to help.
        </p>
      </header>

      {/* ================================
          CONTACT FORM SECTION
      ================================= */}
      <div className="grid gap-8 lg:grid-cols-2 mb-12">

        {/* Left Column - Information */}
        <div className="space-y-6">
          {/* Quick Info Card 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Response Time</h3>
              <p className="text-gray-600">We typically respond to inquiries within 24-48 hours during business days.</p>
            </div>
            <div className="pt-4 border-t border-orange-100">
              <p className="text-sm text-gray-600">Our team is committed to providing professional and timely support.</p>
            </div>
          </div>

          {/* Quick Info Card 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Topics We Support</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>File removal and data requests</li>
                <li>API and integration inquiries</li>
                <li>Technical support and bug reports</li>
                <li>Business partnerships</li>
                <li>General questions</li>
              </ul>
            </div>
          </div>

          {/* Quick Info Card 3 */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-md text-white">
            <h3 className="text-2xl font-bold mb-4">Direct Email</h3>
            <p className="mb-4 text-orange-100">For urgent matters, you can also reach us directly:</p>
            <a href="mailto:contact@pdfconvert.tech" className="inline-block px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-50 transition-all">
              contact@pdfconvert.tech
            </a>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-white"
                value={form.topic}
                onChange={(e) => updateField("topic", e.target.value)}
              >
                <option value="">Select a topic...</option>
                <option value="File Removal Request">File Removal Request</option>
                <option value="API Request">API Request</option>
                <option value="Business Inquiry">Business Inquiry</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                className="w-full border-2 border-orange-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none h-32"
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Tell us how we can help..."
              />
            </div>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500">
              By submitting this form, you agree that we may contact you about your inquiry. Your data is protected according to our <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-semibold">Privacy Policy</Link>.
            </p>

            {/* Send Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending"
                ? "Sending Message..."
                : status === "sent"
                ? "Message Sent Successfully"
                : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* ================================
          ADDITIONAL INFORMATION SECTION
      ================================= */}
      <div className="space-y-6 mt-12">

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-2">How do I delete my uploaded files?</h3>
              <p className="text-sm text-gray-600">All files are automatically deleted from our servers after 24 hours. No action needed on your part.</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-2">Is my data secure?</h3>
              <p className="text-sm text-gray-600">Yes. All transfers use 256-bit SSL encryption and files are processed securely on our servers.</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-slate-900 mb-2">Do you offer API access?</h3>
              <p className="text-sm text-gray-600">We're exploring API options. Contact us for business inquiries and partnership opportunities.</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-slate-900 mb-2">What file formats are supported?</h3>
              <p className="text-sm text-gray-600">We support PDF, DOCX, XLSX, PPTX, HTML, JPG, PNG, and many other common formats.</p>
            </div>
          </div>
        </div>

        {/* Support Resources */}
        <div className="bg-gradient-to-r from-slate-900 to-black rounded-3xl p-8 shadow-md text-white">
          <h2 className="text-2xl font-bold mb-6">Need More Help?</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/privacy" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all">
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-300">Learn how we protect your data and privacy</p>
            </Link>

            <Link to="/terms" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all">
              <h3 className="font-semibold mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-300">Review our terms and conditions</p>
            </Link>

            <Link to="/faq" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all">
              <h3 className="font-semibold mb-2">FAQ Page</h3>
              <p className="text-sm text-gray-300">Browse common questions and answers</p>
            </Link>
          </div>
        </div>
      </div>

    </Layout>
  );
}

