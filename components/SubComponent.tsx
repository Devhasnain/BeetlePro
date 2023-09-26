'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { baseRoute } from '@/utils/route';
import { CounterContext } from '@/ThemeContext';
import BarChart from './BarChart';
import { ToastContainer, toast } from 'react-toastify';


const SubComponent=()=>{
    const [barData,setBarData] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [BardsTimming, setBardsTimming] = useState<any>({})
    const [Bards, setBards] = useState([])
    const [person, setPerson] = useState(0)
    const [userData,setUserData] = useState<any>([])

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user') as any)
        setUserData(user)
        async function fetchData() {
            setLoading(true)
            try {
                fetch(`${baseRoute}bar/${user.email}`, requestOptions)
          .then(response => response.json())
          .then((result) =>{
            setBarData(result.data)
            fetch(`${baseRoute}bartimmings/${result.data.id}`, requestOptions)
            .then(response => response.json())
            .then((result) =>{
            setBardsTimming(calculateAverages(result.data))
            setBards(result.data)
            console.log(result)
            })
            .catch(error => console.log('error', error));
            fetch(`${baseRoute}offers/${result.data.id}`, requestOptions)
            .then(response => response.json())
            .then((result) => {
        dispatch({ type: "OFFERS",payload: result.data})
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        })
          .catch(error => console.log('error', error));
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var requestOptions: any = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
            }
            catch (error) {
                console.log('error', error);
            }
        }
        fetchData();
    }, []);

function calculateAverages(data: any) {
    const totalRecords = data.length;
  
    if (totalRecords === 0) {
      return {
        averageQueue: 0,
        averageVolume: 0,
        averageWaitTime: '00:00', // Initialize with minutes or seconds
      };
    }
  
    let totalQueue = 0;
    let totalVolume = 0;
    let totalWaitTime = 0;
  
    data.forEach((item: any) => {
      totalQueue += parseInt(item.queue);
      totalVolume += parseInt(item.volume);
  
      const [minutes, seconds] = item.waittime.split(':'); // Include minutes or seconds
      totalWaitTime += parseInt(minutes) * 60 + parseInt(seconds); // Calculate in seconds
    });
  
    const averageQueue = totalQueue / totalRecords;
    const averageVolume = totalVolume / totalRecords;
    const averageWaitTimeSeconds = totalWaitTime / totalRecords;
    const averageWaitTime = `${String(Math.floor(averageWaitTimeSeconds / 60)).padStart(2, '0')}:${String(Math.floor(averageWaitTimeSeconds % 60)).padStart(2, '0')}`;
  
    return {
      averageQueue,
      averageVolume,
      averageWaitTime,
    };
  }
  
if (loading) {
    <div className="">loading ...</div>
}
const [getVolume, setVolume] = useState(0)
const [getWaitTime, setWaitTime] = useState(0)
const handlerVolumeChanger = (value: string) => {
    switch (value) {
        case "volumeMinus":
            getVolume != 0 && setVolume(getVolume - 5)
            break;
        case "volumePlus":
            getVolume != 100 && setVolume(getVolume + 5)
            break;
        case "waitTimeMinus":
            getWaitTime != 0 && setWaitTime(getWaitTime - 1)
            break;
        case "waitTimePlus":
            getWaitTime != 20 && setWaitTime(getWaitTime + 1)
            break;
        default:
            break;
    }
}
const { state, dispatch } = useContext(CounterContext);
const [check,setCheck]=useState(false)
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
const handlerUpdate = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "user_id": userData.id,
        "bar_id": `${barData.id}`,
        "waittime": `${minutesToHHMM(getWaitTime * 60)}`,
        "volume": `${getVolume}`,
        "queue": `100`
    });
    
    var requestOptions:any = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`${baseRoute}bartimmings/update/${userData.id}/${userData.id}`, requestOptions)
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
"bar_id": `${barData.id}`,
"waittime": `${minutesToHHMM(getWaitTime * 60)}`,
"volume": `${getVolume}`,
"queue": `100`
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
function timeToDecimal(timeString:any) {
    const [minutes, seconds] = timeString.split(':');
    const decimalMinutes = parseFloat(minutes);
    const decimalSeconds = parseFloat(seconds) / 60; // Convert seconds to a fraction of a minute
    const totalDecimalTime = decimalMinutes + decimalSeconds;
  
    return parseInt(totalDecimalTime.toFixed(1)); // Format to one decimal place
  }
return(
    <>
        <div className="flex gap-4 w-full px-8">
            <div className="w-[60%]">
                <h1 className='text-white mb-2'>TOP Bar is open</h1>
                {/* <p>{new Date().toUTCString()}</p> */}
                <div className="w-full flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center flex-col justify-center p-2 rounded-2xl bg-[linear-gradient(159.93deg,#4100FA_13.38%,_rgba(108,112,118,0)150.07%)] w-[35%] h-[120px]">
                        <p className='text-[10px] text-white'>Total waiting time </p>
                        <h1 className='text-[14px] text-white'>{BardsTimming?.averageWaitTime}</h1>
                    </div>
                    <div className="flex items-center flex-col justify-center p-2 rounded-2xl bg-[linear-gradient(169.45deg,_#D2C7F4_-3.64%,_rgba(108,112,118,0)167.57%)] w-[25%] h-[120px]">
                        <p className='text-[10px] text-white'>Volume of Guest</p>
                        <h1 className='text-[14px] text-white'>{BardsTimming?.averageQueue}</h1>
                    </div>
                    <div className="flex items-center flex-col justify-center p-2 rounded-2xl bg-[linear-gradient(174.24deg,_#4100FA_4.04%,rgba(108,112,118,0)95.06%)] w-[35%] h-[120px]">
                        <p className='text-[10px] text-white'>opening - Closing</p>
                        <h1 className='text-[14px] text-white'>8am:8pm</h1>
                    </div>
                </div>
                <div className="">
                    <BarChart Bards={Bards}/>
                    <div className="mt-8 flex  gap-8 p-4 rounded-xl bg-[linear-gradient(183.65deg,#23202D_3%,rgba(100,115,254,0.38)107%)]">
                        <div className="text-center">
                            <h1 className='text-[20px] font-bold text-white mb-2'>WAIT TIME</h1>
                            <div className="bg-[#1C1C1E80] w-[150px] flex justify-center flex-col items-center rounded-3xl p-2">
                                <Image src={'/StopwatchIconAnimation.png'} width={100} height={100} alt='' />
                                <div className="h-10 w-[90%] bg-[#a8a8ad99] rounded-lg  p-1 mx-auto my-0 flex items-center justify-between">
                                    <Image src={'/minus.png'}className='cursor-pointer' onClick={() => handlerVolumeChanger('waitTimeMinus')} width={30} height={30} alt='' />
                                    <div className=" flex flex-col items-center">
                                        <h6 className='text-[#FFFFFF] text-[12px]'>Wait</h6>
                                        <div className='flex items-center '>
                                            <h6 className='text-white text-[14px]'>{getWaitTime}</h6>

                                            <sub className='text-[#FFFFFF] text-[12px]'>m</sub>
                                        </div>
                                    </div>
                                    <Image src={'/plus.png'}className='cursor-pointer' onClick={() => handlerVolumeChanger('waitTimePlus')} width={30} height={30} alt='' />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className='text-[20px] font-bold text-white mb-2'>Volume</h1>
                            <div className="bg-[#1C1C1E80] w-[150px] flex justify-center flex-col items-center rounded-3xl p-2">
                                <Image src={'/StopwatchIconAnimation (1).png'} width={100} height={100} alt='' />
                                <div className="h-10 w-[90%] bg-[#a8a8ad99] rounded-lg  p-1 mx-auto my-0 flex items-center justify-between">
                                    <Image src={'/minus.png'} className='cursor-pointer' onClick={() => handlerVolumeChanger('volumeMinus')} width={30} height={30} alt='' />
                                    <div className=" flex flex-col items-center">
                                        <h6 className='text-[#FFFFFF] text-[12px]'>Volume</h6>

                                        <div className='flex items-center '>
                                            <h6 className='text-white text-[14px]'>{getVolume}</h6>
                                            <sub className='text-[#FFFFFF] text-[12px]'>%</sub>
                                        </div>
                                    </div>
                                    <Image src={'/plus.png'} className='cursor-pointer' onClick={() => handlerVolumeChanger('volumePlus')} width={30} height={30} alt='' />
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
            </div>
            <div className="w-[40%] ">
                <h1 className='text-white mb-2'>Offers</h1>
                <div className="flex gap-2">
                    <div className=" flex flex-col gap-1 w-full">
                        {state.offers && state.offers.map((items: any, index: number) => (
                            <div key={index} className="relative h-[150px] w-[250px]  rounded-xl">
                                <Image src={items.image} className='rounded-lg' fill alt='' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    </>
)
}

export default SubComponent;