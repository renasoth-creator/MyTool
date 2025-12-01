import { useEffect } from "react";

export default function Popup({
  type = "success",
  message,
  onClose,
}: {
  type?: "success" | "error";
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white
        animate-slideIn
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}
