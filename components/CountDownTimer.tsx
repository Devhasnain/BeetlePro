'use client'

import React, { useEffect, useRef, useState } from 'react';

import CountDownCard from './CountDownCard';
import ApexChart from './PieChart';

const CountDownTimer = ({waitTime,lineQueue,volume}:any) => {
  console.log(waitTime,lineQueue,volume,'acha nhi tooooo')
  //card ref
  const SecondsCardRef:any = useRef(null);
  const MinutesCardRef:any = useRef(null);
  // const HoursCardRef:any = useRef(null);
  // const DaysCardRef:any = useRef(null);
  //state
  // const [days, setDays] = useState<any>(14);
  // const [hours, setHours] = useState<any>(0);
const [minutes, setMinutes] = useState<any>(waitTime?.split(':')[0] || 0);

  const [seconds, setSeconds] = useState<any>(waitTime?.split(':')[1] ||0);
console.log(waitTime,'waitTime')
  useEffect(() => {
    console.log(waitTime,lineQueue,volume,'acha nhi tooooo')
    seconds === 0 && setSeconds(59);
    minutes === 0 && setMinutes(59);
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        // SecondsCardRef.current.classList.toggle('rotate');
      }, 1000);
    }
    if (seconds === 0 && minutes > 0) {
      setMinutes(minutes - 1);
      // MinutesCardRef.current.classList.toggle('rotate');
    }
  }, [seconds, minutes]);
  // useEffect(() => {
  //   hours === 0 && setHours(23);
  //   if (minutes === 0 && hours > 0) {
  //     setHours(hours - 1);
  //     HoursCardRef.current.classList.toggle('rotate');
  //   }
  // }, [minutes, hours]);
  // useEffect(() => {
  //   days === 14 && setDays(13);
  //   hours === 0 &&
  //     setDays(days - 1) &&
  //     DaysCardRef.current.classList.toggle('rotate');
  // }, [hours, days]);
  return (
  <div className=" text-center flex ">
    <div className="">
    <h1 className=''>WAIT TIME</h1>
      <div className="countdown__container w-[200px]">
      <CountDownCard
        label="min"
        number={minutes}
        cardRef={MinutesCardRef}
      />
      <CountDownCard
        label="sec"
        number={seconds}
        cardRef={SecondsCardRef}
      />
    </div>
   
    </div>
    <div className=" w-[200px]">
    <ApexChart volume={volume}/>
    </div>
    <div className="">
    <h1 className=''>Line Queue</h1>
    <div className="countdown__container w-[200px]">
    <CountDownCard
        label="Line Queue"
        number={lineQueue}
      />
    </div>
    </div>
  </div>
  );
};

export default CountDownTimer;