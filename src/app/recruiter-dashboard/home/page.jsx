'use client'
import React from 'react'
import RecruiterDashboard from '../page'
import Allpost from '@/app/_components/Allpost'
import { useRecruiter } from '@/context/RecruiterContext';

const page = () => {
      const { recruiter } = useRecruiter();
  return (
    <RecruiterDashboard>
      <section>
        <div className="container">
          <Allpost recruuiterId={recruiter?.id} /> 
        </div>
      </section> 
    </RecruiterDashboard>
  )
}
 
export default page