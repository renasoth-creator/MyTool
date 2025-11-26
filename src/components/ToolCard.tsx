import React from "react";
import { Link } from "react-router-dom";
import type { ToolConfig } from "../config/pdfToolsConfig";

interface ToolCardProps {
  tool: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const isComingSoon = tool.id === "coming-soon";

  // -----------------------------
  // COMING SOON CARD (NOT CLICKABLE)
  // -----------------------------
  if (isComingSoon) {
    return (
      <div
        className="
          block rounded-2xl bg-[#F9F9F9]
          border border-gray-200
          p-6
          shadow-sm opacity-60
          cursor-not-allowed select-none
        "
      >
        {/* ICON BOX */}
        <div
          className="
            flex items-center justify-center
            h-12 w-12 rounded-xl
            bg-gray-100 text-gray-400 text-2xl font-bold
            mb-4
          "
        >
          
        </div>

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-slate-500 mb-1">
          {tool.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500 mb-4">
          {tool.description}
        </p>

        {/* COMING SOON BADGE */}
        <span className="text-xs px-2 py-1 rounded bg-gray-300 text-gray-700 font-semibold">
          Coming Soon
        </span>
      </div>
    );
  }

  // -----------------------------
  // NORMAL CLICKABLE CARD
  // -----------------------------
  return (
    <Link
      to={tool.route}
      className="
        block rounded-2xl bg-[#F9F9F9]
        border border-gray-200
        p-6
        shadow-sm
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:border-orange-500
      "
    >
      {/* ICON BOX */}
      <div
        className="
          flex items-center justify-center
          h-12 w-12 rounded-xl
          bg-orange-50 text-orange-500 text-2xl font-bold
          mb-4
        "
      >
        {tool.icon}
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        {tool.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-600 mb-4">
        {tool.description}
      </p>

      {/* CTA */}
      <span className="text-orange-600 font-semibold text-sm">
        Explore the product →
      </span>
    </Link>
  );
};

export default ToolCard;
