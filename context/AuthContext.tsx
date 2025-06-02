// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  authenticate: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Not authenticated");
          return res.json();
        })
        .then((data) => {
          setIsAuthenticated(!!data.success);
        })
        .catch(() => {
          setIsAuthenticated(false);
          sessionStorage.setItem(
            "authState",
            JSON.stringify({ isAuthenticated: false })
          );
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      setIsAuthenticated(false);
      sessionStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated: false })
      );
      router.replace("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, authenticate, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
