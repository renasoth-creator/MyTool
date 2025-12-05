import { Routes, Route, Navigate } from "react-router-dom";

import Profile from "./account/Profile";
import Security from "./account/Security";
import EmailSettings from "./account/Email";
import Sessions from "./account/Sessions";
import DangerZone from "./account/DangerZone";

/**
 * This router handles ONLY the internal nested pages:
 *
 * /account/profile
 * /account/security
 * /account/email
 * /account/sessions
 * /account/danger
 *
 * Parent routing is done in App.tsx:
 * <Route path="/account/*" element={<AccountSettings />} />
 */

export default function AccountSettings() {
  return (
    <Routes>

      <Route path="profile" element={<Profile />} />
      <Route path="security" element={<Security />} />
      <Route path="email" element={<EmailSettings />} />
      <Route path="sessions" element={<Sessions />} />
      <Route path="danger" element={<DangerZone />} />

      {/* DEFAULT: redirect to profile */}
      <Route path="*" element={<Navigate to="/account/profile" replace />} />
    </Routes>
  );
}
