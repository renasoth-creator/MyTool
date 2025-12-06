// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";

import DashboardPage from "./pages/DashboardPage";
import ToolPage from "./pages/ToolPage";
import { tools } from "./config/pdfToolsConfig";

import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import FaqPage from "./pages/FaqPage";
import BlogPage from "./pages/BlogPage";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerified from "./pages/EmailVerified";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import Verify2FA from "./pages/Verify2FA";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<DashboardPage />} />

          {/* TOOL ROUTES */}
          {tools.map((tool) => (
            <Route
              key={tool.id}
              path={tool.route}
              element={<ToolPage toolId={tool.id} />}
            />
          ))}

          {/* ACCOUNT ROUTES */}
          <Route path="/account/*" element={<AccountSettings />} />

          {/* AUTH ROUTES */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/login" element={<Login />} />

          <Route path="/verify-2fa" element={<Verify2FA />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* FALLBACK */}
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
