import React from "react";
import Layout from "../components/Layout";

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          Privacy Policy
        </h1>
        <p className="mt-2">
          This Privacy Policy explains how <strong>PDFConvert.tech</strong>{" "}
          collects, uses and protects information when you use our website and
          tools.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          1. Information We Collect
        </h2>
        <p className="mt-1">
          We may collect limited technical and usage data such as:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>IP address and approximate location.</li>
          <li>Browser type, device type and operating system.</li>
          <li>Pages visited, time spent, and basic interaction data.</li>
          <li>
            Anonymous analytics and advertising identifiers through third-party
            services.
          </li>
        </ul>

        <h2 className="mt-4 font-semibold text-slate-900">
          2. Uploaded Files
        </h2>
        <p className="mt-1">
          Files you upload for conversion are processed automatically on our
          servers. We do not use your file contents for any purpose other than
          providing the requested tool functionality. Processed files are
          automatically removed after a short period.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          3. Cookies and Advertising
        </h2>
        <p className="mt-1">
          We may use cookies, local storage and similar technologies to:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Remember basic preferences and improve user experience.</li>
          <li>Measure website traffic and performance.</li>
          <li>Serve relevant ads through providers such as Google AdSense.</li>
        </ul>
        <p className="mt-2">
          For more details on how we use cookies, please see our{" "}
          <a href="/cookies" className="text-sky-600 underline">
            Cookies Policy
          </a>
          .
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          4. Third-Party Services
        </h2>
        <p className="mt-1">
          We may use third-party services (for example, analytics, storage or
          advertising providers) that collect and process data under their own
          privacy policies. We encourage you to review those policies separately.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          5. Data Retention
        </h2>
        <p className="mt-1">
          Uploaded files are retained only for as long as needed to perform the
          requested operation and deliver the result. Aggregated analytics data
          may be stored for a longer period to help us understand usage trends.
        </p>

        <h2 className="mt-4 font-semibold text-slate-900">
          6. Your Choices
        </h2>
        <p className="mt-1">
          You can control cookies through your browser settings and opt out of
          certain personalized advertising through your ad preferences or
          industry opt-out tools provided in your region.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          This Privacy Policy is for general information only and does not
          constitute legal advice.
        </p>
      </section>
    </Layout>
  );
};

export default PrivacyPage;
