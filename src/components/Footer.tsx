// src/components/Footer.tsx

import { Link } from "react-router-dom";

const handleToolClick = () => {
  window.scrollTo(0, 0);
};

export default function Footer() {

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white mt-20 pt-16 pb-8">

      {/* ABOUT US SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white bg-opacity-5 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">About PDFConvert.tech</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Who We Are</h3>
              <p className="text-gray-300 leading-relaxed">
                PDFConvert.tech is a project created by Renas, a full-stack developer specializing in web and mobile applications. With a passion for building useful tools that solve real problems, Renas developed PDFConvert.tech to provide a free, simple, and secure solution for PDF conversion and manipulation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                We believe PDF tools should be accessible to everyone without expensive software or complicated workflows. Our mission is to deliver fast, secure, and easy-to-use tools that help users transform their documents instantly, completely free of charge.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm mb-4">
              PDFConvert.tech is developed and maintained by Renas. All files are processed securely, never stored permanently, and are automatically deleted within 24 hours to protect your privacy.
            </p>
            <a
              href="https://iq.linkedin.com/in/renasothman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
            >
              Developer's account on LinkedIn →
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700 my-8"></div>

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
            <li><Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">Privacy</Link></li>
            <li><Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">Terms</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">Contact</Link></li>
            <li><Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">Blog</Link></li>
            <li><Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">FAQ</Link></li>
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
            <span className="text-sm">■</span>
            Secure & Encrypted
          </span>
          <span className="flex items-center gap-1 hover:text-orange-400 transition-colors cursor-help">
            <span className="text-sm">■</span>
            Lightning Fast
          </span>
        </div>
      </div>
    </footer>
  );
}
