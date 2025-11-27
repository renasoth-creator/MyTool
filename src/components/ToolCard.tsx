import React from "react";
import { Link } from "react-router-dom";
import type { ToolConfig } from "../config/pdfToolsConfig";

interface ToolCardProps {
  tool: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const isComingSoon = tool.id === "coming-soon";

  // -----------------------------
  // COMING SOON CARD
  // -----------------------------
  if (isComingSoon) {
    return (
      <div
        className="
          block rounded-2xl bg-[#F9F9F9]
          border border-gray-200
          p-6 h-full
          shadow-sm opacity-60
          cursor-not-allowed select-none
          flex flex-col justify-between
        "
      >
        {/* ICON BOX */}
        <div
          className="
            flex items-center justify-center
            h-12 w-12 rounded-xl
            bg-[#F9F9F9f] border border-gray-200
            text-gray-400 text-2xl font-bold
            mb-4
          "
        >
          
        </div>

        {/* TEXT */}
        <div>
          <h3 className="text-lg font-semibold text-slate-500 mb-1">
            {tool.name}
          </h3>

          <p className="text-sm text-slate-500 mb-4">
            {tool.description}
          </p>
        </div>

        {/* BADGE */}
        <span className="text-xs px-2 py-1 rounded bg-gray-300 text-gray-700 font-semibold">
          Coming Soon
        </span>
      </div>
    );
  }

  // -----------------------------
  // NORMAL CARD
  // -----------------------------
  return (
    <Link
      to={tool.route}
      className="
        block rounded-2xl bg-[#F9F9F9]
        border border-gray-200
        p-6 h-full
        shadow-sm flex flex-col justify-between
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:border-orange-500
      "
    >
      {/* ICON BOX */}
      <div
        className="
          flex items-center justify-center
          h-12 w-12 rounded-xl
          bg-[#F9F9F9] border border-gray-200
          text-orange-500 text-2xl font-bold
          mb-4
        "
      >
        {tool.icon}
      </div>

      {/* TEXT */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          {tool.name}
        </h3>

        <p className="text-sm text-slate-600 mb-4">
          {tool.description}
        </p>
      </div>

      {/* CTA */}
      <span className="text-orange-600 font-semibold text-sm">
        Explore the product →
      </span>
    </Link>
  );
};

export default ToolCard;
