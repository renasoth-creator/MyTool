// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ToolPage from "./pages/ToolPage";
import AllToolsPage from "./pages/AllToolsPage";
import { tools } from "./config/pdfToolsConfig";

import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerified from "./pages/EmailVerified";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import AccountSettings from "./pages/AccountSettings";

import Verify2FA from "./pages/Verify2FA";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// OPTIONAL PAGES — enable if you want
 import TermsPage from "./pages/TermsPage";
 import PrivacyPage from "./pages/PrivacyPage";
 import CookiesPage from "./pages/CookiesPage";
 import FaqPage from "./pages/FaqPage";
 import BlogPage from "./pages/BlogPage";
 import Contact from "./pages/Contact";
 //import ConversionHistory from "./pages/ConversionHistory";


const App: React.FC = () => {
  return (
    <Routes>
      {/* HOMEPAGE */}
      <Route path="/" element={<DashboardPage />} />

      {/* ALL TOOLS PAGE */}
      <Route path="/all-tools" element={<AllToolsPage />} />
      {tools.map((tool) => (
        <Route
          key={tool.id}
          path={tool.route}
          element={<ToolPage toolId={tool.id} />}
        />
      ))}

      {/* AUTH ROUTES */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/*<Route path="/history" element={<ConversionHistory />} />*/}


      {/* ACCOUNT SETTINGS */}
      {/* IMPORTANT: must match /account/* */}
      <Route path="/account/*" element={<AccountSettings />} />

      {/* 2FA */}
      <Route path="/verify-2fa" element={<Verify2FA />} />

      {/* PASSWORD RESET */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<Contact />} />


      {/* DEFAULT ROUTE */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
