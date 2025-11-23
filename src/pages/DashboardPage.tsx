import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";

const DashboardPage: React.FC = () => {
  return (
    <Layout>

      {/* TERMS OF USE */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Terms of Use</h2>
        <p className="mt-2">
          By using our tools, you agree that you are fully responsible for how you
          use the converted files. These tools must only be used for educational
          and ethical purposes. You may not use this service for harmful, illegal,
          exploitative, or abusive activities.
        </p>
        <p className="mt-2">
          We may collect anonymous cookie data for analytics, ads, and traffic
          optimization. By continuing to use this website, you agree to these
          terms.
        </p>
      </section>

      {/* HEADER */}
      <section className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          All PDF & Document Tools
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Convert, compress, merge, split, protect and more all for free.
          Click a tool below to get started.
        </p>
      </section>

      {/* TOOLS GRID */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* ==========================
          ARTICLES & FEATURES SECTION
      =========================== */}
      <section className="mt-12 space-y-10">

        {/* How it works */}
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div>
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-semibold text-slate-900">Upload</h3>
            <p className="text-sm text-slate-600 mt-1">
              Select your PDF, Word, Excel, PowerPoint or image file.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-semibold text-slate-900">Processing</h3>
            <p className="text-sm text-slate-600 mt-1">
              Our converter processes your file securely on the server.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-semibold text-slate-900">Download</h3>
            <p className="text-sm text-slate-600 mt-1">
              Download your converted document instantly.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-2">

          <div>
            <h3 className="font-semibold text-slate-900 text-lg"> Encrypted files</h3>
            <p className="text-sm text-slate-600 mt-1">
              All file transfers use 256-bit SSL encryption. We never store your
              files permanently or share them with third parties.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-lg">⚡ Automatic deletion</h3>
            <p className="text-sm text-slate-600 mt-1">
              All uploaded files are auto-deleted after 24 to keep your
              data private and secure. You can contact uu for faster removal via internal@pdfconvert.tech
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-lg"> Universal conversion</h3>
            <p className="text-sm text-slate-600 mt-1">
              Works on Windows, Mac, Linux, iOS, Android all modern browsers
              supported.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-lg">
                Helpful toolkit
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Merge, split, compress, unlock, protect, and convert files using
              our full suite of tools.
            </p>
          </div>

        </div>
      </section>

    </Layout>
  );
};

export default DashboardPage;
