import React, { useRef, useState } from "react";
import type { ToolId } from "../config/pdfToolsConfig";
import { BACKEND_URL } from "../config/backend";

interface FileUploadAreaProps {
  accept?: string;
  multiple?: boolean;
  toolId: ToolId;
}

type Status = "idle" | "uploading" | "processing" | "done" | "error";

interface ResultLink {
  label: string;
  url: string;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  accept,
  multiple = false,
  toolId,
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
    setFiles(Array.from(fileList));
    setLinks([]);
    setExtractedText(null);
    setError(null);
    setStatus("idle");
  };

  async function uploadSingleFile(file: File): Promise<{ key: string; url: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return await res.json();
  }

  async function uploadAllFiles(files: File[]): Promise<{ key: string; url: string }[]> {
    const uploaded: { key: string; url: string }[] = [];
    for (const f of files) {
      const result = await uploadSingleFile(f);
      uploaded.push(result);
    }
    return uploaded;
  }

  async function callToolEndpoint(fileKeys: string[]) {
    // Clear previous
    setLinks([]);
    setExtractedText(null);
    setError(null);

    switch (toolId) {
      case "merge": {
        const res = await fetch(`${BACKEND_URL}/pdf/merge`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files: fileKeys }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Merge failed");
        setLinks([
          {
            label: "Download merged PDF",
            url: data.url,
          },
        ]);
        break;
      }

      case "split": {
        const res = await fetch(`${BACKEND_URL}/pdf/split`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: fileKeys[0] }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Split failed");
        const resultLinks: ResultLink[] =
          (data.pages || []).map((p: any) => ({
            label: `Page ${p.page}`,
            url: p.url,
          })) || [];
        setLinks(resultLinks);
        break;
      }

      case "compress": {
        const res = await fetch(`${BACKEND_URL}/pdf/compress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: fileKeys[0], level: "medium" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Compress failed");
        setLinks([
          {
            label: "Download compressed PDF",
            url: data.url,
          },
        ]);
        break;
      }

      case "image-to-pdf": {
        const res = await fetch(`${BACKEND_URL}/image/to-pdf`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files: fileKeys }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Image to PDF failed");
        setLinks([
          {
            label: "Download converted PDF",
            url: data.pdfUrl,
          },
        ]);
        break;
      }

      case "pdf-to-text": {
        const res = await fetch(`${BACKEND_URL}/pdf/to-text`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: fileKeys[0] }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "PDF to text failed");
        setExtractedText(data.text || "");
        break;
      }

      case "docx-to-pdf":
      case "xlsx-to-pdf":
      case "pptx-to-pdf":
      case "html-to-pdf": {
        const res = await fetch(`${BACKEND_URL}/office/to-pdf`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: fileKeys[0] }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Office to PDF failed");
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
          throw new Error("Password is required for protection");
        }
        const res = await fetch(`${BACKEND_URL}/pdf/encrypt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: fileKeys[0], password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Encrypt failed");
        setLinks([
          {
            label: "Download protected PDF",
            url: data.url,
          },
        ]);
        break;
      }

      default:
        throw new Error("Tool not implemented in frontend");
    }
  }

  const handleProcess = async () => {
    if (!files || files.length === 0) return;
    setStatus("uploading");
    setError(null);

    try {
      const uploads = await uploadAllFiles(files);
      const keys = uploads.map((u) => u.key);

      setStatus("processing");
      await callToolEndpoint(keys);

      setStatus("done");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Box */}
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
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-500 text-2xl">
          ⬆️
        </div>
        <p className="text-sm font-medium text-slate-800">
          Click to upload or drag &amp; drop
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {accept ? `Supported: ${accept}` : "Any file type for now"}
        </p>
      </div>

      {/* Password for protect-pdf */}
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

      {/* Selected files */}
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
          className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:opacity-60"
          type="button"
          onClick={handleProcess}
          disabled={status === "uploading" || status === "processing"}
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
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Download links */}
      {links.length > 0 && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-900">
          <p className="mb-2 font-semibold">Your file(s) are ready:</p>
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

      {/* Extracted text */}
      {extractedText && (
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 max-h-64 overflow-auto whitespace-pre-wrap">
          {extractedText}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
