'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="  bg-black">
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
      <div className="w-full py-12">
        <div className="w-[85%] my-0 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="">
              <h1 className="text-greentext  text-white font-bold text-[24px]  2xl:text-[45px]">Drop us a line</h1>
              <h1 className="text-greentext  text-yellow-300 font-bold text-[24px]  2xl:text-[45px]">info@linecheck.ca</h1>
            </div>
            <div className="space-y-4">
              <h1 className=" text-xl 2xl:text-[35px] text-white font-bold">Company</h1>
              <ul className="flex flex-col gap-2">
              <Link href='/aboutus' className=" cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">About us</Link>
                <Link href='/contactus' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Contact</Link>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className=" text-xl font-bold text-white 2xl:text-[35px]">Resources</h1>
              <ul className="flex flex-col gap-2">
                <Link
              href="/" className="cursor-pointer font-medium hover:text-gray-400 text-gray-300 text-sm 2xl:text-[25px]">Help center
              </Link>
                <Link
              href="/" className="cursor-pointer font-medium hover:text-gray-400 text-gray-300 text-sm 2xl:text-[25px]">Search Linecheck
              </Link>
              </ul>
            </div>
            {/* <div className="space-y-4">
              <h1 className=" text-xl font-bold text-white 2xl:text-[35px]">Product</h1>
              <div className="flex space-x-4 justify-between">
                <ul className="flex flex-col gap-2">
                  <Link href='/' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Overview</Link>
                  <Link href='/' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Waiting Time</Link>
                  <Link href='/' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Customer insights</Link>
                  <Link href='/' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Menu and discounts</Link>
                  <Link href='/' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Guest messaging</Link>
                  <Link href='/' className="cursor-pointer font-medium hover:text-gray-400 2xl:text-[25px] text-gray-300 text-sm">Analytics</Link>
                </ul>
              
              </div>
            </div> */}
          </div>
          
         
          {/* <hr className="my-8 border-gray-300" />
          <div className="paragraph flex flex-col md:flex-row justify-between items-start md:items-center lg:items-center xl:items-center">
  <ul className='flex items-center gap-4'>
        <Link href="#" className="hover:text-gray-400 lg:text-[12px] xl:text-[12px] font-inter cursor-pointer">Security</Link>
        <Link href="#" className="hover:text-gray-400 lg:text-[12px] xl:text-[12px] font-inter cursor-pointer">Terms</Link>
        <Link href="#" className="hover:text-gray-400 lg:text-[12px] xl:text-[12px] font-inter cursor-pointer">Privacy</Link>
        <Link href="#" className="hover:text-gray-400 lg:text-[12px] xl:text-[12px] font-inter cursor-pointer">GDPR</Link>
        <Link href="#" className="hover:text-gray-400 lg:text-[12px] xl:text-[12px] font-inter cursor-pointer">Canada</Link>
  </ul>
  <div className="flex space-x-3">
      <Link href="https://www.facebook.com/" className='hover:text-gray-400 cursor-pointer relative  2xl:w-7 w-5 flex justify-center items-center 2xl:h-7 h-5'>
      <Image src="/fb-logo.svg.png"  fill alt='' />
    </Link>
      <Link href="https://www.instagram.com/" className='hover:text-gray-400 cursor-pointer relative  rounded-full 2xl:w-7 w-5 flex justify-center items-center 2xl:h-7 h-5'>
      <Image src="/instagram-logo.svg.png"  fill alt='' />
    </Link>
      <Link href="https://www.instagram.com/" className='hover:text-gray-400 cursor-pointer relative  rounded-full 2xl:w-7 w-5 flex justify-center items-center 2xl:h-7 h-5'>
      <Image src="/twitter-logo.svg.png"  fill alt='' />
    </Link>
      <Link href="https://www.linkedin.com" className='hover:text-gray-400 cursor-pointer relative  rounded-full 2xl:w-7 w-5 flex justify-center items-center 2xl:h-7 h-5'>
      <Image src="/linkedin.png"  fill alt='' />
    </Link>

  </div>
</div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer