'use client'
import React, { useState } from 'react'
import { useAdmin } from "@/context/AdminContext";
import AdminDashboardSidebar from './AdminDashboardSidebar';
import Link from 'next/link';

const AdminDashboardHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { admin, logout } = useAdmin()
    return (
        <div className='flex justify-between items-center pt-3 mx-5 md:mx-0'>
            <AdminDashboardSidebar />
            <span className='font-semibold text-xl md:text-4xl'>Admin Dashboard </span>
            <span className='flex gap-5 items-center'>
                <span className='text-2xl font-semibold text-blue-900'> <span>{admin?.email}</span></span>
                <div className="relative inline-block text-left">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                        Options
                        <svg
                            className={`ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Items */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                            <ul className="py-1">
                                <li>
                                    <Link href='/contact-us' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        To manage your profile please contact super admin
                                    </Link>
                                </li>
                                <li className='cursor-pointer'>
                                    <a
                                        onClick={() => logout()}
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </span>
        </div>
    )
}

export default AdminDashboardHeader