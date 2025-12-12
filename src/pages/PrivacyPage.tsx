import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy – PDFConvert.tech</title>
        <meta name="description" content="Privacy Policy for PDFConvert.tech - Learn how we protect your data and privacy." />
      </Helmet>

      {/* ================================
          HERO HEADER - Enhanced
      ================================= */}
      <header className="text-center mb-12">
        <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
          Your Privacy Matters
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Policy</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We take your privacy seriously. Learn how PDFConvert.tech protects your data and respects your rights.
        </p>
      </header>

      {/* ================================
          MAIN CONTENT - Professional Sections
      ================================= */}
      <div className="space-y-8">

        {/* Section 1 */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Information We Collect</h2>
              <p className="text-gray-600">We collect only essential data to improve your experience</p>
            </div>
          </div>

          <div className="ml-0 md:ml-16 space-y-4">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="font-semibold text-slate-900 mb-2">Technical Data</h3>
              <p className="text-gray-700">IP address, browser type, device type, operating system, and approximate location.</p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="font-semibold text-slate-900 mb-2">Usage Data</h3>
              <p className="text-gray-700">Pages visited, time spent, features used, and basic interaction analytics.</p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="font-semibold text-slate-900 mb-2">Analytics</h3>
              <p className="text-gray-700">Anonymous analytics through third-party services to measure performance and improve functionality.</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Uploaded Files</h2>
              <p className="text-gray-600">How we handle and protect your documents</p>
            </div>
          </div>

          <div className="ml-0 md:ml-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <p className="text-gray-700 leading-relaxed mb-4">
              Files you upload for conversion are processed automatically on our secure servers. We apply the following protections:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-700"><strong>No Content Analysis:</strong> We do not analyze, store permanently, or use your file contents for any purpose other than providing the requested conversion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-700"><strong>Automatic Deletion:</strong> Processed files are automatically removed from our servers after 24 hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-700"><strong>Encrypted Transfer:</strong> All uploads use 256-bit SSL encryption during transit.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-700"><strong>No Sharing:</strong> Files are never shared with third parties without explicit consent.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Cookies & Tracking</h2>
              <p className="text-gray-600">How we use cookies and tracking technologies</p>
            </div>
          </div>

          <div className="ml-0 md:ml-16 space-y-4">
            <p className="text-gray-700 leading-relaxed">We use cookies, local storage, and similar technologies for:</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-slate-900 mb-2">User Preferences</h3>
                <p className="text-gray-700 text-sm">Remember your settings, theme preferences, and language selection.</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-slate-900 mb-2">Analytics</h3>
                <p className="text-gray-700 text-sm">Measure website traffic, performance, and user behavior patterns.</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-slate-900 mb-2">Security</h3>
                <p className="text-gray-700 text-sm">Prevent fraud, ensure security, and protect against abuse.</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-slate-900 mb-2">Advertising</h3>
                <p className="text-gray-700 text-sm">Show relevant ads and measure advertising effectiveness.</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mt-4 italic">You can control cookies through your browser settings at any time.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Third-Party Services</h2>
              <p className="text-gray-600">External services we use to operate the platform</p>
            </div>
          </div>

          <div className="ml-0 md:ml-16 space-y-4">
            <p className="text-gray-700 leading-relaxed mb-4">
              PDFConvert.tech uses third-party services that may collect data:
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-2">Cloud Services</h3>
              <p className="text-gray-700 text-sm">File storage and processing (AWS S3, etc.)</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-2">Analytics</h3>
              <p className="text-gray-700 text-sm">Google Analytics, Vercel Analytics for site performance monitoring</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-2">Security</h3>
              <p className="text-gray-700 text-sm">reCAPTCHA for fraud prevention and abuse protection</p>
            </div>

            <p className="text-gray-700 text-sm mt-4 italic">Each service has its own privacy policy. We encourage you to review them.</p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Rights</h2>
              <p className="text-orange-100">What you can do with your data</p>
            </div>
          </div>

          <div className="ml-0 md:ml-16 space-y-4">
            <div className="flex items-start gap-3 bg-white/20 rounded-xl p-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Access Your Data</h3>
                <p className="text-orange-100 text-sm">Request to know what data we collect about you</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/20 rounded-xl p-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Delete Your Data</h3>
                <p className="text-orange-100 text-sm">Request permanent deletion of your personal information</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/20 rounded-xl p-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Opt-Out of Tracking</h3>
                <p className="text-orange-100 text-sm">Disable analytics and non-essential cookies</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/20 rounded-xl p-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Data Portability</h3>
                <p className="text-orange-100 text-sm">Receive your data in a portable format</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h2>
              <p className="text-gray-600">Have privacy questions? Get in touch</p>
            </div>
          </div>

          <div className="ml-0 md:ml-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center">
            <p className="text-gray-700 mb-6">
              For privacy concerns, data requests, or questions about this policy, contact us:
            </p>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:contact@pdfconvert.tech" className="text-orange-600 hover:text-orange-700 font-semibold">contact@pdfconvert.tech</a>
              </p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-gray-600 text-sm mt-12 mb-6">
          <p>Last updated: December 2025</p>
          <p className="mt-1">This policy may be updated at any time. We will notify users of significant changes.</p>
        </div>

      </div>

    </Layout>
  );
};

export default PrivacyPage;
