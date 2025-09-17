'use client';
import { Suspense, useEffect, useState } from 'react';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';
import Link from 'next/link';

const UserSigninSwitcher = () => {
    const [login, setLogin] = useState(true);

    useEffect(() => {
        document.title = login ? 'Login - User' : 'Sign Up - User';
    }, [login]);

    return (
        <div className='px-5'>
            {login ? <Suspense><UserLogin /></Suspense> : <UserSignup />}
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

export default UserSigninSwitcher