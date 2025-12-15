// src/components/FileUploadArea.tsx

import React, { useRef, useState } from "react";
import type { ToolId } from "../config/pdfToolsConfig";
import { BACKEND_URL } from "../config/backend";

interface FileUploadAreaProps {
  toolId: ToolId;
  accept?: string;
  multiple?: boolean;
}

type Status = "idle" | "uploading" | "processing" | "done" | "error";

interface UploadedFileInfo {
  key: string;
  url: string;
}

interface ResultLink {
  label: string;
  url: string;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  toolId,
  accept,
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [links, setLinks] = useState<ResultLink[]>([]);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  // Tool-specific inputs
  const [password, setPassword] = useState("");
  const [removePages, setRemovePages] = useState("");
  const [reorderPages, setReorderPages] = useState("");
  const [watermarkText, setWatermarkText] = useState("");

  const handleClick = () => inputRef.current?.click();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    setFiles(Array.from(e.target.files));
    setLinks([]);
    setExtractedText(null);
    setError(null);
    setStatus("idle");
  };

  // Upload file → returns { key, url }
  async function uploadSingleFile(file: File): Promise<UploadedFileInfo> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: fd,
      headers: { "X-API-KEY": import.meta.env.VITE_API_KEY }
    });

    if (!res.ok) throw new Error("Upload failed");

    return await res.json();
  }

  async function uploadAllFiles(files: File[]) {
    const uploaded: UploadedFileInfo[] = [];
    for (const f of files) uploaded.push(await uploadSingleFile(f));
    return uploaded;
  }

  // fetch wrapper
  async function smartFetch(path: string, body: any, type: "json" | "file") {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method: "POST",
      body: type === "json" ? JSON.stringify(body) : body,
      headers:
        type === "json"
          ? {
              "Content-Type": "application/json",
              "X-API-KEY": import.meta.env.VITE_API_KEY,
            }
          : { "X-API-KEY": import.meta.env.VITE_API_KEY },
    });

    if (!res.ok) {
      let err;
      try {
        err = await res.json();
      } catch {
        throw new Error("Server error");
      }
      throw new Error(err.error || "Request failed");
    }

    if (type === "file") {
      const data = await res.json();
      return data; // server returns JSON with { url }
    }

    return await res.json();
  }

  // MAIN ACTION ROUTER
  async function callToolEndpoint(fileKeys: string[]) {
    setError(null);
    setLinks([]);
    setExtractedText(null);

    switch (toolId) {
      /* ---------- TEXT / OCR ---------- */
      case "pdf-to-text": {
        const data = await smartFetch("/pdf/to-text", { file: fileKeys[0] }, "json");
        setExtractedText(data.text);
        break;
      }

      case "pdf-ocr": {
        const data = await smartFetch("/pdf/ocr-text", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download OCR Text", url: data.url }]);
        break;
      }

      /* ---------- DOCX ---------- */
      case "pdf-docx": {
        const data = await smartFetch("/pdf-docx", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download DOCX", url: data.url }]);
        break;
      }

      /* ---------- IMAGES ---------- */
      case "pdf-to-images":{
        const data = await smartFetch("/pdf/to-images", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download ZIP", url: data.url }]);
        break;
      }

      case "extract-images": {
        const data = await smartFetch("/pdf/extract-images", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download Images ZIP", url: data.url }]);
        break;
      }

      /* ---------- PPTX / EXCEL ---------- */
      case "pdf-to-pptx": {
        const data = await smartFetch("/pdf/to-pptx", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download PPTX", url: data.url }]);
        break;
      }

      case "pdf-to-excel": {
        const data = await smartFetch("/pdf/to-excel", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download XLSX", url: data.url }]);
        break;
      }

      /* ---------- PAGE REMOVE ---------- */
      case "pdf-remove-pages": {
        if (!removePages) throw new Error("Enter pages to remove.");
        const data = await smartFetch(
          "/pdf/remove-pages",
          { file: fileKeys[0], pages: removePages },
          "json"
        );
        setLinks([{ label: "Download Modified PDF", url: data.url }]);
        break;
      }

      // OFFICE TO PD USING LIBRE OFFICR//

      case "docx-pdf": {
       const data = await smartFetch("/office/to-pdf", { file: fileKeys[0] }, "json");
       setLinks([{ label: "Download PDF", url: data.pdfUrl }]);
       break;
      }

      case "xlsx-pdf": {
       const data = await smartFetch("/office/to-pdf", { file: fileKeys[0] }, "json");
       setLinks([{ label: "Download PDF", url: data.pdfUrl }]);
       break;
      }

      case "pptx-pdf": {
       const data = await smartFetch("/office/to-pdf", { file: fileKeys[0] }, "json");
       setLinks([{ label: "Download PDF", url: data.pdfUrl }]);
       break;
      }
      // HTML TO PDF/ 

      case "html-to-pdf": {
       const data = await smartFetch("/html-to-pdf", { file: fileKeys[0] }, "json");
       setLinks([{ label: "Download PDF", url: data.pdfUrl }]);
       break;
      }







      /* ---------- PAGE REORDER ---------- */
      case "pdf-reorder-pages": {
        if (!reorderPages) throw new Error("Enter new page order.");
        const data = await smartFetch(
          "/pdf/reorder-pages",
          { file: fileKeys[0], order: reorderPages },
          "json"
        );
        setLinks([{ label: "Download Modified PDF", url: data.url }]);
        break;
      }

      /* ---------- WATERMARK ---------- */
      case "pdf-watermark": {
        if (!watermarkText) throw new Error("Enter watermark text.");
        const data = await smartFetch(
          "/pdf/watermark",
          { file: fileKeys[0], text: watermarkText },
          "json"
        );
        setLinks([{ label: "Download Watermarked PDF", url: data.url }]);
        break;
      }

      /* ---------- HTML ---------- */
      case "pdf/to-html": {
        const data = await smartFetch("/pdf/to-html", { file: fileKeys[0] }, "json");
        setLinks([{ label: "Download HTML", url: data.url }]);
        break;
      }

      /* ---------- EXISTING ROUTES ---------- */
      case "merge": {
        const data = await smartFetch("/pdf/merge", { files: fileKeys }, "json");
        setLinks([{ label: "Download merged PDF", url: data.url }]);
        break;
      }

      case "split": {
        const data = await smartFetch("/pdf/split", { file: fileKeys[0] }, "json");
        setLinks(data.pages.map((p: any) => ({ label: `Page ${p.page}`, url: p.url })));
        break;
      }

      case "compress": {
        const data = await smartFetch(
          "/pdf/compress",
          { file: fileKeys[0], level: "medium" },
          "json"
        );
        setLinks([{ label: "Download compressed PDF", url: data.url }]);
        break;
      }

      case "image-to-pdf": 
      case "pdf-spreadsheet":{
        const data = await smartFetch("/image/to-pdf", { files: fileKeys }, "json");
        setLinks([{ label: "Download PDF", url: data.pdfUrl }]);
        break;
      }

      case "protect-pdf": {
        if (!password) throw new Error("Password required.");
        const data = await smartFetch(
          "/pdf/encrypt",
          { file: fileKeys[0], password },
          "json"
        );
        setLinks([{ label: "Download encrypted PDF", url: data.url }]);
        break;
      }

      default:
        throw new Error("This tool is not wired to backend.");
    }
  }

  async function handleProcess() {
    if (!files?.length) return;

    try {
      setStatus("uploading");
      const uploaded = await uploadAllFiles(files);
      const keys = uploaded.map((u) => u.key);

      setStatus("processing");

      await callToolEndpoint(keys);

      setStatus("done");
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  }

  const hasResult = links.length > 0 || extractedText;

  return (
    <div className="space-y-6">
      {/* Upload box - matching home page design */}
      <div
        onClick={handleClick}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 px-8 py-16 text-center transition-all duration-300 hover:border-orange-400 hover:from-orange-100 hover:to-amber-100 hover:shadow-lg"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 text-white flex items-center justify-center text-3xl shadow-lg mb-4">
          📤
        </div>
        <p className="text-lg font-semibold text-slate-800">
          Click to upload or drag & drop
        </p>
        <p className="text-sm text-slate-600 mt-2">Your file will be processed instantly</p>
        {accept && <p className="text-xs text-slate-500 mt-3 bg-white bg-opacity-60 px-3 py-1 rounded-full">Supported: {accept}</p>}
      </div>

      {/* Tool inputs */}
      {toolId === "protect-pdf" && (
        <InputBox label="Password" value={password} onChange={setPassword} />
      )}

      {toolId === "pdf-remove-pages" && (
        <InputBox
          label="Pages to remove (e.g. 2,4,7 or 1-3)"
          value={removePages}
          onChange={setRemovePages}
        />
      )}

      {toolId === "pdf-reorder-pages" && (
        <InputBox
          label="New page order (e.g. 3,1,2)"
          value={reorderPages}
          onChange={setReorderPages}
        />
      )}

      {toolId === "pdf-watermark" && (
        <InputBox
          label="Watermark text"
          value={watermarkText}
          onChange={setWatermarkText}
        />
      )}

      {/* Selected files */}
      {files && (
        <div className="border border-orange-200 rounded-2xl p-4 bg-gradient-to-br from-orange-50 to-transparent">
          <p className="font-semibold mb-3 text-slate-800 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            Selected files:
          </p>
          {files.map((f) => (
            <div key={f.name} className="text-sm text-slate-700 ml-4 mb-2 flex items-center">
              <span className="text-orange-500 mr-2">📄</span>
              {f.name} • {(f.size / 1024 / 1024).toFixed(2)} MB
            </div>
          ))}
        </div>
      )}

      {/* Start button */}
      {files && (
        <button
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={status === "uploading" || status === "processing"}
          onClick={handleProcess}
        >
          {status === "uploading" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Uploading...
            </span>
          ) : status === "processing" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⚙️</span>
              Processing...
            </span>
          ) : (
            "Start Processing"
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-medium flex items-start gap-2">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {/* Processing state with animation */}
      {status === "processing" && (
        <div className="border-2 border-orange-200 rounded-2xl bg-gradient-to-br from-orange-50 to-transparent p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">⚡</div>
            </div>
          </div>
          <p className="text-lg font-semibold text-slate-800">Processing your file...</p>
          <p className="text-sm text-slate-600 mt-2">This may take a few moments</p>
        </div>
      )}

      {/* Results - Beautiful download box */}
      {hasResult && (
        <div className="border-2 border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">✅</span>
            <h3 className="text-2xl font-bold text-green-700">Ready to download!</h3>
          </div>

          {links.length > 0 && (
            <div className="space-y-3">
              {links.map((l) => (
                <button
                  key={l.url}
                  onClick={async () => {
                    try {
                      // Fetch the file with proper headers
                      const response = await fetch(l.url, {
                        method: 'GET',
                        headers: {
                          'X-API-KEY': import.meta.env.VITE_API_KEY || ''
                        }
                      });

                      if (!response.ok) {
                        throw new Error(`Download failed: ${response.statusText}`);
                      }

                      // Get blob and create download
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = l.label.replace(/\s+/g, '_').toLowerCase() || 'download';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      console.error('Download error:', err);
                      // Fallback: try direct download
                      const a = document.createElement('a');
                      a.href = l.url;
                      a.download = '';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }
                  }}
                  className="w-full flex items-center justify-between p-4 bg-white border border-green-200 rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer hover:bg-green-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📥</span>
                    <span className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors">
                      {l.label}
                    </span>
                  </div>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>
          )}

          {extractedText && (
            <div className="mt-6">
              <p className="font-semibold text-slate-800 mb-3">Extracted Text:</p>
              <pre className="max-h-96 overflow-auto bg-white border border-green-200 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap break-words">
                {extractedText}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(extractedText)}
                className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors z-10 relative"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// reusable input
const InputBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-800">{label}</label>
    <input
      type="text"
      className="rounded-xl border-2 border-orange-200 px-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
    />
  </div>
);

export default FileUploadArea;