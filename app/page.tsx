'use client'

import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function Home() {

  return (
    // <Suspense fallback={<>loading...</>}>
    <>
      <Header />
      <div className="bg-black">
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
          <h1 className="heading">Nightclub live Tracking</h1>
          <p className="paragraph my-4 mt-12 w-[80%] mx-auto ">
            No more wasted nights! With LineCheck make the most of every night! <br /> See every bars estimated wait time, how many people are in line, and <br /> how many people are in the bar!
          </p>
          <div className="text-[#4100FA] my-4 flex items-center gap-4">
            <div className="h-8 w-8 relative">
              <Image src="/play.png" fill alt="play" />
            </div>
            See it in action
          </div>
          <Link href="/signup" >
            <Button className="w-[120px] h-[50px]">Try it free</Button>
          </Link>
          <p className="text-gray-300 my-4 text-sm">No credit card required</p>
        </div>
        <div className="w-full h-[60vh] relative">
          <Image src="/Hero_Image.png.png" layout="fill" objectFit="cover" alt="hero" />
        </div>
        <div className="flex flex-col items-center mt-8">
          <p className="paragraph !text-[1.2rem] !font-bold">
            Join the LineCheck army and never wait in <br /> a line again. Make a LineCheck account for <br /> free and have access to past wait times <br /> and stats so you can plan the perfect time <br /> to hit the lines!
          </p>

          <h1 className="heading text-center my-6">Say hello to a Linecheck <br /> without the wait</h1>
        </div>
        <section className="flex flex-col md:flex-col lg:flex-row 2xl:w-[70%] xl:w-[80%] lg:w-[80%] md:w-[80%] mx-auto my-0">
          <div className="w-full lg:w-[40%] p-8">
            <img src="/waitlist.svg.png" alt="Section Image" className="w-full h-auto" />
          </div>
          <div className="w-full lg:w-1/2 p-8 flex flex-col items-start justify-center">
            <h2 className="text-3xl text-white font-semibold mb-4 2xl:text-[65px] xl:text-[35px] xl:leading-[40px] lg:text-[34px] md:text-[30px] md:leading-[35px] text-[20px] leading-[25px] 2xl:leading-[70px]">
              New information is always coming in!
            </h2>
            <p className="text-white mb-4  2xl:text-[25px] xl:leading-[25px] xl:text-[18px] lg:leading-[20px] md:leading-[20px] 2xl:leading-[30px] lg:text-[15px]  md:text-[15px] text-[12px] leading-[20px]">
              The wait time and capacity is constantly updated in real time to ensure the most accurate results are always available!
            </p>
          </div>
        </section>
        <section className="flex flex-col md:flex-col lg:flex-row 2xl:w-[70%] xl:w-[80%] lg:w-[80%] md:w-[80%] mx-auto my-0">

          <div className="w-full lg:w-1/2 p-8 flex flex-col items-start justify-center">
            <h2 className="text-3xl text-white font-semibold mb-4 2xl:text-[65px] xl:text-[35px] xl:leading-[40px] lg:text-[34px] md:text-[30px] md:leading-[35px] text-[20px] leading-[25px] 2xl:leading-[70px]">
              Use LineCheck to never waste a Saturday night again and always pick the bar right for you!</h2>
            <p className="text-white mb-4  2xl:text-[25px] xl:leading-[25px] xl:text-[18px] lg:leading-[20px] md:leading-[20px] 2xl:leading-[30px] lg:text-[15px]  md:text-[15px] text-[12px] leading-[20px]">
              We were founded on the idea that there are only so many nights in university and that none should go to waste!
            </p>
          </div>
          <div className="w-full lg:w-[50%] p-8">
            <img src="/Happy friends drinking beer and wine in pub 1.png" alt="Section Image" className="w-full h-auto" />
          </div>
        </section>
        <section className="flex flex-col md:flex-col lg:flex-row 2xl:w-[70%] xl:w-[80%] lg:w-[80%] md:w-[80%] mx-auto my-0">
          <div className="w-full lg:w-1/2 p-8">
            <img src="/2942529 1.png" alt="Section Image" className="w-full h-auto" />
          </div>
          <div className="w-full lg:w-1/2 p-8 flex flex-col items-start justify-center">
            <h2 className="text-3xl text-white font-semibold mb-4 2xl:text-[65px] xl:text-[35px] xl:leading-[40px] lg:text-[34px] md:text-[30px] md:leading-[35px] text-[20px] leading-[25px] 2xl:leading-[70px]">
              Check our specials section to see what events are happening in London!
            </h2>
            <p className="text-white mb-4  2xl:text-[25px] xl:leading-[25px] xl:text-[18px] lg:leading-[20px] md:leading-[20px] 2xl:leading-[30px] lg:text-[15px]  md:text-[15px] text-[12px] leading-[20px]">
              Our specials section under each bar informs everyone on the special events and deals that are happening at each bar at any given night!
            </p>
          </div>
        </section>
        <section className="flex flex-col md:flex-col lg:flex-row 2xl:w-[70%] xl:w-[80%] lg:w-[80%] md:w-[80%] mx-auto my-0">

          <div className="w-full lg:w-1/2 p-8 flex flex-col items-start justify-center">
            <h2 className="text-3xl text-white font-semibold mb-4 2xl:text-[65px] xl:text-[35px] xl:leading-[40px] lg:text-[34px] md:text-[30px] md:leading-[35px] text-[20px] leading-[25px] 2xl:leading-[70px]">
              Join LineCheck as a member and help us provide accurate information to everyone
            </h2>
            <p className="text-white mb-4  2xl:text-[25px] xl:leading-[25px] xl:text-[18px] lg:leading-[20px] md:leading-[20px] 2xl:leading-[30px] lg:text-[15px]  md:text-[15px] text-[12px] leading-[20px]">
              We couldnt do this without our dedicated and valued members. Without everyone submitting information to our site we could never provide accurate information. We urge everyone to sign up and help make the best experience for all Western students! As a member you also have access to LineCheck events, promotions, and past data to plan your nights for the future!
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <img src="/113z_2208_w017_n001_18b_p12_18 1.png" alt="Section Image" className="w-full h-auto" />
          </div>
        </section>
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <h1 className="heading">Boost your sales with the <br />
            perfect customer flow</h1>
          <p className="paragraph my-4 mt-8 w-[80%] mx-auto ">
            Join the thousands of  companies using Linecheck
          </p>

          <Link href="/signup" >
            <Button className="w-[120px] h-[50px] !bg-white !text-black">Try it free</Button>
          </Link>
          <p className="text-gray-300 my-4 text-sm">No payment required</p>
        </div>
      </div>
      <Footer />
    </>

    // </Suspense>

  )
}
