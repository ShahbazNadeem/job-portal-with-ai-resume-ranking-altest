'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { useRecruiter } from '@/context/RecruiterContext';

const RecruiterLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/recruiter-dashboard/home';

  const { login } = useRecruiter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecruiterLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/api/recruiter/login', {
        companyEmail: email,
        password,
      });

      if (data.success) {
        login(data.recruiter);
        localStorage.setItem("recruiterToken", data.token);
        router.push(callbackUrl);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-lg">
      <div className="w-full">
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-white md:text-2xl text-center">Sign in to <span className='text-blue-500 font-semibold'>Recruiter</span> panel</h3>

          <form className="space-y-4 md:space-y-6" onSubmit={handleRecruiterLogin}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                Company email
              </label>
              <input type="email" name="email" id="email" placeholder="name@company.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 rounded text-black" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                Password
              </label>
              <input type="password" name="password" id="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 rounded text-black" />
            </div>

            <button type="submit" className="w-full button1" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
