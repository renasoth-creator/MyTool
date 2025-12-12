import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";


const DashboardPage: React.FC = () => {
    
     return (
      <Layout>

      {/* ================================
          HERO HEADER - Enhanced
      ================================= */}
      <header className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
           Free PDF Tools - No Login Required
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          PDF Converter <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Tools</span> Suite
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Fast, secure, and 100% free. Convert, merge, compress, and transform your PDFs instantly. Files auto-delete after 24 hours.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <span>256-bit Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span>Instant Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span>No Watermarks</span>
          </div>
        </div>

        {/* CTA Button */}
        <a href="#tools-grid" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          Explore Tools →
        </a>
      </header>

      {/* ================================
          TOOLS GRID (Orange hover cards)
      ================================= */}
      <section className="mt-10" id="tools-grid">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          
         </div>
         {/*<div id="container-e3c7de1a3d73afa16c42563899da41ee" className="my-10"></div>*/}
       
      </section>

      {/* Explore All Tools Button */}
      <div className="mt-12 text-center">
        <a href="/all-tools" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          Explore All Tools →
        </a>
      </div>


      {/*================================
            HOW IT WORKS (Modern Professional Block)
        =================================*/}
<section className="mt-20 w-full">
  <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 p-12 shadow-md border border-orange-100">

    <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
      How It Works
    </h2>
    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Get your files converted in just three simple steps. Fast, secure, and hassle-free.
    </p>

    <div className="grid gap-8 md:grid-cols-3">

      {/* Step 1 */}
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg">
          1
        </div>
        <div className="pt-4">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="font-bold text-slate-900 text-lg mb-3">Upload Your File</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Choose a PDF, Office file, or image directly from your device. Supports all common formats.
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center">
        <div className="text-3xl text-orange-400">→</div>
      </div>

      {/* Step 2 */}
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg">
          2
        </div>
        <div className="pt-4">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="font-bold text-slate-900 text-lg mb-3">Instant Processing</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our secure servers process your file instantly with military-grade encryption.
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center">
        <div className="text-3xl text-orange-400">→</div>
      </div>

      {/* Step 3 */}
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg">
          3
        </div>
        <div className="pt-4">
          <div className="text-5xl mb-4">⬇️</div>
          <h3 className="font-bold text-slate-900 text-lg mb-3">Download & Done</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your finished file is ready instantly. No signup required, no watermarks.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ================================
    FEATURES SECTION - Professional Grid
================================= */}
<section className="mt-20 w-full">
  <div className="space-y-8">

    {/* Features Grid */}
    <div>
      <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
        Why Choose PDFConvert.tech?
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Feature 1 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">Encrypted & Secure</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            256-bit SSL encryption. Files never stored permanently. Your privacy is guaranteed.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Instant processing with zero delays. Convert multiple files simultaneously.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">Works Everywhere</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Windows, macOS, Linux, iOS, Android. No installation required. Browser-based.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">100% Free</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            No watermarks, no hidden fees. Completely free and no signup required.
          </p>
        </div>

      </div>
    </div>

    {/* Popular Tools Section */}
    <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white shadow-lg">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Popular Tools
        </h2>
        <p className="text-orange-100 mb-8">
          PDFConvert.tech provides the most comprehensive PDF tools suite. Choose from 20+ tools to transform your documents instantly.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-1"></span>
            <div>
              <h3 className="font-semibold mb-1">Merge & Split</h3>
              <p className="text-sm text-orange-100">Combine multiple PDFs or extract specific pages</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1"></span>
            <div>
              <h3 className="font-semibold mb-1">Convert Formats</h3>
              <p className="text-sm text-orange-100">PDF ↔ Word, Excel, PowerPoint, HTML, Images</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1"></span>
            <div>
              <h3 className="font-semibold mb-1">Compress & Optimize</h3>
              <p className="text-sm text-orange-100">Reduce file size while maintaining quality</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1"></span>
            <div>
              <h3 className="font-semibold mb-1">Extract & Text</h3>
              <p className="text-sm text-orange-100">Extract text, images, and metadata from PDFs</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1"></span>
            <div>
              <h3 className="font-semibold mb-1">Security</h3>
              <p className="text-sm text-orange-100">Password protect, watermark, and remove pages</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1"></span>
            <div>
              <h3 className="font-semibold mb-1">Advanced OCR</h3>
              <p className="text-sm text-orange-100">Recognize text from scanned PDFs</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-orange-400 text-center">
          <p className="text-lg font-semibold">
            Start converting your files now  absolutely free
          </p>
        </div>
      </div>
    </div>

  </div>
</section>

    </Layout>
  );
};

export default DashboardPage;