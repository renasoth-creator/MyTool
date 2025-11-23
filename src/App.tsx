import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
      {/* DASHBOARD */}
      <Route path="/" element={<DashboardPage />} />

      {/* TOOL ROUTES */}
      {tools.map((tool) => (
        <Route
          key={tool.id}
          path={tool.route}
          element={<ToolPage toolId={tool.id} />}
        />
      ))}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/terms" element={<TermsPage />} />
<Route path="/privacy" element={<PrivacyPage />} />
<Route path="/cookies" element={<CookiesPage />} />
<Route path="/faq" element={<FaqPage />} />
<Route path="/blog" element={<BlogPage />} />


    </Routes>
    
  );
};

export default App;
