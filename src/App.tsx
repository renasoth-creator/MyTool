
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import DashboardPage from "./pages/DashboardPage";
import ToolPage from "./pages/ToolPage";
import { tools } from "./config/pdfToolsConfig";

const App: React.FC = () => {
  return (
    <Routes>

      {/* DASHBOARD - ALWAYS ACCESSIBLE */}
      <Route path="/" element={<DashboardPage onLogout={() => {}} />} />

      {/* TOOL PAGES - ALWAYS ACCESSIBLE */}
      {tools.map((tool) => (
        <Route
          key={tool.id}
          path={tool.route}
          element={<ToolPage toolId={tool.id} onLogout={() => {}} />}
        />
      ))}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
