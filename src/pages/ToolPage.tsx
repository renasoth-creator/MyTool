import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import FileUploadArea from "../components/FileUploadArea";

import { tools } from "../config/pdfToolsConfig";
import type { ToolId } from "../config/pdfToolsConfig";

interface ToolPageProps {
  toolId: ToolId;
}

const ToolPage: React.FC<ToolPageProps> = ({ toolId }) => {
  const tool = tools.find((t) => t.id === toolId);

  if (!tool) {
    return (
      <Layout>
        <p className="text-sm text-red-500">Tool not found.</p>
      </Layout>
    );
  }

  const acceptByTool: Partial<Record<ToolId, string>> = {
    merge: "application/pdf",
    split: "application/pdf",
    compress: "application/pdf",

    "image-to-pdf": "image/*",
    "pdf-spreadsheet": "image/*",

    "pdf-to-text": "application/pdf",
    "docx-to-pdf": ".doc,.docx",
    "xlsx-to-pdf": ".xls,.xlsx",
    "pptx-to-pdf": ".ppt,.pptx",
    "html-to-pdf": ".html,.htm,text/html",

    "protect-pdf": "application/pdf",
    "pdf-docx": "application/pdf",

    // New tools
    "pdf/to-images": "application/pdf",
    "extract-images": "application/pdf",
    "pdf-to-pptx": "application/pdf",
    "pdf-to-excel": "application/pdf",
    "pdf-remove-pages": "application/pdf",
    "pdf-reorder-pages": "application/pdf",
    "pdf-watermark": "application/pdf",
    "pdf-ocr": "application/pdf",
    "pdf-to-html": "application/pdf",
  };

  const accept = acceptByTool[toolId] ?? undefined;

  const allowMultiple =
    toolId === "merge" || toolId === "image-to-pdf" || toolId === "pdf-spreadsheet";

  return (
    <Layout>
      {/* BREADCRUMB */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-600">
        <Link to="/" className="hover:text-[#ff7a1a] hover:underline">
          All tools
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-800">{tool.name}</span>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        
        {/* LEFT */}
        <section className="space-y-5">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              {tool.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{tool.description}</p>

            <div className="mt-6">
              <FileUploadArea
                toolId={toolId}
                accept={accept}
                multiple={allowMultiple}
              />
            </div>
          </div>

          {/* ABOUT THIS TOOL */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 text-sm text-slate-700">
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              About this tool
            </h2>
            <p className="text-xs md:text-sm">
              This tool is designed to be simple and fast. Upload your file,
              click start, and download the result. No signup, no watermarks.
            </p>
            <p className="mt-2 text-xs md:text-sm">
              All processing happens on our secure backend. Files are deleted
              shortly after processing.
            </p>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 text-xs md:text-sm">
            <h2 className="mb-2 font-semibold text-slate-900 uppercase tracking-wide">
              How this tool works
            </h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>Upload your file using the box on the left.</li>
              <li>We process everything securely on our servers.</li>
              <li>Download your converted file instantly.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 text-xs md:text-sm">
            <h2 className="mb-2 font-semibold text-slate-900 uppercase tracking-wide">
              Tips for best results
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Avoid password-protected files unless required.</li>
              <li>Large files may take a bit longer to process.</li>
              <li>If something fails, try refreshing the page.</li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default ToolPage;
