import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config/backend";

interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGIN FUNCTION
  async function login(email: string, password: string) {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  // LOGOUT FUNCTION
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
