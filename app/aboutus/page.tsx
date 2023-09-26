'use client'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Link from 'next/link'
import React from 'react'
import Navbar from '@/components/Header'

const page = () => {
  return (
    <>
     <Navbar />
    <main className=" bg-black">
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
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <h1 className="heading">Were on a mission <br />
to eliminate wait times</h1>
      <p className="paragraph my-4">
      People spend 1 Trillion hours every year waiting in lines.
      </p>
      <p className="paragraph">
      That s an incredible amount of human potential to unlock
and Linecheck is the key.
      </p>
      <div className="text-white my-4 flex items-center gap-4">
      Join us today!
      </div>
            <Link href="/home" >
              <Button  className="w-[150px] h-[50px]">Get in touch</Button>
              </Link>
    </div>
    
    <div className="h-[80vh] flex flex-col bg-white items-center justify-center">
      <div className="w-[450px]">
      <h1 className="heading !text-black">How are we doing so far?</h1>
      <p className="paragraph my-4 !text-black">
      Linecheck builds a suite of queue-eliminating
products for businesses to improve their waiting
experiences and make better use of their
customers valuable time.
      </p>
      </div>
      <div className="flex items-center text-center gap-8">
        <div className="text-center ">
            <h1 className='text-[4rem] font-extrabold'>170M+</h1>
            <p className='text-sm'>People waitlisted</p>
        </div>
        <div className="text-center ">
            <h1 className='text-[4rem] font-extrabold'>10K+</h1>
            <p className='text-sm'>Years of wait time eliminated</p>
        </div>
        <div className="text-center ">
            <h1 className='text-[4rem] font-extrabold'>10K+</h1>
            <p className='text-sm'>Customer companies</p>
        </div>
        <div className="text-center ">
            <h1 className='text-[4rem] font-extrabold'>150+</h1>
            <p className='text-sm'>Countries have lines being <br />
powered by Linecheck</p>
        </div>
      </div>
    </div>
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <h1 className="heading">Our guiding <br />
principles</h1>
<div className="flex items-center justify-center mt-16 flex-wrap gap-8">
        <div className="text-center w-[20%]">
            <h1 className='text-white mb-2 text-[0.8rem] font-bold'>Delightful experience at
every touchpoint</h1>
            <p className='text-white text-[0.6rem]'>Using Linecheck should feel light and
magical – regardless if you’re a business
or a customer that is joining a line.
We obsess over every pixel, wireframe and
feature to ensure the experience is always
delightful – and we’re not afraid to cut
functionality that we think adds bulk or
complexity.
</p>
        </div>
        <div className="text-center w-[20%]">
            <h1 className='text-white mb-2 text-[0.8rem] font-bold'>Integrations make us
better together</h1>
            <p className='text-white text-[0.6rem]'>
                
            We know that the best products are those
that work in unison with the other products
and tools you already are using.
Linecheck aims to be the best in the world
on wait time management – for
everything else we enable connections to
thousands of other products through our
extraordinary API.
            </p>
        </div>
        <div className="text-center w-[20%]">
            <h1 className='text-white mb-2 text-[0.8rem] font-bold'>
            Customer privacy
is worth protecting
            </h1>
            <p className='text-white text-[0.6rem]'>
            Linecheck is uniquely designed to capture
customer data of those that visit your
business and get in line – while allowing
private customer data to be safely
encrypted and anonymized.
We never sell, trade or share your
customer data with any other business -
and we take extraordinary measures to
keep it safe and secure.
            </p>
        </div>
        <div className="text-center w-[20%]">
            <h1 className='text-white mb-2 text-[0.8rem] font-bold'>
            Security that exceeds
enterprise standards
            </h1>
            <p className='text-white text-[0.6rem]'>Security officers at companies of all sizes
have confidently signed off on Linecheck.
That’s because we build on Google Cloud
Platform’s already-massive security
investments by adding the utmost
consideration for physical, operational,
and application security.</p>
        </div>
      </div>
    </div>
  

  </main>
  <Footer/>
    </>
  )
}

export default page