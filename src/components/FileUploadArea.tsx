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

  // ---------------------------------------
  // UPLOAD: /upload → returns { key, url }
  // ---------------------------------------
  async function uploadSingleFile(file: File): Promise<UploadedFileInfo> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return await res.json();
  }

  async function uploadAllFiles(files: File[]) {
    const uploaded: UploadedFileInfo[] = [];
    for (const f of files) {
      uploaded.push(await uploadSingleFile(f));
    }
    return uploaded;
  }

  // ---------------------------------------
  // UNIVERSAL fetch (handles JSON or FILE)
  // ---------------------------------------
  async function smartFetch(
    path: string,
    body: any,
    returnType: "json" | "file"
  ) {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method: "POST",
      body: returnType === "json" ? JSON.stringify(body) : body,
      headers:
        returnType === "json"
          ? { "Content-Type": "application/json" }
          : undefined,
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

    if (returnType === "file") {
      const blob = await res.blob();
      return { url: URL.createObjectURL(blob) };
    }

    return await res.json();
  }

  // ---------------------------------------
  // MAIN TOOL ROUTER — ALL ROUTES FIXED
  // ---------------------------------------
  async function callToolEndpoint(fileKeys: string[]) {
    setLinks([]);
    setExtractedText(null);
    setError(null);

    const FILE = "file";
    const JSON = "json";

    switch (toolId) {
      // ----------------------------
      // JSON ENDPOINTS
      // ----------------------------
      case "pdf-to-text": {
        const data = await smartFetch("/pdf/to-text", { file: fileKeys[0] }, JSON);
        setExtractedText(data.text);
        break;
      }

      case "pdf-ocr": {
        const data = await smartFetch("/pdf/ocr", { file: fileKeys[0] }, JSON);
        setExtractedText(data.text);
        break;
      }

      // ----------------------------
      // FILE ENDPOINTS
      // ----------------------------

      case "pdf-docx": {
        const data = await smartFetch("/pdf-docx", { file: fileKeys[0] }, JSON);
        setLinks([{ label: "Download DOCX", url: data.url }]);
        break;
      }

      case "pdf/to-image": {
        const data = await smartFetch("/pdf/to-images", { file: fileKeys[0] }, FILE);
        setLinks([{ label: "Download ZIP", url: data.url }]);
        break;
      }

      case "extract-images": {
        const data = await smartFetch("/extract-images", { file: fileKeys[0] }, FILE);
        setLinks([{ label: "Download Images ZIP", url: data.url }]);
        break;
      }

      case "pdf-to-pptx": {
        const data = await smartFetch("/pdf/to-pptx", { file: fileKeys[0] }, FILE);
        setLinks([{ label: "Download PPTX", url: data.url }]);
        break;
      }

      case "pdf-to-excel": {
        const data = await smartFetch("/pdf/to-excel", { file: fileKeys[0] }, FILE);
        setLinks([{ label: "Download XLSX", url: data.url }]);
        break;
      }

      case "pdf-remove-pages": {
        if (!removePages) throw new Error("Enter pages to remove.");
        const data = await smartFetch(
          "/pdf/remove-pages",
          { file: fileKeys[0], pages: removePages },
          FILE
        );
        setLinks([{ label: "Download PDF", url: data.url }]);
        break;
      }

      case "pdf-reorder-pages": {
        if (!reorderPages) throw new Error("Enter reordered page order.");
        const data = await smartFetch(
          "/pdf/reorder-pages",
          { file: fileKeys[0], order: reorderPages },
          FILE
        );
        setLinks([{ label: "Download PDF", url: data.url }]);
        break;
      }

      case "pdf-watermark": {
        if (!watermarkText) throw new Error("Enter watermark text.");
        const data = await smartFetch(
          "/pdf/watermark",
          { file: fileKeys[0], text: watermarkText },
          FILE
        );
        setLinks([{ label: "Download PDF", url: data.url }]);
        break;
      }

      case "pdf-to-html": {
        const data = await smartFetch("/pdf/to-html", { file: fileKeys[0] }, FILE);
        setLinks([{ label: "Download HTML", url: data.url }]);
        break;
      }

      // ----------------------------
      // EXISTING BACKEND ROUTES
      // ----------------------------

      case "merge": {
        const data = await smartFetch("/pdf/merge", { files: fileKeys }, JSON);
        setLinks([{ label: "Download merged PDF", url: data.url }]);
        break;
      }

      case "split": {
        const data = await smartFetch("/pdf/split", { file: fileKeys[0] }, JSON);
        setLinks(data.pages.map((p: any) => ({ label: `Page ${p.page}`, url: p.url })));
        break;
      }

      case "compress": {
        const data = await smartFetch(
          "/pdf/compress",
          { file: fileKeys[0], level: "medium" },
          JSON
        );
        setLinks([{ label: "Download compressed PDF", url: data.url }]);
        break;
      }

      case "image-to-pdf":
      case "pdf-spreadsheet": {
        const data = await smartFetch("/image/to-pdf", { files: fileKeys }, JSON);
        setLinks([{ label: "Download PDF", url: data.pdfUrl }]);
        break;
      }

      case "protect-pdf": {
        if (!password) throw new Error("Password required.");
        const data = await smartFetch(
          "/pdf/encrypt",
          { file: fileKeys[0], password },
          JSON
        );
        setLinks([{ label: "Download protected PDF", url: data.url }]);
        break;
      }

      default:
        throw new Error("This tool is not wired to backend.");
    }
  }

  // ---------------------------------------
  // PROCESS → Upload → Convert
  // ---------------------------------------
  async function handleProcess() {
    if (!files?.length) return;

    setStatus("uploading");
    setError(null);

    try {
      const uploaded = await uploadAllFiles(files);
      const keys = uploaded.map((u) => u.key);

      setStatus("processing");
      await callToolEndpoint(keys);

      setStatus("done");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus("error");
    }
  }

  const hasResult = links.length > 0 || extractedText;

  return (
    <div className="space-y-4">
      {/* Upload area */}
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
        {accept && (
          <p className="text-xs text-slate-500 mt-1">Supported: {accept}</p>
        )}
      </div>

      {/* Special inputs */}
      {toolId === "protect-pdf" && (
        <InputBox label="Password" value={password} onChange={setPassword} />
      )}

      {toolId === "pdf-remove-pages" && (
        <InputBox
          label="Pages to remove (2,4,7)"
          value={removePages}
          onChange={setRemovePages}
        />
      )}

      {toolId === "pdf-reorder-pages" && (
        <InputBox
          label="New page order (3,1,2)"
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

// --------------------------------------------
// Reusable Input Box
// --------------------------------------------
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
