"use client"
// import { fetchWithFallback } from '@/utils/fetchWithFallback';
import React, { useState } from 'react'
import { signIn } from "next-auth/react"

const UserSignUp = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    contact: "",
    password: "",
  });
  const [signedUp, setSignedUp] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-xl">
        <div className="w-full">
          <div className="flex flex-col items-center gap-5">
            <h3 className="md:text-2xl text-center text-white">
              Create your new account with
            </h3>
            {signedUp &&
              <h3 className="md:text-2xl text-center text-white">
                Now login first
              </h3>
            }

            <span>
              <button onClick={() => signIn("google")} className='relative bg-blue-600 px-7 rounded-md py-2 text-white'>
                <span className='absolute top-[34%] left-[8px]'><img src="/images/logo/google.png" alt="gooogle" className='w-[15px] ' /></span>
                Sign in with google
              </button>
            </span>

            <span>
              <button onClick={() => signIn("github")} className='relative bg-black px-7 rounded-md py-2 text-white'>
                <span className='absolute top-[34%] left-[8px]'><img src="/images/logo/linkedin.png" alt="gooogle" className='w-[15px] ' /></span>
                Sign in with linkedIn
              </button>
            </span>

            {/* <form>
              <div className="flex flex-wrap gap-2 text-white">
                <div className="w-full sm:w-fit flex flex-col gap-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Your name</label>
                    <input type="text" name="name" id="name" value={users.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                    <input type="email" name="email" id="email" value={users.email} onChange={handleChange} placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium">City</label>
                    <input type="text" name="city" id="city" value={users.city} onChange={handleChange} placeholder="lahore" required />
                  </div>

                </div>

                <div className="w-full sm:w-fit flex flex-col gap-2">
                  <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium">Address</label>
                    <input type="text" name="address" id="address" value={users.address} onChange={handleChange} placeholder="str#123 City Country" required />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block mb-2 text-sm font-medium">Contact</label>
                    <input type="tel" name="contact" id="contact" value={users.contact} onChange={handleChange} placeholder="1234-6789101" autoComplete="tel" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                    <input type="password" name="password" id="password" value={users.password} onChange={handleChange} placeholder="••••••••" required />
                  </div>
                </div>
              </div>


              <button type="submit" className="w-full mt-5">Sign up</button>
            </form> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSignUp