import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config/backend";

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  verified: boolean;
  twoFactorEnabled?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  // IMPORTANT — add setters
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load saved auth state
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGIN FUNCTION (first phase — before 2FA)
  async function login(email: string, password: string) {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Login failed");

    // Case 1: requires 2FA → DO NOT set login yet
    if (data.requires2FA) {
      return; // 2FA page handles the rest
    }

    // Case 2: normal login
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  }

  // LOGOUT FUNCTION
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    setUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
