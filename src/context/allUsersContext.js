"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AllUsersContext = createContext();

export const AllUsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/manageusers");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete user by id
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/manageusers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AllUsersContext.Provider value={{ users, loading, deleteUser, fetchUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};

export const useAllUsers = () => useContext(AllUsersContext);
