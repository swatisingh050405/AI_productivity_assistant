/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import * as authService from "../services/authService";

const AuthContext = createContext(null);

function getInitials(name) {
  if (!name) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await authService.getMe();

        setUser({
          ...user,
          initials: getInitials(user.name),
        });
      } catch (err) {
        console.error(err);

        localStorage.removeItem("access_token");
      }

      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async ({ email, password }) => {
    const tokenData = await authService.login({
      email,
      password,
    });

    localStorage.setItem(
      "access_token",
      tokenData.access_token
    );

    const user = await authService.getMe();

    setUser({
      ...user,
      initials: getInitials(user.name),
    });

    return user;
  };

  const signup = async ({
    name,
    email,
    password,
  }) => {
    await authService.signup({
      name,
      email,
      password,
    });

    await login({
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
}