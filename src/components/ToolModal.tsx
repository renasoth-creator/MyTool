import React, { useRef, useState } from "react";
import type { Tool } from "./ToolCard";

interface ToolModalProps {
  tool: Tool;
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      // Just show the name for now – no upload logic yet
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-soft">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-lg">{tool.icon}</span>
              {tool.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              UI only for now – backend integration will come later.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-5 text-sm">
          {/* Step 1: Upload */}
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step 1 – Upload your file
            </h3>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-brand-500 hover:bg-brand-50/40"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="text-xl">📄</span>
              </div>
              <p className="mt-3 text-xs font-medium text-slate-800">
                Drop your file here or{" "}
                <span className="text-brand-600 underline">browse</span>
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Max size 25MB. We will add real limits when backend is wired.
              </p>
              {fileName && (
                <p className="mt-2 rounded-full bg-white px-3 py-1 text-[11px] text-slate-600 shadow-sm">
                  Selected: <span className="font-semibold">{fileName}</span>
                </p>
              )}
            </div>
          </section>

          {/* Step 2: Options (just placeholder switches) */}
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step 2 – Options
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                <span>Keep original quality</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                <span>Notify when done (email)</span>
                <input type="checkbox" className="h-4 w-4" />
              </label>
            </div>
          </section>

          {/* Step 3: Convert */}
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step 3 – Convert
            </h3>
            <button
              type="button"
              disabled
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <span>Convert (coming soon)</span>
            </button>
            <p className="mt-1 text-[11px] text-slate-500">
              Once backend is connected, this button will send your file to the
              API and return a download link.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;
