'use client'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navbar from '@/components/Header'

const page = () => {
    
    return (
        <>
          <Navbar />
        <main className="bg-black">
            <style jsx>{`
      .heading {
        color: white;
        font-size: 2.5rem; /* Use rem units for font sizes */
        font-weight: 700;
        line-height: 3rem; /* Use rem units for line heights */
        letter-spacing: -0.06em;
        text-align: center;
      }
      .paragraph {
        color: white;
        font-size: 1rem; /* Use rem units for font sizes */
        font-weight: 400;
        line-height: 1.5rem; /* Use rem units for line heights */
        letter-spacing: 0;
        text-align: center;
      }
      .heading2{
        font-size: 36px;
        font-weight: 700;
        line-height: 43px;
        letter-spacing: -1.0800000429153442px;
        text-align: left;
      }
      .paragraph2{
font-size: 18px;
font-weight: 400;
line-height: 25px;
letter-spacing: 0em;
text-align: left;
      }
    `}</style>
           <div className="flex items-center h-[80vh] w-[40%] mx-auto my-0">
           <div className="flex items-end">
            <div className=" flex flex-col items-start justify-center">
                <h1 className="heading !text-start">Hi there, <br />
                Get in touch <br />
                with us below
                </h1>
                <p className="paragraph my-4 !text-start">
                Have a question about our products, pricing, services, or anything else?
Ask us in real time.
                </p>
                <Link href="/home" >
                    <Button className="w-[150px] h-[50px]">Get in touch</Button>
                </Link>
            </div>
            <Image src={'/SVG (2).png'} className='' width={100} height={100} alt=''/>
            </div>
           </div>
         <div className="flex gap-1 items-center">
         <div className="h-[80vh] w-[50%] pr-8 gap-1 flex  bg-white items-center justify-center">
            <div className="">
            <p className="paragraph   !font-bold !text-[1.3rem] mt-16 !text-black">
                     Chat with us
                    </p>
                    <p className="paragraph !text-[0.8rem]  !text-[#4100FA] ">
                     Open live chat
                    </p>
                     <p className="paragraph  !font-bold !text-[1.3rem] !text-black">
                     Work with us
                    </p>
                    <p className="paragraph !text-[0.8rem]  !text-[#4100FA] ">
                     See open roles
                    </p>
            </div>
         <div className="">
         <div className="w-[450px]">
         <p className="paragraph !font-bold mb-1 !text-[1.3rem] !text-end mt-16 !text-black">
         Write to us
                    </p>
                    <p className="paragraph !text-[0.8rem] !text-end !text-gray-300">
                    hello@linecheck.ca
                    </p>
                </div>
                <div className="w-[450px]">
                    <p className="paragraph !font-bold mb-1 !text-[1.3rem] !text-end mt-16 !text-black">
                    Company info
                    </p>
                    <p className="paragraph mt-2 !text-gray-300 !text-[0.8rem] !text-end">
                    Linecheck is built to improve the way people wait
in lines. Using technology, we help businesses
deliver better waiting experiences to their
customers and make waiting in line not feel like
waiting at all.
                    </p>
                </div>
         </div>
            </div>
            <div className="h-[80vh] w-[50%] flex flex-col bg-white items-center justify-center">
                <div className="w-[450px]">
                    <h1 className="!text-[1.8rem]  heading !text-start !text-black">San Francisco</h1>
                    <p className=" !text-[0.8rem]  paragraph !font-bold !text-start mt-16 !text-black">
                    Address
                    </p>
                    <p className=" !text-[0.8rem]  paragraph !text-start !text-black">
                    548 Market St, 45862 <br />
San Francisco, CA 94104
                    </p>
                </div>
            </div>
         </div>
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <h1 className="heading">Join the thousands of <br />
companies using Linecheck</h1>
              
            </div>


        </main>
        <Footer/></>
    )
}

export default page