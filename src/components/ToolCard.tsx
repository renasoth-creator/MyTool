import React from "react";
import { Link } from "react-router-dom";
import type { ToolConfig } from "../config/pdfToolsConfig";
import * as Icons from "lucide-react";

interface ToolCardProps {
  tool: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // Get the icon component from lucide-react
  const getIcon = () => {
    if (!tool.icon) return null;
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[tool.icon];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  // Scroll to top when clicking tool
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={tool.route}
      onClick={handleClick}
      className="
        block rounded-2xl bg-[#FDFDFF]
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
          text-orange-500
          mb-4
          transition-transform duration-300
        "
      >
        {getIcon()}
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
    </Link>
  );
};

export default ToolCard;
