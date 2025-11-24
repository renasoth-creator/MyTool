import React from "react";
import { Link } from "react-router-dom";
import type { ToolConfig } from "../config/pdfToolsConfig";

interface ToolCardProps {
  tool: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const initial = tool.name.charAt(0).toUpperCase();

  return (
    <Link
      to={tool.route}
      className="group relative flex flex-col rounded-2xl bg-white px-5 py-4
                 border border-slate-200 border-b-4 border-b-orange-400
                 shadow-[0_10px_25px_rgba(15,23,42,0.08)]
                 transition-transform duration-200
                 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.16)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 text-lg font-semibold">
          {initial}
        </div>

        {tool.badge && (
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600">
            {tool.badge}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-900">
        {tool.name}
      </h3>
      <p className="mt-1 text-xs leading-snug text-slate-600 line-clamp-3">
        {tool.description}
      </p>

      <span className="mt-4 inline-flex items-center text-xs font-semibold text-orange-500 group-hover:text-orange-600">
        Open tool
        <span className="ml-1 translate-x-0 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
};

export default ToolCard;
