'use client'
import Layout from '@/app/_components/layout/Layout'
import { useAppliedJobs } from '@/context/AppliedJobsContext'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router = useRouter();
    const { appliedJobs, loading } = useAppliedJobs();
    const { user } = useUser();

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg animate-pulse">
                        Loading applied jobs...
                    </p>
                </div>
            </Layout>
        );
    }

    const userJobs = appliedJobs.filter(
        (job) => job.user.id === user?._id
    );
    console.log('filtered userjobs', userJobs)

    return (
        <Layout>

            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                <button
                    onClick={() => router.push("/user-signin")}
                    className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-300 hover:text-black"
                >
                    Back
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>

                {userJobs.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">
                        You haven’t applied to any jobs yet.
                    </p>
                ) : (
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {userJobs.map((job) => (
                            <li
                                key={job._id}
                                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {job.job.title}
                                    </h3>
                                    <p className="text-sm text-gray-900">
                                        Applied At:{" "}
                                        <span className="font-medium text-gray-500">
                                            {new Date(job.appliedAt).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                                {/* status */}
                                <div className="font-medium text-gray-900">
                                    <p className="text-sm">
                                        Status:{" "}
                                        <span
                                            className={job.status === "accepted"
                                                ? "text-green-600 font-semibold"
                                                : job.status === "declined"
                                                    ? "text-red-600 font-semibold"
                                                    : "text-gray-500 font-medium"
                                            }>
                                            {job.status || "pending"}
                                        </span>
                                    </p>

                                </div>


                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export default Page;
