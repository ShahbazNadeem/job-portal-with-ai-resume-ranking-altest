'use client';
import React, { useEffect, useState } from "react";
import Layout from "@/app/_components/layout/Layout";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function UpdateUserPage() {
  const router = useRouter();
  const { user, updateUser } = useUser(); // use context
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    projects: [],
    workExperience: [],
    education: [],
  });

  // Initialize form from context
  useEffect(() => {
    if (user) {
      setUserData({
        id: user._id || "", // store id for update
        name: user.name || "",
        email: user.email || "",
        phone: user.resume?.personal?.phone || "",
        location: user.resume?.personal?.location || "",
        skills: user.resume?.skills || [],
        projects: user.resume?.projects || [],
        workExperience: user.resume?.workExperience || [],
        education: user.resume?.education || [],
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Dynamic array fields like skills/projects
  const handleArrayChange = (field, idx, value) => {
    const updated = [...userData[field]];
    updated[idx] = value;
    setUserData({ ...userData, [field]: updated });
  };

  const addArrayField = (field) => {
    setUserData({ ...userData, [field]: [...userData[field], ""] });
  };

  const removeArrayField = (field, idx) => {
    const updated = [...userData[field]];
    updated.splice(idx, 1);
    setUserData({ ...userData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/user/updateUser/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      if (result.success) {
        updateUser(result.user); // update context
        alert("Profile updated successfully!");
        router.push("/user-signin ");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium text-gray-600">Loading user data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
              {userData.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayChange("skills", idx, e.target.value)}
                    className="w-full border rounded-lg p-2"
                  />
                  <button type="button" onClick={() => removeArrayField("skills", idx)} className="bg-red-500 text-white px-2 rounded">X</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField("skills")} className="bg-green-500 text-white px-3 py-1 rounded">
                + Add Skill
              </button>
            </div>

            {/* Projects */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
              {userData.projects.map((proj, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={proj.line || proj}
                    onChange={(e) => handleArrayChange("projects", idx, e.target.value)}
                    className="w-full border rounded-lg p-2"
                  />
                  <button type="button" onClick={() => removeArrayField("projects", idx)} className="bg-red-500 text-white px-2 rounded">X</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField("projects")} className="bg-green-500 text-white px-3 py-1 rounded">
                + Add Project
              </button>
            </div>

            {/* You can add similar sections for workExperience and education if needed */}

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
