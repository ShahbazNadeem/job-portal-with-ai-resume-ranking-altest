'use client'
import React from 'react'
import Allpost from '@/app/_components/Allpost'
import AdminDashboard from '../page'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  return (
    <AdminDashboard>
      <section>
        <div className="container">
          <div className=" flex gap-5 mt-5">
            <button className='button1' onClick={() => router.push('/admin-dashboard/recruiters')}>Manage recruiter</button>
            <button className='button1' onClick={() => router.push('/admin-dashboard/users')}>Manage Users</button>
            <button className='button1' onClick={() => router.push('/admin-dashboard/ai-ranked-resume')}>All Ranked Resume</button>
          </div>
          <div className="max-h-[650px] overflow-y-auto hide-scrollbar mt-5">
            <Allpost />
          </div>
        </div>
      </section>
    </AdminDashboard>
  )
}

export default page