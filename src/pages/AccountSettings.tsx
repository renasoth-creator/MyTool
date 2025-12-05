import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./account/Profile";
import Security from "./account/Security";
import EmailSettings from "./account/Email";
import Sessions from "./account/Sessions";
import DangerZone from "./account/DangerZone";

export default function AccountSettings() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/security" element={<Security />} />
      <Route path="/email" element={<EmailSettings />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/danger" element={<DangerZone />} />

      {/* default */}
      <Route path="*" element={<Navigate to="/account/profile" />} />
    </Routes>
  );
}
