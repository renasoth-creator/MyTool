﻿import React from "react";
import { Link } from "react-router-dom";
import type { ToolConfig } from "../config/tools";

interface ToolCardProps {
  tool: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link
      to={tool.route}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 text-lg font-semibold">
          {tool.name.charAt(0)}
        </div>
        {tool.badge && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-600">
            {tool.badge}
          </span>
        )}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        {tool.name}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-2">{tool.description}</p>
      <span className="mt-3 text-xs font-medium text-sky-600 group-hover:underline">
        Open tool →
      </span>
    </Link>
  );
};

export default ToolCard;