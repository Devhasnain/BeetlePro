'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from './Button';

const Header = () => {
     
  return (
  <div className="w-full bg-black">
      <nav className=" w-[80%] mx-auto  my-0  p-4 flex items-center justify-between">
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
      <div className="space-x-8 paragraph flex items-center">
        <Link href="/aboutus" className=" font-inter">About us</Link>
        <Link href="/contactus" className=" font-inter">Contact us </Link>
        <Link href="/login" className="flex items-center gap-1 font-inter">
          <Image src={'/lock.png'} width={15} height={15} alt=''/>
          Log in</Link>
        <Link href="/signup" >
            <Button>
            Try it free    
            </Button>
            </Link>
      </div>
    </nav>
  </div>
  );
};

export default Header;
