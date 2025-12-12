// src/components/Footer.tsx

import { Link } from "react-router-dom";

const handleToolClick = () => {
  window.scrollTo(0, 0);
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white mt-20 pt-16 pb-8">

      {/* MAIN LINK GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

        {/* Brand/About */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-white">PDFConvert.tech</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The fastest, most secure, and easiest PDF tools suite. Transform your documents instantly.
          </p>
          <div className="flex gap-3 mt-4 text-sm">
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded">Secure</span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded">Free</span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded">Fast</span>
          </div>
        </div>

        {/* PDF Conversions */}
        <div>
          <h3 className="font-semibold mb-4 text-orange-400 text-sm uppercase tracking-wide">
            Convert to PDF
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/docx-pdf" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">DOCX to PDF</Link></li>
            <li><Link to="/xlsx-pdf" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">XLSX to PDF</Link></li>
            <li><Link to="/pptx-pdf" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">PPTX to PDF</Link></li>
            <li><Link to="/html-to-pdf" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">HTML to PDF</Link></li>
            <li><Link to="/image-to-pdf" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">Image to PDF</Link></li>
          </ul>
        </div>

        {/* PDF Tools */}
        <div>
          <h3 className="font-semibold mb-4 text-orange-400 text-sm uppercase tracking-wide">
            PDF Tools
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/merge" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">Merge PDF</Link></li>
            <li><Link to="/split" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">Split PDF</Link></li>
            <li><Link to="/compress" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">Compress PDF</Link></li>
            <li><Link to="/protect-pdf" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">Protect PDF</Link></li>
            <li><Link to="/pdf-watermark" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">Add Watermark</Link></li>
          </ul>
        </div>

        {/* Convert from PDF */}
        <div>
          <h3 className="font-semibold mb-4 text-orange-400 text-sm uppercase tracking-wide">
            Convert from PDF
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/pdf-docx" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">PDF to DOCX</Link></li>
            <li><Link to="/pdf-to-excel" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">PDF to Excel</Link></li>
            <li><Link to="/pdf-to-pptx" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">PDF to PPTX</Link></li>
            <li><Link to="/pdf-to-images" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">PDF to Images</Link></li>
            <li><Link to="/pdf-to-text" onClick={handleToolClick} className="hover:text-orange-400 transition-colors">PDF to Text</Link></li>
          </ul>
        </div>

        {/* Company/Legal */}
        <div>
          <h3 className="font-semibold mb-4 text-orange-400 text-sm uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
            <li><Link to="/blog" className="hover:text-orange-400 transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-orange-400 transition-colors">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy</Link></li>
          </ul>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
        <p>© 2025 PDFConvert.tech    All rights reserved.</p>

        <div className="flex gap-6">
          <span className="flex items-center gap-1 hover:text-orange-400 transition-colors cursor-help">
            <span></span>
            Secure & Encrypted
          </span>
          <span className="flex items-center gap-1 hover:text-orange-400 transition-colors cursor-help">
            <span></span>
            Lightning Fast
          </span>
        </div>
      </div>
    </footer>
  );
}
