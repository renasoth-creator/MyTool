// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* PDF → Office */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a]">PDF to Office</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a className="hover:text-white" href="/pdf-docx">PDF to DOCX</a></li>
            <li><a className="hover:text-white" href="/pdf-to-pptx">PDF to PPTX</a></li>
            <li><a className="hover:text-white" href="/pdf-to-excel">PDF to Excel</a></li>
            <li><a className="hover:text-white" href="/pdf/to-html">PDF to HTML</a></li>
          </ul>
        </div>

        {/* Office → PDF */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a]">Office to PDF</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a className="hover:text-white" href="/docx-to-pdf?type=docx">DOCX to PDF</a></li>
            <li><a className="hover:text-white" href="/xlsx-to-pdf?type=xlsx">XLSX to PDF</a></li>
            <li><a className="hover:text-white" href="/pptx-to-pdf?type=pptx">PPTX to PDF</a></li>
          </ul>
        </div>

        {/* PDF Tools */}
        <div>
          <h3 className="font-semibold mb-4 text-[#ff7a1a]">PDF Tools</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a className="hover:text-white" href="/merge">Merge PDF</a></li>
            <li><a className="hover:text-white" href="/split">Split PDF</a></li>
            <li><a className="hover:text-white" href="/compress">Compress PDF</a></li>
            <li><a className="hover:text-white" href="/protect-pdf">Protect PDF</a></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-gray-400 text-xs text-center py-4">
        © 2025 PDFConvert.tech All rights reserved.
      </div>
    </footer>
  );
}
