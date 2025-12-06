import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// VERY IMPORTANT: Tailwind + global styles must be imported
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
