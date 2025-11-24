import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ToolPage from "./pages/ToolPage";
import { tools } from "./config/pdfToolsConfig";

import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import FaqPage from "./pages/FaqPage";
import BlogPage from "./pages/BlogPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Home / tools grid */}
      <Route path="/" element={<DashboardPage />} />

      {/* Dynamic tool pages */}
      {tools.map((tool) => (
        <Route
          key={tool.id}
          path={tool.route}
          element={<ToolPage toolId={tool.id} />}
        />
      ))}

      {/* Static pages */}
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/blog" element={<BlogPage />} />

      {/* Fallback – send unknown routes to home */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
