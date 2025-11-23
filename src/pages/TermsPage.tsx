import React from "react";
import Layout from "../components/Layout";

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">Terms of Use</h1>

        <p className="mt-2">
          By using our tools, you agree that you are fully responsible for how
          you use the converted files. These tools must only be used for
          educational and ethical purposes. You may not use this service for
          harmful, illegal, exploitative, or abusive activities.
        </p>

        <p className="mt-4">
          We may collect anonymous cookie data for analytics, ads, and traffic
          optimization. By continuing to use this website, you agree to these
          terms and policies.
        </p>

        <p className="mt-4">
          Misuse of this website or attempting to exploit, overload, or harm the
          system is strictly prohibited.
        </p>
      </section>
    </Layout>
  );
};

export default TermsPage;
