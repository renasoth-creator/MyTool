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

  // Special tool inputs
  const [password, setPassword] = useState("");
  const [removePages, setRemovePages] = useState("");
  const [reorderPages, setReorderPages] = useState("");
  const [watermarkText, setWatermarkText] = useState("");

  const handleClick = () => inputRef.current?.click();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setFiles(Array.from(fileList));
    setLinks([]);
    setExtractedText(null);
    setError(null);
    setStatus("idle");
  };

  // Upload file → /upload
  async function uploadSingleFile(file: File): Promise<UploadedFileInfo> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${BACKEND_URL}/upload`, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return { key: data.key, url: data.url };
  }

  async function uploadAllFiles(files: File[]): Promise<UploadedFileInfo[]> {
    const arr: UploadedFileInfo[] = [];
    for (const f of files) arr.push(await uploadSingleFile(f));
    return arr;
  }

  // Helper: POST JSON
  async function postJson(path: string, body: any) {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Backend error:", data);
      throw new Error(data.error || "Request failed");
    }
    return data;
  }

  // -----------------------------------
  // MAIN SWITCH — BACKEND ROUTES FIXED
  // -----------------------------------
  async function callToolEndpoint(fileKeys: string[]) {
    setLinks([]);
    setExtractedText(null);
    setError(null);

    switch (toolId) {
      // ----------------------------
      // EXISTING TOOLS
      // ----------------------------
      case "merge":
        return setLinks([{ label: "Download merged PDF", url: (await postJson("/pdf/merge", { files: fileKeys })).url }]);

      case "split":
        const split = await postJson("/pdf/split", { file: fileKeys[0] });
        return setLinks(split.pages.map((p: any) => ({ label: `Page ${p.page}`, url: p.url })));

      case "compress":
        return setLinks([{ label: "Download PDF", url: (await postJson("/pdf/compress", { file: fileKeys[0], level: "medium" })).url }]);

      case "image-to-pdf":
      case "pdf-spreadsheet":
        const itp = await postJson("/image/to-pdf", { files: fileKeys });
        return setLinks([{ label: "Download PDF", url: itp.pdfUrl }]);

      case "pdf-to-text":
        const text = await postJson("/pdf/to-text", { file: fileKeys[0] });
        return setExtractedText(text.text || "");

      case "protect-pdf":
        if (!password) throw new Error("Password required");
        const locked = await postJson("/pdf/encrypt", { file: fileKeys[0], password });
        return setLinks([{ label: "Download protected PDF", url: locked.url }]);

      // ----------------------------
      // NEW TOOLS — CORRECT ROUTES
      // ----------------------------
      case "pdf-docx": {
        const data = await postJson("/pdf-docx", { file: fileKeys[0] });
        return setLinks([{ label: "Download DOCX", url: data.url }]);
      }

      case "pdf-to-image": {
        const data = await postJson("/pdf/to-images", { file: fileKeys[0] });
        return setLinks([{ label: "Download ZIP", url: data.url }]);
      }

      case "pdf-to-image": {
    const res = await fetch(`${BACKEND_URL}/pdf-to-images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: fileKeys[0] })
    });

    if (!res.ok) throw new Error("Failed to generate images");

    const blob = await res.blob();
    const downloadUrl = URL.createObjectURL(blob);

    setLinks([{ label: "Download ZIP", url: downloadUrl }]);
    break;
}


      case "pdf-to-pptx": {
        const data = await postJson("/pdf/to-pptx", { file: fileKeys[0] });
        return setLinks([{ label: "Download PPTX", url: data.url }]);
      }

      case "pdf-to-excel": {
        const data = await postJson("/pdf/to-excel", { file: fileKeys[0] });
        return setLinks([{ label: "Download XLSX", url: data.url }]);
      }

      case "pdf-remove-pages": {
        if (!removePages) throw new Error("Enter pages to remove");
        const data = await postJson("/pdf/remove-pages", { file: fileKeys[0], pages: removePages });
        return setLinks([{ label: "Download PDF", url: data.url }]);
      }

      case "pdf-reorder-pages": {
        if (!reorderPages) throw new Error("Enter new page order");
        const data = await postJson("/pdf/reorder-pages", { file: fileKeys[0], order: reorderPages });
        return setLinks([{ label: "Download PDF", url: data.url }]);
      }

      case "pdf-watermark": {
        if (!watermarkText) throw new Error("Enter watermark text");
        const data = await postJson("/pdf/watermark", { file: fileKeys[0], text: watermarkText });
        return setLinks([{ label: "Download PDF", url: data.url }]);
      }

      case "pdf-ocr": {
        const data = await postJson("/pdf/ocr", { file: fileKeys[0] });
        return setExtractedText(data.text || "");
      }

      case "pdf-to-html": {
        const data = await postJson("/pdf/to-html", { file: fileKeys[0] });
        return setLinks([{ label: "Download HTML", url: data.url }]);
      }

      default:
        throw new Error("Tool not wired to backend");
    }
  }

  // -----------------------------------
  // PROCESS → Upload → Call Tool
  // -----------------------------------
  async function handleProcess() {
    if (!files || files.length === 0) return;

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
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  }

  const hasResult = links.length > 0 || extractedText;

  return (
    <div className="space-y-4">

      {/* Upload area */}
      <div
        onClick={handleClick}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 text-center transition hover:border-sky-300 hover:bg-sky-50/40"
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-2xl text-white shadow-md">
          ⬆️
        </div>
        <p className="text-sm font-semibold text-slate-800">Click to upload or drag & drop</p>
        <p className="mt-1 text-xs text-slate-500">{accept ? `Supported: ${accept}` : ""}</p>
      </div>

      {/* SPECIAL TOOL INPUTS ----------------------------------- */}

      {toolId === "protect-pdf" && (
        <div className="flex flex-col gap-1 text-sm">
          <label className="text-xs font-medium text-slate-700">Password</label>
          <input
            type="password"
            className="rounded-xl border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {toolId === "pdf-remove-pages" && (
        <div className="flex flex-col gap-1 text-sm">
          <label className="text-xs font-medium text-slate-700">Pages to remove (e.g. 2,4,7)</label>
          <input
            type="text"
            className="rounded-xl border px-3 py-2"
            value={removePages}
            onChange={(e) => setRemovePages(e.target.value)}
          />
        </div>
      )}

      {toolId === "pdf-reorder-pages" && (
        <div className="flex flex-col gap-1 text-sm">
          <label className="text-xs font-medium text-slate-700">New order (e.g. 3,1,2)</label>
          <input
            type="text"
            className="rounded-xl border px-3 py-2"
            value={reorderPages}
            onChange={(e) => setReorderPages(e.target.value)}
          />
        </div>
      )}

      {toolId === "pdf-watermark" && (
        <div className="flex flex-col gap-1 text-sm">
          <label className="text-xs font-medium text-slate-700">Watermark text</label>
          <input
            type="text"
            className="rounded-xl border px-3 py-2"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
          />
        </div>
      )}

      {/* Selected files */}
      {files && files.length > 0 && (
        <div className="rounded-xl border p-3 text-xs bg-white">
          <p className="font-semibold">Selected files:</p>
          <ul className="mt-1">
            {files.map((f) => (
              <li key={f.name}>
                {f.name} — {(f.size / 1024 / 1024).toFixed(2)} MB
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Button */}
      {files && files.length > 0 && (
        <button
          onClick={handleProcess}
          disabled={status === "uploading" || status === "processing"}
          className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {status === "uploading"
            ? "Uploading..."
            : status === "processing"
            ? "Processing..."
            : "Start"}
        </button>
      )}

      {/* Error */}
      {error && <div className="p-3 rounded-xl bg-red-50 border text-red-700 text-xs">{error}</div>}

      {/* Result */}
      {hasResult && (
        <div className="rounded-xl border bg-white p-3 text-xs">
          <p className="font-semibold mb-2">Your result:</p>

          {links.length > 0 &&
            links.map((l) => (
              <a key={l.url} href={l.url} className="block text-sky-600 underline" target="_blank">
                {l.label}
              </a>
            ))}

          {extractedText && (
            <pre className="mt-3 max-h-80 overflow-auto bg-slate-50 p-3 rounded-xl">
              {extractedText}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
