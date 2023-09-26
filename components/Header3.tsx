'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import Button from './Button';
import { redirect,useRouter } from 'next/navigation';

const Header3 = ({applyFilters,inputSearch}:any) => {
  const router = useRouter()
  const [token,setToken] = useState('')
  useLayoutEffect(() => {
    let token:any = JSON.parse(localStorage.getItem('token') as any)
    setToken(token)
}, [])
const handlerLogout =()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
 }
  return (
    <nav className="bg-black w-[80%] mx-auto  my-0  p-4 flex items-center justify-between">
        <style jsx>{`
            .paragraph {
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                color:white;
                letter-spacing: -0.011em;
                text-align: left;
            }
            paragraph:hover{
               
            }
          `}</style>
      <div className="relative h-[80px] w-[80px] mr-4">
      <Link href="/" className=" font-inter">
        <Image src="/logo.png" fill alt="Logo"  />
      </Link>
      </div>
      <div className="flex justify-center items-center ">
            <div className="flex gap-2 relative items-center rounded-md p-2 w-[400px] h-[45px] bg-[#E8EBEB]">
        <Image src={'/search.png'}  className='rounded-lg ' width={18} height={15} alt=''/>
                <input type="text" value={inputSearch}
        onChange={(e) =>applyFilters(e.target.value)} className='outline-none bg-[#E8EBEB] w-full h-full px-2' placeholder='Search Popeyes Louisiana Kitchen' />
            </div>
        </div>
      <div className="space-x-4  flex items-center">
        <Link href="/aboutus" className="text-white font-inter">About us</Link>
        <Link href="/contactus" className="text-white font-inter">Contact us </Link>
        {token?(
          <button onClick={handlerLogout} className="text-white font-inter">Logout</button>
        ):<Link href="/login" className="text-white font-inter">Login</Link>}
        <Link href="/signup" className="text-white font-inter">Try it Free</Link>
      </div>
    </nav>
  );
};

export default Header3;
