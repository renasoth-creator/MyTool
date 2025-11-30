import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Category: PDF to Office */}
        <div>
          <h3 className="text-sm font-bold text-orange-400 mb-4">
            PDF to Office
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/pdf-docx" className="hover:text-orange-400">PDF → Word</a></li>
            <li><a href="/pdf-to-pptx" className="hover:text-orange-400">PDF → PowerPoint</a></li>
            <li><a href="/pdf-to-excel" className="hover:text-orange-400">PDF → Excel</a></li>
            <li><a href="/pdf-to-html" className="hover:text-orange-400">PDF → HTML</a></li>
          </ul>
        </div>

        {/* Category: Office to PDF */}
        <div>
          <h3 className="text-sm font-bold text-orange-400 mb-4">
            Office to PDF
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/docx-to-pdf" className="hover:text-orange-400">Word → PDF</a></li>
            <li><a href="/pptx-to-pdf" className="hover:text-orange-400">PowerPoint → PDF</a></li>
            <li><a href="/xlsx-to-pdf" className="hover:text-orange-400">Excel → PDF</a></li>
            <li><a href="/html-to-pdf" className="hover:text-orange-400">HTML → PDF</a></li>
          </ul>
        </div>

        {/* Category: PDF Tools */}
        <div>
          <h3 className="text-sm font-bold text-orange-400 mb-4">PDF Tools</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/merge" className="hover:text-orange-400">Merge PDF</a></li>
            <li><a href="/split" className="hover:text-orange-400">Split PDF</a></li>
            <li><a href="/compress" className="hover:text-orange-400">Compress PDF</a></li>
            <li><a href="/pdf-watermark" className="hover:text-orange-400">Add Watermark</a></li>
            <li><a href="/pdf-remove-pages" className="hover:text-orange-400">Remove Pages</a></li>
            <li><a href="/pdf-reorder-pages" className="hover:text-orange-400">Reorder Pages</a></li>
            <li><a href="/protect-pdf" className="hover:text-orange-400">Password Protect</a></li>
          </ul>
        </div>

        {/* Brand / About */}
        <div>
          <h3 className="text-sm font-bold text-orange-400 mb-4">
            PDFConvert.tech
          </h3>
          <p className="text-sm text-gray-300">
            Fast, secure, and free PDF tools — no signup, no watermarks.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} PDFConvert.tech — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
