'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { signIn } from "next-auth/react"

const UserLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-lg">
        <div className="w-full">
          <div className="flex flex-col gap-5">
            <h3 className="text-white md:text-2xl text-center">
              Sign in
            </h3>
            <button onClick={() => signIn("google")} className='relative bg-blue-600 px-7 rounded-md py-2 text-white'>
              <span className='absolute top-[34%] left-[8px]'><img src="/images/logo/google.png" alt="gooogle" className='w-[15px] ' /></span>
              Sign in with google
            </button>

            <button onClick={() => signIn("github")} className='relative bg-black px-7 rounded-md py-2 text-white'>
              <span className='absolute top-[34%] left-[8px]'><img src="/images/logo/linkedin.png" alt="gooogle" className='w-[15px] ' /></span>
              Sign in with linkedIn
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserLogin