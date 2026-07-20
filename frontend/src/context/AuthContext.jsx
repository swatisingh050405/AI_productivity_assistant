/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1
    ? parts[0][0] + parts[parts.length - 1][0]
    : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

// Fallback for login-only flow where we don't have a real name yet
// (no backend wired in yet — replace this once /auth/login returns a real user object)
function nameFromEmail(email) {
  const local = email.split("@")[0];
  return local
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("prodigyai_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("prodigyai_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("prodigyai_user");
    }
  }, [user]);

  // TODO: once backend auth is wired, these should call the API
  // and set `user` from the API response instead of deriving it locally.
  const login = ({ email, name }) => {
    const resolvedName = name || nameFromEmail(email);
    const newUser = { name: resolvedName, email, initials: getInitials(resolvedName) };
    setUser(newUser);
    return newUser;
  };

  const signup = ({ name, email }) => {
    const newUser = { name, email, initials: getInitials(name) };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}