import React from 'react'
import { Icons } from '@/data/Imports'

const Card1 = ({className}) => {
  return (
    <div className={`flex flex-col gap-2 p-2.5 ${className} rounded`}>
        <span className='flex justify-between flex-wrap gap-2'>
            <span className='basis-[30%] border rounded  text-center'>Fulltime</span>
            <span className='basis-[30%] border rounded  text-center'>Onsite</span>
            <span className='basis-[30%] border rounded  text-center'>$200K</span>
        </span>
        <span className='font-bold text-[18px]'>UX Designer</span>
        <span className='font-semibold text-[18px] text-gray-500'>Advoit Digital Agency</span>
        <span className='flex justify-between items-center'>
            <button>Apply</button>
            <span className='flex gap-1 text-[16px] text-gray-500'><Icons.team size={25}/>24 Applied</span>
        </span>
    </div>
  )
}

export default Card1