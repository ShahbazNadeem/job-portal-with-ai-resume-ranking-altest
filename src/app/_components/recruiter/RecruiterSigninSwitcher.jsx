'use client'
import React, { Suspense, useEffect, useState } from 'react'
import RecruiterSignup from './RecruiterSignup'
import RecruiterLogin from './RecruiterLogin'
import Link from 'next/link'

const RecruiterSigninSwitcher = () => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    document.title = login ? 'Login - Recruiter' : 'Sign Up - Recruiter';
  }, [login]);
  return (
    <div className='px-5'>
      {login ? <Suspense><RecruiterLogin /></Suspense> : <RecruiterSignup />}
      <span className="flex justify-center cursor-pointer text-white"
        onClick={() => setLogin(!login)} >
        {login
          ? "Don't have an Account? Sign Up"
          : 'Already have an Account? Login'}
      </span>
      <p className="text-center text-white">
        Go back to{' '}
        <Link href="/" className="text-blue-600 hover:underline">
          home
        </Link>
      </p>
    </div>
  )
}

export default RecruiterSigninSwitcher