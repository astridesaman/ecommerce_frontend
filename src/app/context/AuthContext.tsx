"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        fetchUser(savedToken);
      }
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        logout();
        return;
      }

      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Erreur récupération user", error);
      logout();
    }
  };

  const login = async (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    await fetchUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
