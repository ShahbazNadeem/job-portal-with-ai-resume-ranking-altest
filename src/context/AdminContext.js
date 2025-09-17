"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminJobPortal");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setAdmin(data);
    localStorage.setItem("adminJobPortal", JSON.stringify(data));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminJobPortal");
  };

  const hasPermission = (role) => {
    return admin?.role === role;
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, hasPermission, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
