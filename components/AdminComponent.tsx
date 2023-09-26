'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
// import BarChart from '@/components/BarChart';
import { baseRoute } from '@/utils/route';
import { CounterContext } from '@/ThemeContext';
import BarCard from './BarCard';


const AdminCompmonent=()=>{
    const [loading, setLoading] = useState(false)

if (loading) {
    <div className="">loading ...</div>
}
const { state, dispatch } = useContext(CounterContext);

  const [bars,setBars] = useState<any>([])
  useEffect(() => {
  const fetchFun =()=>{
    setLoading(true)
    var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions:any = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${baseRoute}showAllBars`, requestOptions)
  .then(response => response.json())
  .then((result:any) =>{
    setBars(result.data)
    setLoading(false)
    console.log(result)})
  .catch(error => console.log('error', error));
  }
  fetchFun()
  }, [])
  
    return(
        <>
<div className="flex gap-2 w-full ">
    {/* {toggle?( */}
        <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4 text-white">Bars</h1>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bars.length !=0?bars.map((bar:any) => (
          <BarCard key={bar.bar_id} bar={bar} />
        )):<h1 className='text-white'>No Data</h1>}
      </div>
    </div>
    {/* )
    : */}
    {/* <CreateBar/> */}
    {/* } */}
            </div>
        </>
    )
}

export default AdminCompmonent;