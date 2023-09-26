'use client'
import Login from '@/components/Login'
import React from 'react'
import { redirect } from 'next/navigation'
import Header1 from '@/components/Header1'

const page = () => {

    
  return (
    <div className='bg-black'>
      <Header1/>
        <Login/>
    </div>
  )
}

export default page