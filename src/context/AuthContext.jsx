import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;

  const checkUserLoggedIn = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await api.get("/api/auth/me");
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      setError(err.response?.data?.message || "Session expired. Please log in again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Support both login(email, password) and legacy login({ email, password })
      let payload = {};
      if (typeof email === "object" && email !== null) {
        payload = { email: email.email, password: email.password };
      } else {
        payload = { email, password };
      }

      const res = await api.post("/api/auth/login", payload);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      const message = err.response?.data?.message || "Invalid email or password";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
