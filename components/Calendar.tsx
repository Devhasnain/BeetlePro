import React, { useLayoutEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { baseRoute } from '@/utils/route'

const Calendar = ({barid}:any) => {
  function renderEventContent(eventInfo:any) {
    console.log('titleayega',eventInfo.event._def)
    return (
           <div className="">
            {/* <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <button>123</button>
      </div> */}
      <div className="rounded-3xl absolute bg-white  right-4 border flex justify-center items-center flex-col -bottom-6 h-[50px] w-[80px]">
                <h1 className='text-[14px] font-medium'>10-05</h1>
                <p className='text-[12px] text-[#585C5C]'>min</p>
            </div>
           </div>
    );
  }
  // function renderEventContent(eventInfo:any) {
  //   return (
  //     <div>
  //       <b>{eventInfo.timeText}</b>
  //       <i>{eventInfo.event.title}</i>
  //       <button>123</button>
  //     </div>
  //   );
  // }
 const  handleEventClick = (clickInfo:any) => {
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  
  };
  const [AllDates,setDates]=useState([])
  useLayoutEffect(()=>{
    const fect=()=>{
      var requestOptions:any = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`${baseRoute}barsDates/${barid}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
          setDates(result.data)
          console.log(result,'acha')})
        .catch(error => console.log('error', error));
    }
    fect()
  },[])
  console.log('AllDates',AllDates)
  return (
    <div className=''>
         <FullCalendar
         height={500}
          plugins={[
            dayGridPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: ''
          }}
          // nowIndicator={true}
          // editable={true}
          // selectable={true}
          // selectMirror={true}
          events={AllDates}
          // events={[
          //   {
          //     title: 'All Day Event',
          //     start: '2023-09-01'
          //   },
          //   {
          //     title: 'one Day Event',
          //     start: '2023-09-02'
          //   },
           
          // ]}
          eventContent={renderEventContent} 
          // eventClick={handleEventClick}
          // initialEvents={[
          //   // { title: 'nice event', start: new Date(), resourceId: 'a' },
          //   { title: 'event 1', end: '2023-09-03' },
          // ]}
        />
    </div>
  )
}

export default Calendar