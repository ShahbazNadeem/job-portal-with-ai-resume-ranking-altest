'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/data/Imports';
import { useAdmin } from "@/context/AdminContext";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { login } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (!email || !password) {
      setErr("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setErr(data.message || "Login failed.");
        return;
      }

      // ✅ Save to context + localStorage
      login({
        ...data.admin,
        token: data.token,
      });

      // redirect
      window.location.href = "/admin-dashboard/home";
    } catch (e) {
      setErr(e?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='relative max-w-lg'>

      <div className="w-full flex flex-col gap-5 rounded-2xl border border-gray-300 bg-[#ffffff65] backdrop-blur-lg p-6 md:p-8 shadow-sm">
        <div className=" flex flex-col gap-2">
          <h2 className="spaceGrotesk font-semibold"><span className='text-blue-600'>Admin</span> Login</h2>
          <p className="text-sm text-gray-500">Sign in to access your admin panel</p>
        </div>

        {err && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border bg-white px-3 py-2.5 outline-none ring-0 focus:border-purple-500"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border bg-white px-3 py-2.5 pr-10 outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
              />
              <span
                type="button"
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-2 grid place-items-center px-2 curson-pointer"
                onClick={() => setShowPwd((s) => !s)}
                tabIndex={-1}
              >
                {showPwd ? <Icons.openEye size={18} /> : <Icons.closeEye size={18} />}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-start">
            <label className="flex items-center gap-2 text-sm w-full">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded basis-[10%]"
              />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white transition hover:bg-bkue-900 disabled:opacity-60"
          >
            <Icons.login size={18} />
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 ">
          Need access?{' '}
          <Link href="/contact-us" className="text-blue-600 hover:underline">
            Contact the super admin
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 ">
          Go back to{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            home
          </Link>
        </p>
      </div>

      <div className="blob top-[-20%] right-[-20%] -z-1">
      </div>

    </div>
  )
}

export default AdminLogin