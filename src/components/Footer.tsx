// src/components/Footer.tsx

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 pt-12 pb-6">

      {/* MAIN LINK GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* PDF → Office */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a] text-sm uppercase tracking-wide">
            PDF to Office
          </h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/pdf-docx" className="hover:text-white">PDF to DOCX</Link></li>
            <li><Link to="/pdf-to-pptx" className="hover:text-white">PDF to PPTX</Link></li>
            <li><Link to="/pdf-to-excel" className="hover:text-white">PDF to Excel</Link></li>
            <li><Link to="/pdf/to-html" className="hover:text-white">PDF to HTML</Link></li>
          </ul>
        </div>

        {/* Office → PDF */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a] text-sm uppercase tracking-wide">
            Office to PDF
          </h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/docx-pdf" className="hover:text-white">DOCX to PDF</Link></li>
            <li><Link to="/xlsx-pdf" className="hover:text-white">XLSX to PDF</Link></li>
            <li><Link to="/pptx-pdf" className="hover:text-white">PPTX to PDF</Link></li>
          </ul>
        </div>

        {/* PDF Tools */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a] text-sm uppercase tracking-wide">
            PDF Tools
          </h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/merge" className="hover:text-white">Merge PDF</Link></li>
            <li><Link to="/split" className="hover:text-white">Split PDF</Link></li>
            <li><Link to="/compress" className="hover:text-white">Compress PDF</Link></li>
            <li><Link to="/protect-pdf" className="hover:text-white">Protect PDF</Link></li>
          </ul>
        </div>

        {/* LEGAL + INFO PAGES */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a] text-sm uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 text-center text-gray-400 text-xs py-4">
        © 2025 PDFConvert.tech — All rights reserved.
      </div>
    </footer>
  );
}
