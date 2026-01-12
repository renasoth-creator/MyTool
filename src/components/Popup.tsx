import { useEffect } from "react";

export default function Popup({
  type = "success",
  title,
  message,
  onClose,
}: {
  type?: "success" | "error" | "info";
  title?: string;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(t);
  }, []);

  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  }[type];

  return (
    <div
      className={`
        fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white
        animate-slideIn max-w-sm
        ${bgColor}
      `}
    >
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div>{message}</div>
    </div>
  );
}
