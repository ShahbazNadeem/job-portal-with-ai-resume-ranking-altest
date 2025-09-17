'use client'
import { Icons } from '@/data/Imports'
import Link from 'next/link';
import React, { useState } from 'react'
import { useUser } from "@/context/UserContext";

const Header = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='px-5 py-2 bg-white '>
        <div className="container flex justify-between items-center">
          <span className='md:hidden'><Icons.menuIcon size={28} onClick={() => setIsOpen(true)} /></span>
          <div className="flex justify-center items-center"><figure className='w-[150px]'><Link href="/"><img src="/images/logo/HireGenie1.png" alt="logo" className='w-full h-auto' /></Link></figure></div>

          <ul className='hidden md:flex gap-10'>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/about-us'>About us</Link></li>
            <li><Link href='contact-us'>Contact us</Link></li>
          </ul>

          {user ?
            <Link href='/user-signin'><button className='button1'>profile</button></Link>
            :
            <div className="flex gap-2">
              <Link href='/user-signin'><button className='button1'>Sign in</button></Link>
              <div className="hidden md:block">
                <span className="btn-gradient-border">
                  <Link href='/user-signin' className="btn-gradient-border-inner bg-white">
                    Get Registered
                  </Link>
                </span>
              </div>
            </div>

          }

        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}>
        </div>
      )}

      {/* Off-Canvas Drawer */}
      <div className={`bg-[#F8F8F8] fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto w-80 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center">
          <figure className="w-[120px]">
            <img src="/images/logo/HireGenie1.png" alt="Logo" className="w-full h-full" />
          </figure>
          <span onClick={() => setIsOpen(false)} className=" text-gray-400 ">
            <Icons.close size={28} />
          </span>
        </div>

        <div className="py-10 px-2 flex flex-col gap-10">
          <ul className="flex flex-col gap-5 font-marcellus text-[16]">
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/about-us'>About us</Link></li>
            <li><Link href='contact-us'>Contact us</Link></li>
          </ul>
        </div>
        <Link href='/' className='text-blue-600 underline'>
          Register
        </Link>
      </div>
    </>
  )
}

export default Header