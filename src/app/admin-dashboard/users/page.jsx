"use client";
import React, { useState } from "react";
import AdminDashboard from "../page";
import { useAllUsers } from "@/context/allUsersContext";

const ManageUsersPage = () => {
    const { users, loading, deleteUser } = useAllUsers();
    const [search, setSearch] = useState("");

    if (loading) return <AdminDashboard>Loading users...</AdminDashboard>;

    // Filter users based on search input
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminDashboard>
            <div className="p-6">
                <span className="text-2xl font-bold mb-6 text-gray-800">Manage Users</span>

                {/* Search Bar */}
                <div className="my-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Users Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredUsers.map((u) => (
                        <div
                            key={u._id}
                            className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl transition"
                        >
                            <div className="mb-4">
                                <span className="text-lg font-semibold text-gray-800">{u.name}</span>
                                <p className="text-gray-500 text-sm">{u.email}</p>
                            </div>
                            <button
                                onClick={() => deleteUser(u._id)}
                                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete User
                            </button>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No users found matching your search.
                    </p>
                )}
            </div>
        </AdminDashboard>
    );
};

export default ManageUsersPage;
