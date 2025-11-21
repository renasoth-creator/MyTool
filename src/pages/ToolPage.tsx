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
    "pdf-to-text": "application/pdf",
    "docx-to-pdf": ".doc,.docx",
    "xlsx-to-pdf": ".xls,.xlsx",
    "pptx-to-pdf": ".ppt,.pptx",
    "html-to-pdf": ".html,.htm,text/html",
    "protect-pdf": "application/pdf",
  };

  const accept = acceptByTool[toolId] ?? undefined;

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="mb-4 flex items-center gap-3 text-xs text-slate-500">
        <Link to="/" className="hover:text-sky-600 hover:underline">
          All tools
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{tool.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        {/* LEFT SIDE: Upload Section */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {tool.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{tool.description}</p>

          <div className="mt-6">
            <FileUploadArea
              toolId={toolId}
              accept={accept}
              multiple={toolId === "merge" || toolId === "image-to-pdf"}
            />
          </div>
        </div>

        {/* RIGHT SIDE: Info Box */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              How it works
            </h2>
            <ol className="list-inside list-decimal space-y-1 text-xs text-slate-600">
              <li>Upload your file(s).</li>
              <li>We’ll process them safely on our servers.</li>
              <li>Download the converted file instantly.</li>
            </ol>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default ToolPage;
