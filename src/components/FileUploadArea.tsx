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
    <div className="space-y-4">
      {/* Upload box */}
      <div
        onClick={handleClick}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 text-center hover:border-sky-300 hover:bg-sky-50"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
        <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center text-2xl">
          ⬆️
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-800">
          Click to upload or drag & drop
        </p>
        {accept && <p className="text-xs text-slate-500 mt-1">Supported: {accept}</p>}
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
        <div className="border rounded-xl p-3 text-xs bg-white">
          <p className="font-semibold mb-1">Selected files:</p>
          {files.map((f) => (
            <div key={f.name}>
              {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          ))}
        </div>
      )}

      {/* Start button */}
      {files && (
        <button
          className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-sm text-white font-semibold shadow disabled:opacity-50"
          disabled={status === "uploading" || status === "processing"}
          onClick={handleProcess}
        >
          {status === "uploading"
            ? "Uploading..."
            : status === "processing"
            ? "Processing..."
            : "Start"}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-700 p-2 rounded-xl text-xs">
          {error}
        </div>
      )}

      {/* Results */}
      {hasResult && (
        <div className="border rounded-xl bg-white p-3 text-xs">
          <p className="font-semibold mb-2">Your result:</p>

          {links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              className="text-sky-600 underline block"
            >
              {l.label}
            </a>
          ))}

          {extractedText && (
            <pre className="mt-2 max-h-80 overflow-auto bg-slate-50 p-3 rounded-xl">
              {extractedText}
            </pre>
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
  <div className="flex flex-col gap-1 text-sm">
    <label className="text-xs font-medium text-slate-700">{label}</label>
    <input
      type="text"
      className="rounded-xl border px-3 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default FileUploadArea;