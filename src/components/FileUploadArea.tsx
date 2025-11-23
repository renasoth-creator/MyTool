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
  const [password, setPassword] = useState<string>(""); // for protect-pdf

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const arr = Array.from(fileList);
    setFiles(arr);
    setLinks([]);
    setExtractedText(null);
    setError(null);
    setStatus("idle");
  };

  async function uploadSingleFile(file: File): Promise<UploadedFileInfo> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    return { key: data.key, url: data.url };
  }

  async function uploadAllFiles(files: File[]): Promise<UploadedFileInfo[]> {
    const out: UploadedFileInfo[] = [];
    for (const f of files) {
      const info = await uploadSingleFile(f);
      out.push(info);
    }
    return out;
  }

  async function callToolEndpoint(fileKeys: string[]): Promise<void> {
    setLinks([]);
    setExtractedText(null);
    setError(null);

    // Helper for JSON calls
    async function postJson(path: string, body: unknown) {
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

    switch (toolId) {
      case "merge": {
        const data = await postJson("/pdf/merge", { files: fileKeys });
        setLinks([
          {
            label: "Download merged PDF",
            url: data.url,
          },
        ]);
        break;
      }

      case "split": {
        const data = await postJson("/pdf/split", { file: fileKeys[0] });
        const resultLinks: ResultLink[] =
          (data.pages || []).map((p: any) => ({
            label: `Page ${p.page}`,
            url: p.url,
          })) || [];
        setLinks(resultLinks);
        break;
      }

      case "compress": {
        const data = await postJson("/pdf/compress", {
          file: fileKeys[0],
          level: "medium",
        });
        setLinks([
          {
            label: "Download compressed PDF",
            url: data.url,
          },
        ]);
        break;
      }

      case "image-to-pdf": {
        const data = await postJson("/image/to-pdf", { files: fileKeys });
        setLinks([
          {
            label: "Download converted PDF",
            url: data.pdfUrl,
          },
        ]);
        break;
      }

      case "pdf-to-text": {
        const data = await postJson("/pdf/to-text", { file: fileKeys[0] });
        setExtractedText(data.text || "");
        break;
      }

      case "docx-to-pdf":
      case "xlsx-to-pdf":
      case "pptx-to-pdf":
      case "html-to-pdf": {
        const data = await postJson("/office/to-pdf", { file: fileKeys[0] });
        setLinks([
          {
            label: "Download converted PDF",
            url: data.pdfUrl,
          },
        ]);
        break;
      }

      case "protect-pdf": {
        if (!password) {
          throw new Error("Password is required to protect the PDF");
        }
        const data = await postJson("/pdf/encrypt", {
          file: fileKeys[0],
          password,
        });
        setLinks([
          {
            label: "Download protected PDF",
            url: data.url,
          },
        ]);
        break;
      }

      default:
        throw new Error("This tool is not wired to the backend yet.");
    }
  }

  const handleProcess = async () => {
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
  };

  const hasResult = links.length > 0 || !!extractedText;

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        onClick={handleClick}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 text-center transition hover:border-sky-300 hover:bg-sky-50/40"
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-2xl text-white shadow-md">
          ⬆️
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Click to upload or drag &amp; drop
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {accept ? `Supported: ${accept}` : "Upload your file(s) to get started"}
        </p>
      </div>

      {/* Password field for protect-pdf */}
      {toolId === "protect-pdf" && (
        <div className="flex flex-col gap-1 text-sm">
          <label className="text-xs font-medium text-slate-700">
            Password for this PDF
          </label>
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
      )}

      {/* Selected files list */}
      {files && files.length > 0 && (
        <div className="rounded-xl border border-slate-100 bg-white p-3 text-xs text-left">
          <p className="mb-1 font-semibold text-slate-700">Selected files:</p>
          <ul className="space-y-1 text-slate-600">
            {files.map((file) => (
              <li key={file.name} className="flex justify-between gap-2">
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-[11px] text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action button */}
      {files && files.length > 0 && (
        <button
          type="button"
          onClick={handleProcess}
          disabled={status === "uploading" || status === "processing"}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-sky-600 hover:to-indigo-600 disabled:opacity-60"
        >
          {status === "uploading"
            ? "Uploading..."
            : status === "processing"
            ? "Processing..."
            : "Start"}
        </button>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Premium-style result card */}
      {hasResult && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 p-[1px] shadow-lg">
          <div className="flex flex-col gap-3 rounded-[14px] bg-slate-950/95 p-4 text-xs text-slate-100 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-lg">
                ✅
              </div>
              <div>
                <p className="text-sm font-semibold">Your file is ready</p>
                {links.length > 0 && (
                  <p className="mt-1 text-[11px] text-slate-300">
                    We’ve processed your file. Click the button to download your
                    result.
                  </p>
                )}
                {extractedText && (
                  <p className="mt-1 text-[11px] text-slate-300">
                    Text extracted successfully. Scroll below to view it.
                  </p>
                )}
              </div>
            </div>

            {links.length > 0 && (
              <div className="flex flex-col items-stretch gap-2 sm:items-end">
                {/* Main download (first link) */}
                <a
                  href={links[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 shadow hover:bg-emerald-300"
                >
                  Download file
                </a>

                {/* Extra links if split, etc */}
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        "Multiple files created. Scroll below to see all links."
                      )
                    }
                    className="text-[11px] text-slate-300 underline"
                  >
                    Show all parts
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* All result links (for split, etc.) */}
      {links.length > 1 && (
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800">
          <p className="mb-2 font-semibold">All generated files:</p>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Extracted text block */}
      {extractedText && (
        <div className="max-h-80 overflow-auto rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 whitespace-pre-wrap">
          {extractedText}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
