'use client'
import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <figure className="w-[200px]">
                <img src="/images/logo/HireGenie1.png" alt="Logo" className="w-full h-full" />
              </figure>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <span className="mb-6 text-md font-semibold text-gray-900 uppercase ">Earn with us</span>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <Link href="/recruiter-dashboard/home" className="hover:underline">Recruiter Panel</Link>
                </li>
                <li>
                  <Link href="/admin-dashboard/home" className="hover:underline">Admin Dashboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="mb-6 text-md font-semibold text-gray-900 uppercase ">Follow us</span>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">Github</a>
                </li>
                <li>
                  <Link href="/" className="hover:underline">Linkedin</Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="mb-6 text-md font-semibold text-gray-900 uppercase ">Legal</span>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center ">© 2025 <Link href="/" className="hover:underline">HireGenie</Link>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer