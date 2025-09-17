'use client';
import React from "react";
import AdminDashboard from "../page";
import { FaBan, FaTrash } from "react-icons/fa";
import { useManageRecruiters } from "@/context/ManageRecruitersContext";
import axios from "axios";

const RecruiterSkeleton = () => {
  return (
    <div className="bg-white border rounded-xl shadow-md p-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-28 bg-gray-200 rounded mb-5"></div>

      <div className="flex gap-3 mt-6">
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const RecruitersPage = () => {
  const { recruiters, loading, setRecruiters } = useManageRecruiters();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this recruiter?")) return;

    try {
      const res = await axios.delete(`/api/admin/managerecruiters/${id}`);
      if (res.data.success) {
        alert("Recruiter deleted successfully");
        setRecruiters(recruiters.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete recruiter:", error);
      alert("Failed to delete recruiter");
    }
  };

  const handleBlock = (id) => {
    if (confirm("Are you sure you want to block this recruiter?")) {
      console.log("Blocked recruiter:", id);
    }
  };

  return (
    <AdminDashboard>
      <div className="flex flex-col p-6">
        <span className="text-3xl font-bold mb-8 text-gray-800">
          Recruiters Management
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(6) // show 6 skeletons while loading
              .fill(0)
              .map((_, idx) => <RecruiterSkeleton key={idx} />)
            : recruiters.map((recruiter) => (
              <div key={recruiter._id}
                className="bg-white border border-gray-300 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <span className="text-xl font-semibold text-gray-800">
                    {recruiter.companyName}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {recruiter.companyEmail}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium mt-2">
                    {recruiter.contactNumber}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button disabled
                    onClick={() => handleBlock(recruiter._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg"
                  >
                    <FaBan /> Block
                  </button>
                  <button
                    onClick={() => handleDelete(recruiter._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default RecruitersPage;
