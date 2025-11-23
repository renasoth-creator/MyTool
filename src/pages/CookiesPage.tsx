import React from "react";
import Layout from "../components/Layout";

const CookiesPage: React.FC = () => {
  return (
    <Layout>
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          Cookies Policy
        </h1>

        <p className="mt-2">
          This Cookies Policy explains how <strong>PDFConvert.tech</strong> uses
          cookies and similar technologies on this website.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          1. What Are Cookies?
        </h2>
        <p className="mt-1">
          Cookies are small text files stored on your device when you visit a
          website. They help remember your preferences and improve performance,
          analytics and advertising.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          2. Types of Cookies We Use
        </h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            <strong>Essential cookies</strong> – required for basic site
            functionality and security.
          </li>
          <li>
            <strong>Analytics cookies</strong> – help us understand how users
            interact with the site and where we can improve.
          </li>
          <li>
            <strong>Advertising cookies</strong> – used by ad networks (such as
            Google AdSense) to display relevant ads.
          </li>
        </ul>

        <h2 className="mt-4 font-semibold text-slate-900">
          3. Managing Cookies
        </h2>
        <p className="mt-1">
          You can manage or disable cookies through your browser settings. Note
          that some features may not work correctly if certain cookies are
          disabled.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          4. Third-Party Cookies
        </h2>
        <p className="mt-1">
          Third-party services (such as analytics and ad providers) may place
          their own cookies, which are governed by their respective privacy and
          cookies policies.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          This Cookies Policy is for general information only and does not
          constitute legal advice.
        </p>
      </section>
    </Layout>
  );
};

export default CookiesPage;
