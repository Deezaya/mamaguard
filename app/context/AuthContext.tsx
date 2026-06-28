"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("mamaguard_token");
    const savedUser = localStorage.getItem("mamaguard_user");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://mamaguard.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
      }

      const data = await response.json();
      const newToken = data.access_token;
      const newUser = data.user;

      console.log("[AuthContext] Login successful");
      console.log("[AuthContext] Token received (length: " + newToken.length + ")");
      console.log("[AuthContext] Token preview: " + newToken.substring(0, 50) + "...");
      console.log("[AuthContext] Full token: " + newToken);

      // Decode JWT to inspect
      try {
        const parts = newToken.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          console.log("[AuthContext] Token payload:", payload);
          console.log("[AuthContext] Token exp:", new Date(payload.exp * 1000));
        }
      } catch (decodeError) {
        console.error("[AuthContext] Failed to decode token:", decodeError);
      }

      setToken(newToken);
      setUser(newUser);

      localStorage.setItem("mamaguard_token", newToken);
      localStorage.setItem("mamaguard_user", JSON.stringify(newUser));

      // Validate token immediately
      console.log("[AuthContext] Testing token with /auth/me...");
      const meResponse = await fetch("https://mamaguard.onrender.com/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${newToken}`,
        },
      });

      console.log("[AuthContext] /auth/me response status:", meResponse.status);

      if (meResponse.ok) {
        const meData = await meResponse.json();
        console.log("[AuthContext] Token validation SUCCESS! User:", meData);
      } else {
        const meError = await meResponse.json();
        console.error("[AuthContext] Token validation FAILED:", meResponse.status, meError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://mamaguard.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Registration failed");
      }

      const responseData = await response.json();
      const newToken = responseData.access_token;
      const newUser = responseData.user;

      setToken(newToken);
      setUser(newUser);

      localStorage.setItem("mamaguard_token", newToken);
      localStorage.setItem("mamaguard_user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mamaguard_token");
    localStorage.removeItem("mamaguard_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
