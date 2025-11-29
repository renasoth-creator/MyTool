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

      case "extract-images": {
        const data = await postJson("/pdf/extract-images", { file: fileKeys[0] });
        return setLinks([{ label: "Download Images ZIP", url: data.url }]);
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
