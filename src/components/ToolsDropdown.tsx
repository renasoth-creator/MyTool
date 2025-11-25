import React, { useState } from "react";
import { Link } from "react-router-dom";

const ToolsDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Menu Button */}
      <button className="hover:text-[#ff7a1a] transition text-sm font-medium">
        Tools ▾
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute left-0 top-full mt-3 w-[600px] rounded-xl bg-white shadow-lg border border-slate-200 p-6 grid grid-cols-3 gap-6 z-50
               opacity-0 translate-y-2 pointer-events-none
               animate-dropdown">

          {/* Column 1 – Convert PDF */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm">
              Convert PDF
            </h3>

            <ul className="space-y-1 text-sm text-slate-700">
              <li><Link className="hover:text-[#ff7a1a]" to="/pdf-to-text">PDF → Text</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/pdf-spreadsheet">PDF → Spreadsheet</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/image-to-pdf">Image → PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/docx-to-pdf">DOCX → PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/xlsx-to-pdf">XLSX → PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/pptx-to-pdf">PPTX → PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/html-to-pdf">HTML → PDF</Link></li>
            </ul>
          </div>

          {/* Column 2 – Edit / Manage PDF */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm">
              Edit / Manage PDF
            </h3>

            <ul className="space-y-1 text-sm text-slate-700">
              <li><Link className="hover:text-[#ff7a1a]" to="/merge">Merge PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/split">Split PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/compress">Compress PDF</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/protect-pdf">Protect PDF</Link></li>
            </ul>
          </div>

          {/* Column 3 – Create Resume */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm">
              Create Resume
            </h3>

            <ul className="space-y-1 text-sm text-slate-700">
              <li><Link className="hover:text-[#ff7a1a]" to="/resume-builder">Resume Builder</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/cv-templates">CV Templates</Link></li>
              <li><Link className="hover:text-[#ff7a1a]" to="/cover-letter">Cover Letter</Link></li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default ToolsDropdown;
