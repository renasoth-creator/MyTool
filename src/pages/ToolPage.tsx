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
        <div className="rounded-xl bg-white p-4 text-sm text-red-500">
          Tool not found.
        </div>
      </Layout>
    );
  }

  // Accepted file types per tool
  const acceptByTool: Partial<Record<ToolId, string>> = {
    merge: "application/pdf",
    split: "application/pdf",
    compress: "application/pdf",
    "image-to-pdf": "image/*",
    "pdf-spreadsheet": "image/*",
    "pdf-to-text": "application/pdf",
    "docx-to-pdf": ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xlsx-to-pdf":
      ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "pptx-to-pdf":
      ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "html-to-pdf": ".html,.htm,text/html",
    "protect-pdf": "application/pdf",
  };

  const accept = acceptByTool[toolId];

  const allowMultiple =
    toolId === "merge" ||
    toolId === "image-to-pdf" ||
    toolId === "pdf-spreadsheet";

  return (
    <Layout>
      {/* BREADCRUMB */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-600">
        <Link to="/" className="hover:text-primary-orange hover:underline">
          All tools
        </Link>
        <span>/</span>
        <span className="font-medium text-primary-dark">{tool.name}</span>
      </div>

      {/* MAIN TOOL LAYOUT */}
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        {/* LEFT: Upload + Description */}
        <section className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-dark">
              {tool.name}
            </h1>
            <p className="mt-2 text-sm text-slate-700">{tool.description}</p>

            <div className="mt-6">
              <FileUploadArea
                toolId={toolId}
                accept={accept}
                multiple={allowMultiple}
              />
            </div>
          </div>

          {/* Extra explanation / SEO-friendly content */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 text-sm text-slate-700 space-y-2">
            <h2 className="text-base font-semibold text-primary-dark">
              About this tool
            </h2>
            <p>
              This tool is designed to be simple and fast. Just upload your file,
              click start, and download the result. No signup, no watermarks, and
              fully browser-based.
            </p>
            <p>
              All processing happens on our secure backend, and your files are
              automatically removed after a short period for privacy.
            </p>
          </div>
        </section>

        {/* RIGHT: How it works + Tips */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-orange-100">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-dark">
              How this tool works
            </h2>
            <ol className="list-inside list-decimal space-y-1 text-xs text-slate-700">
              <li>Upload your file{allowMultiple ? "s" : ""} using the box.</li>
              <li>We process everything securely on our servers.</li>
              <li>Download your converted or processed file instantly.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 text-xs text-slate-700 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
              Tips for best results
            </h2>
            <p>
              Make sure your files are not password-protected unless you are
              using the password or protection tool. For very large files, your
              upload and processing time may take a little longer.
            </p>
            <p>
              If something fails, try with a smaller file first or refresh the
              page and upload again.
            </p>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default ToolPage;
