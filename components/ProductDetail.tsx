'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CounterContext } from '@/ThemeContext';
import Calendar from '@/components/Calendar';
import Card from '@/components/Card';

import CountDownTimer from '@/components/CountDownTimer';
import ApexChart from '@/components/PieChart';
import { baseRoute } from '@/utils/route';
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
const ProductDetail = ({ id,setId }: any) => {
    const [loading, setLoading] = useState<any>(false);
    const [data, setData] = useState<any>([]);

    const [person, setPerson] = useState(0)
    const [getVolume, setVolume] = useState(0)
    const [getWaitTime, setWaitTime] = useState(0)
    const [check,setCheck]=useState(false)
    const {state,dispatch} = useContext(CounterContext)
    const [offers,setOffers] = useState([])
    const [userData,setUserData] = useState<any>([])
    function timeToDecimal(timeString:any) {
        const [minutes, seconds] = timeString.split(':');
        const decimalMinutes = parseFloat(minutes);
        const decimalSeconds = parseFloat(seconds) / 60; // Convert seconds to a fraction of a minute
        const totalDecimalTime = decimalMinutes + decimalSeconds;
      
        return parseInt(totalDecimalTime.toFixed(1)); // Format to one decimal place
      }
      console.log(id,'iddddddddddddd')
    useEffect(() => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let user = JSON.parse(localStorage.getItem('user') as any)
            setUserData(user)
            var requestOptions:any = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
            //   console.log(`bartimmings/id/${user.id}/${id}`)
                  fetch(`${baseRoute}bartimmings/id/${user.id}/${id}`, requestOptions)
                  .then(response => response.json())
                  .then((result) => {
                    setWaitTime(timeToDecimal(result.data[0].waittime))
                    setVolume(parseInt(result.data[0].volume))
                    setPerson(parseInt(result.data[0].queue))
                    setCheck(true)
                })
                  .catch(error => console.log('error', error));
        } catch (error) {
            
        }
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
    console.log(id,userData, 'asdkfjlsdjf')

    const handlerVolumeChanger = (value: string) => {
        switch (value) {
            case "volumeMinus":
                getVolume != 0 && setVolume(getVolume - 5)
                break;
            case "volumePlus":
                getVolume != 100 && setVolume(getVolume + 5)
                break;
            case "waitTimeMinus":
                getWaitTime != 0 && setWaitTime(getWaitTime - 0.5)
                break;
            case "waitTimePlus":
                getWaitTime != 20 && setWaitTime(getWaitTime + 0.5)
                break;
            case "personMinus":
                person != 0 && setPerson(person - 1)
                break;
            case "personPlus":
                person != 20 && setPerson(person + 1)
                break;
            default:
                break;
        }
    }
    console.log(person,'person')
    const handlerUpdate = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "user_id": userData.id,
            "bar_id": `${id}`,
            "waittime": `${minutesToHHMM(getWaitTime * 60)}`,
            "volume": `${getVolume}`,
            "queue": `${person}`
        });
        
        var requestOptions:any = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${baseRoute}bartimmings/update/${userData.id}/${id}`, requestOptions)
          .then(response => response.json())
          .then(result =>{
            toast.success('update successfully')
             console.log(result)})
          .catch(error => console.log('error', error));
    }
    const handlerSubmit=()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "user_id":userData.id,
  "bar_id": `${id}`,
  "waittime": `${minutesToHHMM(getWaitTime * 60)}`,
  "volume": `${getVolume}`,
  "queue": `${person}`
});
var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseRoute}bartimmings`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
    fetch(`${baseRoute}bartimmings/id/${userData.id}`, requestOptions)
    .then(response => response.json())
    .then((result) => {
    toast.success('Successfully')
      setWaitTime(timeToDecimal(result.data[0].waittime))
      setVolume(parseInt(result.data[0].volume))
      setPerson(parseInt(result.data[0].queue))
      console.log(result)
  })
    .catch(error => console.log('error', error));
    console.log(result)})
  .catch(error => console.log('error', error));

    }

function minutesToHHMM(seconds:any) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingFractionalSeconds = remainingSeconds % 60;
    
    // Format hours, minutes, and fractional seconds with leading zeros if needed
    const formattedMinutes = minutes?.toString().padStart(2, '0') || '';
    const formattedFractionalSeconds = remainingFractionalSeconds.toFixed(0).padStart(2, '0');
    
    if (hours > 0) {
        return `${hours}:${formattedMinutes}:${formattedFractionalSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedFractionalSeconds}`;
    }
    }

    return (
        <div className="w-[90%]  mx-auto my-0">
            <div className="h-[50px] mt-8">
            <button onClick={()=>setId('')} className='py-2 px-4 rounded-2xl text-black bg-white'>Back</button>
            </div>
            <div className='flex gap-2 '>
                <div className="relative border border-white h-[300px] w-[300px] rounded-lg ">
                    <Image src={data.image} className='rounded-lg' fill alt='' />
                </div>
                <div className="p-2  w-[70%] " >
                    <h1 className='text-md font-semibold text-[25px] '>{data.title}</h1>
                    <span className='flex items-center gap-2 '>
                        <Image src={'/start.png'} className='rounded-lg ' height={15} width={15} alt='' />
                        <p className='text-[12px] text-[#4D7C1B]'>{data.rating} Excellent</p>
                        <p className=' text-[12px] text-[#585C5C]'>(500+)</p>
                    </span>
                    <div className="flex justify-center mt-8">
                        {/* <CountDownTimer waitTime={data.waitTime} lineQueue={data.lineQueue}/> */}
                        <div className="flex gap-8 items-center">
                            <div className="text-center">
                            <h1 className='text-[20px] font-bold '>WAIT TIME</h1>
                            <div className="bg-[#1C1C1E80] w-[160px] flex justify-center flex-col items-center rounded-3xl p-2">
                                <Image src={'/StopwatchIconAnimation.png'} width={100} height={100} alt='' />
                                <div className="h-10 w-[90%] bg-[#a8a8ad99] rounded-lg  p-1 mx-auto my-0 flex items-center justify-between">
                                    <Image src={'/minus.png'} onClick={() => handlerVolumeChanger('waitTimeMinus')} width={30} height={30} alt='' />
                                    <div className=" flex flex-col items-center">
                                        <h6 className='text-[#FFFFFF] text-[12px]'>wait time</h6>
                                        <div className='flex items-center '>
                                            <h6 className='text-white text-[14px]'>{getWaitTime}</h6>
                                            
                                            <sub className='text-[#FFFFFF] text-[12px]'>m</sub>
                                        </div>
                                    </div>
                                    <Image src={'/plus.png'} onClick={() => handlerVolumeChanger('waitTimePlus')} width={30} height={30} alt='' />
                                </div>
                            </div>
                            </div>
                            <div className="text-center">
                            <h1 className='text-[20px] font-bold '>Volume</h1>
                            <div className="bg-[#1C1C1E80] w-[160px] flex justify-center flex-col items-center rounded-3xl p-2">
                                <Image src={'/StopwatchIconAnimation (1).png'} width={100} height={100} alt='' />
                                <div className="h-10 w-[90%] bg-[#a8a8ad99] rounded-lg  p-1 mx-auto my-0 flex items-center justify-between">
                                    <Image src={'/minus.png'} onClick={() => handlerVolumeChanger('volumeMinus')} width={30} height={30} alt='' />
                                    <div className=" flex flex-col items-center">
                                        <h6 className='text-[#FFFFFF] text-[12px]'>Volume</h6>
                                        <div className='flex items-center '>
                                            <h6 className='text-white text-[14px]'>{getVolume}</h6>
                                            <sub className='text-[#FFFFFF] text-[12px]'>%</sub>
                                        </div>
                                    </div>
                                    <Image src={'/plus.png'} onClick={() => handlerVolumeChanger('volumePlus')} width={30} height={30} alt='' />
                                </div>
                            </div>
                            </div>
                            <div className="text-center">
                            <h1 className='text-[20px] font-bold '>Person</h1>
                            <div className="bg-[#1C1C1E80] w-[160px] flex justify-center flex-col items-center rounded-3xl p-2">
                                <Image src={'/multiple-users-silhouette 1.png'} width={100} height={100} alt='' />
                                <div className="h-10 w-[90%] bg-[#a8a8ad99] rounded-lg  p-1 mx-auto my-0 flex items-center justify-between">
                                    <Image src={'/minus.png'} onClick={() => handlerVolumeChanger('personMinus')} width={30} height={30} alt='' />
                                    <div className=" flex flex-col items-center">
                                        <h6 className='text-[#FFFFFF] text-[12px]'>Person</h6>
                                        <div className='flex'>
                                            <h6 className='text-white text-[14px]'>{person}</h6>
                                        </div>
                                    </div>
                                    <Image src={'/plus.png'} onClick={() => handlerVolumeChanger('personPlus')} width={30} height={30} alt='' />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                        <div className="flex justify-center mt-4">
                            {check?(
                                <button onClick={handlerUpdate} className='py-2 px-4 rounded-2xl text-black bg-white'>Update</button>
                                ):(
                                <button onClick={handlerSubmit} className='py-2 px-4 rounded-2xl text-black bg-white'>Submit</button>
                            )}
                        </div>

                </div>
            </div>
            <div className="bg-white rounded-2xl mt-4 w-full p-8">
                <Calendar barid={id}/>
            </div>
            {/* for login user */}
            {/* <div className="mt-2 flex gap-4 items-center">
            {filteredItems&&filteredItems.map((items:any,index:number)=>(
                <Card setId={setId} key={index} image={items.image}  id={items.bar_id} waitTime={items.waitTime} offers={items.offers} title={items.title} rating={items.rating}/>
            ))}
        </div> */}
            {/* for guest users */}
            {/* <div className="mt-8 flex items-center gap-1 w-full">
            {offers&&offers.map((items:any,index:number)=>(
        <div key={index} className="relative h-[200px] w-[320px]  rounded-lg ">
        <Image src={items.image}  className='rounded-lg' fill alt=''/>
        </div>
            ))}
        </div> */}
        <ToastContainer/>
        </div>
    )
}

export default ProductDetail