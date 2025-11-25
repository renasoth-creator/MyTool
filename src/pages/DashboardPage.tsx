import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";

const DashboardPage: React.FC = () => {
  return (
    <Layout>

      {/* ================================
          HERO HEADER
      ================================= */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">
          The Ultimate <span className="text-primary-orange">Tools</span> Suite
        </h1>

        <p className="mt- text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Fast, secure and 100% free. No signup required. Files auto-delete after 24 hours.
        </p>
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
         {/* BANNER AD */}
         <div id="container-e3c7de1a3d73afa16c42563899da41ee" className="my-10"></div>
       
      </section>

      {/* ================================
          HOW IT WORKS
      ================================= */}
      <section className="mt-16 max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-bold text-primary-dark">How It Works</h2>

        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div>
            <div className="text-4xl mb-3 text-primary-orange">1️⃣</div>
            <h3 className="font-semibold text-primary-dark">Upload</h3>
            <p className="text-sm text-gray-700 mt-1">
              Choose a PDF, Office file, or image from your device.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-3 text-primary-orange">2️⃣</div>
            <h3 className="font-semibold text-primary-dark">Process</h3>
            <p className="text-sm text-gray-700 mt-1">
              Our server converts your file quickly and securely.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-3 text-primary-orange">3️⃣</div>
            <h3 className="font-semibold text-primary-dark">Download</h3>
            <p className="text-sm text-gray-700 mt-1">
              Get your finished document instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ================================
          FEATURES GRID
      ================================= */}
      <section className="mt-16 max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold text-primary-dark">🔒 Encrypted & Secure</h3>
          <p className="text-sm text-gray-700 mt-1">
            All transfers use 256-bit SSL encryption. We never store files permanently.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-primary-dark">⚡ Auto Deletion</h3>
          <p className="text-sm text-gray-700 mt-1">
            Uploaded files are removed after 24 hours. Need earlier removal? Email us.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-primary-dark">🌍 Works Everywhere</h3>
          <p className="text-sm text-gray-700 mt-1">
            Windows, macOS, Linux, iOS, Android — no installation required.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-primary-dark">🧰 Powerful Tools</h3>
          <p className="text-sm text-gray-700 mt-1">
            Merge, split, compress, extract text, convert formats and more.
          </p>
        </div>
      </section>

      {/* ================================
          WHY CHOOSE US
      ================================= */}
      <section className="mt-16 max-w-5xl mx-auto space-y-4 text-gray-800">
        <h2 className="text-3xl font-bold text-primary-dark">
          Why Choose PDFConvert.tech?
        </h2>

        <p className="text-sm">
          PDFConvert.tech offers fast, secure and free file tools. Convert, merge,
          compress and extract files instantly without installing anything.
        </p>

        <h3 className="text-xl font-semibold text-primary-dark">Most Popular Tools</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li>Merge multiple PDF files</li>
          <li>Compress PDFs while keeping quality</li>
          <li>Create one PDF from many images</li>
          <li>Convert Word, Excel, PPT or HTML to PDF</li>
          <li>Extract text using PDF-to-text</li>
          <li>Password-protect your PDF</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary-dark">
          100% Free · No Watermark · No Signup Required
        </h3>

        <p className="text-sm">
          Whether you’re on mobile or desktop, we offer the fastest and simplest tools
          with full privacy protection.
        </p>
      </section>

    </Layout>
  );
};

export default DashboardPage;
