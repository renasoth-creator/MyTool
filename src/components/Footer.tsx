import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 pt-14 pb-6">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 px-6">

        {/* PDF → Office */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ff7a1a] tracking-wide">
            PDF → Office
          </h3>

          <ul className="space-y-2 text-[15px] text-gray-300">
            <li><Link className="hover:text-white transition" to="/pdf-docx">PDF to DOCX</Link></li>
            <li><Link className="hover:text-white transition" to="/pdf-to-pptx">PDF to PPTX</Link></li>
            <li><Link className="hover:text-white transition" to="/pdf-to-excel">PDF to Excel</Link></li>
            <li><Link className="hover:text-white transition" to="/pdf/to-html">PDF to HTML</Link></li>
          </ul>
        </div>

        {/* Office → PDF */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ff7a1a] tracking-wide">
            Office → PDF
          </h3>

          <ul className="space-y-2 text-[15px] text-gray-300">
            <li><Link className="hover:text-white transition" to="/docx-to-pdf?type=docx">DOCX to PDF</Link></li>
            <li><Link className="hover:text-white transition" to="/xlsx-to-pdf?type=xlsx">XLSX to PDF</Link></li>
            <li><Link className="hover:text-white transition" to="/pptx-to-pdf?type=pptx">PPTX to PDF</Link></li>
          </ul>
        </div>

        {/* PDF Tools */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ff7a1a] tracking-wide">
            PDF Tools
          </h3>

          <ul className="space-y-2 text-[15px] text-gray-300">
            <li><Link className="hover:text-white transition" to="/merge">Merge PDF</Link></li>
            <li><Link className="hover:text-white transition" to="/split">Split PDF</Link></li>
            <li><Link className="hover:text-white transition" to="/compress">Compress PDF</Link></li>
            <li><Link className="hover:text-white transition" to="/protect-pdf">Protect PDF</Link></li>
            <li><Link className="hover:text-white transition" to="/image-to-pdf">Images → PDF</Link></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-14 border-t border-gray-800 pt-4 text-center text-gray-400 text-sm tracking-wide">
        © 2025 <span className="text-white font-semibold">PDFConvert.tech</span> — All rights reserved.
      </div>
    </footer>
  );
}
