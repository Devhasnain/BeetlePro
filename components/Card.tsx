import Image from "next/image";

const Card = ({id,image,waitTime,title,rating,offers,setId}:any)=>{
    return(
        <div key={id} className='cursor-pointer shadow-[0px_1px_4px_0px_#00000014] relative w-[250px] rounded-lg' onClick={()=>setId(id)}>
            <div className={`flex flex-col items-start  absolute top-${2} z-10 left-2`}>
          {/* {offers.map((offerItem:any,index:number)=>(
          <span key={index} className={`p-1 ${index==0?'bg-white text-red-600':'bg-red-600 text-white'}`}>
            {offerItem.type}
            </span>
            ))} */}
          <span  className={`p-1 bg-white text-red-600`}>
            {offers.offers}
            </span>
            </div> 
    <div className="relative h-[200px] rounded-lg ">
    <Image src={image}  className='rounded-lg' fill alt=''/>
    </div>
    <div className="p-2 pb-8 relative" >
        <div className="rounded-3xl absolute bg-white  right-4 flex justify-center items-center flex-col -top-8 h-[60px] w-[80px]">
            <h1 className='text-[16px] font-medium'>{waitTime.split(':')[0]}-{waitTime.split(':')[1]}</h1>
            <p className='text-[12px] text-[#585C5C]'>min</p>
        </div>
        <h1 className='text-md font-semibold'>{title}</h1>
        <span className='flex items-center gap-2'>
    <Image src={'/start.png'}  className='rounded-lg' height={15} width={15} alt=''/>
        <p className='text-[12px] text-[#4D7C1B]'>{rating} Excellent</p>
        <p className=' text-[12px] text-[#585C5C]'>(500+)</p>
        </span>
        <span className='flex items-center gap-2'>
        {/* <p className='text-[12px] text-[#585C5C]'> {distance.toFixed(2)} miles away</p> */}
        </span>
    </div>
</div>
    )
}

export default Card;