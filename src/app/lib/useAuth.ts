"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, token, login: contextLogin, logout: contextLogout } = context;

  // Initialisation du contexte côté client
  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser) {
        contextLogin(savedToken); // fetchUser dans AuthProvider mettra à jour user
      }
    }
  }, [token, contextLogin]);

  const login = async (newToken: string, userData?: any) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    localStorage.setItem("token", newToken);
    await contextLogin(newToken); // met à jour user dans le contexte via fetchUser
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    contextLogout();
  };

  return { user, token, login, logout };
}
