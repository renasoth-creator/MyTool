import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";

const DashboardPage: React.FC = () => {
  return (
    <Layout>

      <header className="mb-16">
  <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200 p-10 text-center">

    <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">
      The Ultimate <span className="text-primary-orange">Tools</span> Suite
    </h1>

    <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
      Fast, secure and 100% free. No signup required. Files auto-delete after 24 hours.
    </p>

  </div>
</header>


      {/* ================================
          TOOLS GRID (Orange hover cards)
      ================================= */}
      <section className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          
         </div>
       
      </section>

      {/* ================================
          HOW IT WORKS
      ================================= */}
      {/* ================================
    HOW IT WORKS (Modern Block)
================================= */}
<section className="mt-20 max-w-5xl mx-auto px-4">
  <div className="rounded-2xl bg-[#F9F9F9] p-10 shadow-sm border border-slate-200">

    <h2 className="text-3xl font-bold text-primary-dark text-center mb-10">
      How It Works
    </h2>

    <div className="grid gap-10 md:grid-cols-3 text-center">

      <div>
        <div className="text-4xl mb-3">📄</div>
        <h3 className="font-semibold text-primary-dark text-lg">1. Upload</h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose a PDF, Office file, or image directly from your device.
        </p>
      </div>

      <div>
        <div className="text-4xl mb-3">⚙️</div>
        <h3 className="font-semibold text-primary-dark text-lg">2. Process</h3>
        <p className="text-sm text-gray-600 mt-1">
          Our server processes your file securely and quickly.
        </p>
      </div>

      <div>
        <div className="text-4xl mb-3">⬇️</div>
        <h3 className="font-semibold text-primary-dark text-lg">3. Download</h3>
        <p className="text-sm text-gray-600 mt-1">
          Your finished file is ready instantly—no signup required.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* ================================
          FEATURES GRID
      ================================= */}
      {/* ================================
    FEATURE GRID + WHY CHOOSE US
================================= */}
<section className="mt-20 max-w-5xl mx-auto px-4">
  <div className="rounded-2xl bg-[#F9F9F9] p-10 shadow-sm border border-slate-200 space-y-10">

    {/* FEATURE GRID */}
    <div className="grid gap-10 md:grid-cols-2">

      <div>
        <h3 className="text-xl font-bold text-primary-dark">🔒 Encrypted & Secure</h3>
        <p className="text-sm text-gray-700 mt-1">
          All transfers use 256-bit SSL encryption. Files are never stored permanently.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-primary-dark">⚡ Auto Deletion</h3>
        <p className="text-sm text-gray-700 mt-1">
          Uploaded files are automatically removed after 24 hours.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-primary-dark">🌍 Works Everywhere</h3>
        <p className="text-sm text-gray-700 mt-1">
          Works on Windows, macOS, Linux, iOS, Android—no installation needed.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-primary-dark">🧰 Powerful Tools</h3>
        <p className="text-sm text-gray-700 mt-1">
          Merge, split, compress, extract text, convert formats, and more.
        </p>
      </div>

    </div>

    {/* WHY CHOOSE US */}
    <div>
      <h2 className="text-3xl font-bold text-primary-dark mb-4">
        Why Choose PDFConvert.tech?
      </h2>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        PDFConvert.tech provides fast, secure, and easy-to-use PDF tools. Convert, merge,
        compress, extract text, and transform files instantly—no installation required.
      </p>

      <h3 className="text-xl font-semibold text-primary-dark mb-3">Most Popular Tools</h3>

      <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mb-8">
        <li>Merge multiple PDF files</li>
        <li>Compress PDFs while maintaining quality</li>
        <li>Create one PDF from many images</li>
        <li>Convert Word, Excel, PPT, or HTML to PDF</li>
        <li>Extract text using PDF-to-Text</li>
        <li>Password-protect your PDF</li>
      </ul>

      <h3 className="text-xl font-semibold text-primary-dark mb-2">
        100% Free · No Watermark · No Signup Required
      </h3>

      <p className="text-sm text-gray-700 leading-relaxed">
        Whether on mobile or desktop, enjoy fast and simple tools with complete privacy protection.
      </p>
    </div>

  </div>
</section>

    </Layout>
  );
};

export default DashboardPage;
