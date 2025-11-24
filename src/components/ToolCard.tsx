import React from "react";
import { Link } from "react-router-dom";
import type { ToolConfig } from "../config/pdfToolsConfig";

interface ToolCardProps {
  tool: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link
      to={tool.route}
      className="
        block rounded-2xl bg-white
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
          h- w-12 rounded-xl
          border border-orange-400
          text-orange-500 text-xl font-bold
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
