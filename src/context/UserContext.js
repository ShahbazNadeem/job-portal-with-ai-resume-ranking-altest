'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("JobportalUser");
    const storedUser = stored ? JSON.parse(stored) : null;

    if (session?.user) {
      setUser(storedUser || session.user);
    } else {
      setUser(storedUser || null);
    }
  }, [session]);

  const login = useCallback((userData) => {
    localStorage.setItem("JobportalUser", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("JobportalUser");
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUserData) => {
    localStorage.setItem("JobportalUser", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
