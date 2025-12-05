import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LogoSplitAnimate from "./LogoSplitAnimate";

export default function Header() {
  return (
    <header className="relative w-full bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">

        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-2 relative">
          <LogoSplitAnimate />
          <span className="text-lg font-semibold text-slate-900">PDFConvert.tech</span>
        </Link>

        {/* CENTER — NAVIGATION */}
        <nav className="flex items-center gap-3">
          <NavItem to="/" label="All Tools" />
          <ConvertDropdown />
          <NavItem to="/merge" label="Merge" />
          <NavItem to="/split" label="Split" />
          <NavItem to="/protect-pdf" label="Protect" />
          <NavItem to="/compress" label="Compress" />
        </nav>

        {/* RIGHT — AUTH */}
        <div className="flex items-center gap-4 text-sm">
         <Link
           to="/auth/login"
           className="text-slate-700 hover:text-[#ff7a1a] transition font-medium"
         >
           Sign In
         </Link>

          <Link
           to="/signup"
           className="px-5 py-2 rounded-full bg-[#ff7a1a] text-white font-semibold hover:bg-[#e66d10] transition shadow"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </header>
  );
}

/* ---------------------------------------------
   Convert Dropdown Component
---------------------------------------------- */

function ConvertDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          px-4 py-2 rounded-xl text-sm font-medium transition 
          bg-white border border-slate-200 hover:bg-slate-100
          text-slate-700
        "
      >
        Convert ▾
      </button>


      {/* Edit the Drop menu l*/}
      {open && (
        <div
          className="
            absolute left-[-200px] mt-3 w-[650px]       
            grid grid-cols-3 gap-6
            bg-white/80 backdrop-blur-xl 
            border border-slate-200 shadow-2xl rounded-2xl p-6 z-50
            animate-dropdown
          "
        >
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-[#ff7a1a] mb-3">PDF → Office</h3>
            <MegaLink to="/pdf-docx" label="PDF → DOCX" />
            <MegaLink to="/pdf-to-excel" label="PDF → Excel" />
            <MegaLink to="/pdf-to-pptx" label="PDF → PowerPoint" />
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-[#ff7a1a] mb-3">Office → PDF</h3>
            <MegaLink to="/docx-pdf" label="DOCX → PDF" />
            <MegaLink to="/xlsx-pdf" label="Excel → PDF" />
            <MegaLink to="/pptx-pdf" label="PowerPoint → PDF" />
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold text-[#ff7a1a] mb-3">Images & Other</h3>
            <MegaLink to="/image-to-pdf" label="Image → PDF" />
            <MegaLink to="/pdf-to-images" label="PDF → Image" />
          </div>
        </div>
      )}
    </div>
  );
}


/* ---------------------------------------------
   Dropdown Button (same shape as header buttons)
---------------------------------------------- */



/* --------------------------------------------- */

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        px-4 py-2 rounded-xl text-sm font-medium transition-all
        ${isActive
          ? "text-[#ff7a1a] bg-orange-50 border border-orange-300 shadow-sm"
          : "text-slate-700 bg-white hover:bg-slate-100 border border-slate-200"}
        `
      }
    >

      {label}

    </NavLink>

  );
}
function MegaLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="
        block w-full px-3 py-2 rounded-lg text-sm font-medium 
        bg-white border border-slate-200
        hover:bg-orange-50 hover:border-orange-300 hover:text-[#ff7a1a]
        transition shadow-sm
      "
    >
      {label}
    </Link>
  );
}
