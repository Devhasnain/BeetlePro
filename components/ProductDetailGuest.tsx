'use client'
import React, {  useEffect, useState } from 'react'
import CountDownTimer from '@/components/CountDownTimer';
import { baseRoute } from '@/utils/route';
import Image from 'next/image'

const ProductDetailGuest = ({ id,setId }: any) => {
    const [loading, setLoading] = useState<any>(false);
    const [data, setData] = useState<any>([]);
    const [offers,setOffers] = useState([])
   
useEffect(() => {
    async function fetchData() {
        setLoading(true)
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions: any = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(`${baseRoute}offers/${id}`, requestOptions)
                .then(response => response.json())
                .then((result) => {
                    setOffers(result.data)
//   dispatch({ type: "OFFERS",payload: result.data})
                    setLoading(false)
                })
                .catch(error => console.log('error', error));
                
            //   console.log(`http://127.0.0.1:8000/api/bars?id=${id}`,'acha')
                fetch(`${baseRoute}bars?id=${id}`, requestOptions)
                .then(response => response.json())
                .then((result )=> {
                    setData(result.data)
                    setLoading(false)
                    console.log(result)})
                .catch(error => console.log('error', error));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}, []);

    if (loading) return <h1>loading....</h1>
    return (
        <div className="w-[90%] mx-auto my-0">
            <div className="h-[50px] mt-8">
            <button onClick={()=>setId('')} className='py-2 px-4 rounded-2xl '>Back</button>
            </div>
            <div className='flex gap-2 '>
                <div className="relative h-[300px] w-[300px] rounded-lg ">
                    <Image src={data.image} className='rounded-lg' fill alt='' />
                </div>
                <div className="p-2  w-[70%] " >
                    <h1 className='text-md font-semibold text-[25px] '>{data.title}</h1>
                    <span className='flex items-center gap-2 '>
                        <Image src={'/start.png'} className='rounded-lg ' height={15} width={15} alt='' />
                        <p className='text-[12px] text-[#4D7C1B]'>{data.rating} Excellent</p>
                        <p className=' text-[12px] text-[#585C5C] '>(500+)</p>
                    </span>
                    <div className="flex justify-center mt-8">
                        {data !=''&&(
                        <CountDownTimer waitTime={data.waitTime} volume={data.volume} lineQueue={data.lineQueue}/>
                        )}
                    </div>
                </div>
            </div>
            {/* for guest users */}
            <div className="mt-8 flex items-center gap-1 w-full">
            {offers&&offers.map((items:any,index:number)=>(
        <div key={index} className="relative h-[200px] w-[320px]  rounded-lg ">
        <Image src={items.image}  className='rounded-lg' fill alt=''/>
        </div>
            ))}
        </div>
        </div>
    )
}

export default ProductDetailGuest