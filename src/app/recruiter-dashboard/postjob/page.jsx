'use client'
import React, { useState } from 'react'
import RecruiterDashboard from '../page'
import { useRecruiter } from '@/context/RecruiterContext';
import axios from 'axios';
import { useJobs } from "@/context/JobsContext"
import { useRouter } from 'next/navigation';

const page = () => {
    const { recruiter } = useRecruiter();
    const { refreshJobs } = useJobs();
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: '',
        jobType: '',
        requiredSkills: '',
        experienceRequired: '',
        closeJob: false, // false = job is open
    })
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/recruiter/jobPost", {
                ...formData,
                postedBy: recruiter, // attach recruiter id
                closeJob: false,
            });

            if (data.success) {
                alert("✅ Job posted successfully!");
                refreshJobs();
                router.push("/recruiter-dashboard/home");
                setFormData({
                    title: "",
                    description: "",
                    location: "",
                    salaryRange: "",
                    jobType: "",
                    requiredSkills: "",
                    experienceRequired: "",
                    postedBy: recruiter?.id,
                    closeJob: false,
                });

            } else {
                alert("❌ Failed to post job");
            }
        } catch (error) {
            console.error("❌ Error posting job:", error);
        }
    };
    return (
        <RecruiterDashboard>
            <div className="flex justify-center items-center min-h-screen p-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-5"
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800">Post a Job</h2>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Frontend Developer"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full border-gray-300 border-[1px] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-300"
                            placeholder="Job responsibilities, requirements, etc."
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="e.g. New York, Remote"
                        />
                    </div>

                    {/* Salary Range */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Salary Range</label>
                        <input
                            type="text"
                            name="salaryRange"
                            value={formData.salaryRange}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 60k - 80k"
                        />
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Job Type</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            required
                            className="w-full border-gray-300 border-[1px] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-300"
                        >
                            <option value="">Select job type</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    {/* Required Skills */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Required Skills (comma separated)
                        </label>
                        <input
                            type="text"
                            name="requiredSkills"
                            value={formData.requiredSkills}
                            onChange={handleChange}
                            required
                            placeholder="e.g. React, Node.js, Tailwind CSS"
                        />
                    </div>

                    {/* Experience Required */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Experience Required</label>
                        <input
                            type="text"
                            name="experienceRequired"
                            value={formData.experienceRequired}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 2+ years"
                        />
                    </div>

                    {/* Close Job */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="closeJob"
                            checked={formData.closeJob}
                            onChange={handleChange}
                            className='w-[10px]'
                        />
                        <label className="text-sm font-medium">Close Job (uncheck = open)</label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </RecruiterDashboard>
    )
}

export default page