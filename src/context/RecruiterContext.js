"use client";

import { createContext, useContext, useState, useEffect } from "react";

const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRecruiter = localStorage.getItem("recruiterJobPortal");
    if (storedRecruiter) {
      setRecruiter(JSON.parse(storedRecruiter));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setRecruiter(data);
    localStorage.setItem("recruiterJobPortal", JSON.stringify(data));
  };

  const logout = () => {
    setRecruiter(null);
    localStorage.removeItem("recruiterJobPortal");
  };

  return (
    <RecruiterContext.Provider value={{ recruiter, login, logout, loading }}>
      {children}
    </RecruiterContext.Provider>
  );
};


export const useRecruiter = () => useContext(RecruiterContext);
