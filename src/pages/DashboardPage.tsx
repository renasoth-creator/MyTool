import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";

const DashboardPage: React.FC = () => {
  return (
    <Layout>

      {/* HEADER */}
      <section className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          All PDF & Document Tools
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Convert, compress, merge, split, protect and more — all for free.
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

        {/* HOW IT WORKS */}
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div>
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-semibold text-slate-900">Upload</h3>
            <p className="text-sm text-slate-600 mt-1">
              Select your PDF, Word, Excel, PowerPoint or image files.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-semibold text-slate-900">Processing</h3>
            <p className="text-sm text-slate-600 mt-1">
              Our converter processes your files securely on our servers.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-semibold text-slate-900">Download</h3>
            <p className="text-sm text-slate-600 mt-1">
              Download your converted or optimized files instantly.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">🔐 Encrypted files</h3>
            <p className="text-sm text-slate-600 mt-1">
              All file transfers use 256-bit SSL encryption. Files are never stored permanently.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-lg">⚡ Auto-deletion</h3>
            <p className="text-sm text-slate-600 mt-1">
              All uploaded files are deleted after 24 hours for maximum privacy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-lg">🌍 Works everywhere</h3>
            <p className="text-sm text-slate-600 mt-1">
              Supports Windows, Mac, Linux, iOS, Android — all modern browsers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-lg">🧰 Full toolkit</h3>
            <p className="text-sm text-slate-600 mt-1">
              Merge, split, compress, convert, extract — everything you need.
            </p>
          </div>
        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="mt-12 space-y-6 text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">
          Why Choose PDFConvert.tech?
        </h2>
        <p className="text-sm">
          PDFConvert.tech offers a complete suite of fast, secure, and free PDF tools.
          Convert documents instantly without installing software or creating an account.
          Your files remain private and are automatically removed from our servers.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Most Popular Tools</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Merge multiple PDF files into one</li>
          <li>Compress PDF files while keeping high quality</li>
          <li>Convert JPG, PNG & WebP images into PDF</li>
          <li>Convert Word, Excel, PPT & HTML to PDF</li>
          <li>Extract text from scanned PDFs</li>
          <li>Password-protect your PDF documents</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900">
          100% Free · No Watermark · No Signup Required
        </h2>
        <p className="text-sm">
          Whether on mobile or desktop, PDFConvert.tech gives you fast processing,
          clean output, and strong privacy — always free.
        </p>
      </section>

    </Layout>
  );
};

export default DashboardPage;
