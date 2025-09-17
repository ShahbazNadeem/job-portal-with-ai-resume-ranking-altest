'use client'
import React, { useState } from 'react'
import { Icons } from '@/data/Imports'
import Link from 'next/link';

const RecuiterDashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <span className='cursor pointer'><Icons.menuIcon size={35} onClick={() => setIsOpen(true)} /></span>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}>
                </div>
            )}

            {/* Off-Canvas Drawer */}
            <div className={`bg-[#F8F8F8] fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto w-80 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-between items-center">
                    <figure className="w-[120px]">
                        <Link href='/'><img src="/images/logo/HireGenie1.png" alt="Logo" className="w-full h-full" /></Link>
                    </figure>
                    <span onClick={() => setIsOpen(false)} className=" text-gray-400 ">
                        <Icons.close size={28} />
                    </span>
                </div>

                <div className="py-10 px-2 flex flex-col gap-10">
                    <ul className="flex flex-col gap-5 font-marcellus text-[16]">
                        <li><Link href='/recruiter-dashboard/home'>Dashboard</Link></li>
                        <li><Link href='/recruiter-dashboard/postjob'>Post a new Job</Link></li>
                        <li><Link href='/recruiter-dashboard/job-applied-candidates-list'>Candidates</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RecuiterDashboardSidebar;