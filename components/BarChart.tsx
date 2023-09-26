'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = ({Bards}:any) => {
  const colors =['#ffff']
  const [selectedOption, setSelectedOption] = useState('queue'); // Initial selected option
  
  const data = [
    { created_at: '2023-09-04T23:09:30.000000Z', value: '423.00' },
    { created_at: '2023-09-04T23:09:30.000000Z', value: '423.00' },
    { created_at: '2023-09-05T23:09:30.000000Z', value: '300.00' },
    // ... more data ...
  ];
  const groupedData = Bards.reduce((accumulator:any, item:any) => {
    const date = new Date(item.created_at).toLocaleDateString();
    if (!accumulator[date]) {
      accumulator[date] = [];
    }
    accumulator[date].push({
      waittime: item.waittime,
      volume: item.volume,
      queue: item.queue,
    });
   console.log(accumulator,'accumulator')
    return accumulator;
  }, {});
  const summarizedData = Object.keys(groupedData).map((date) => ({
    date,
    sum: groupedData[date].reduce((acc:any, item:any) => acc + parseInt(item[selectedOption]), 0),
  }));
 
  const options = {
    xaxis: {
      categories: summarizedData.map((item) => item.date),
    },
    
    // ... other chart options ...
  };
  
  const series = [
    {
      name: selectedOption,
      data: summarizedData.map((item) => item.sum),
    },
  ];
 
 
    const [chartData, setChartData] = useState<any>({
        series: series,
        toolbar: { show:false },
        // dataLabels: {
        //   enabled: true,
        //   enabledOnSeries: undefined,
        //   formatter: function (val:any, opts:any) {
        //       return val
        //   },
        //   textAnchor: 'middle',
        //   distributed: false,
        //   offsetX: 0,
        //   offsetY: 0,
        //   style: {
        //       fontSize: '14px',
        //       fontFamily: 'Helvetica, Arial, sans-serif',
        //       fontWeight: 'bold',
        //       colors: undefined
        //   },
        //   background: {
        //     enabled: true,
        //     foreColor: '#fff',
        //     padding: 4,
        //     borderRadius: 2,
        //     borderWidth: 1,
        //     borderColor: '#fff',
        //     opacity: 0.9,
        //     dropShadow: {
        //       enabled: false,
        //       top: 1,
        //       left: 1,
        //       blur: 1,
        //       color: '#000',
        //       opacity: 0.45
        //     }
        //   },
        //   dropShadow: {
        //       enabled: false,
        //       top: 1,
        //       left: 1,
        //       blur: 1,
        //       color: '#000',
        //       opacity: 0.45
        //   }
        options
        // },
        ,
          colors: ['#B6BCF8','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
          
  plotOptions: {
    bar: {
        horizontal: false,
        borderRadius: 12,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
        columnWidth: '70%',
        barHeight: '70%',
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        hideZeroBarsWhenGrouped: false,
        isDumbbell: false,
        dumbbellColors: undefined,
        isFunnel: false,
        isFunnel3d: true,
        colors: {
            ranges: [{
                from: 0,
                to: 0,
                color: undefined
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
        },
        dataLabels: {
            position: 'top',
            maxItems: 100,
            hideOverflowingLabels: true,
          
            total: {
              enabled: false,
              formatter: undefined,
              offsetX: 0,
              offsetY: 0,
              style: {
                color: '#373d3f',
                fontSize: '12px',
                fontFamily: undefined,
                fontWeight: 600
              }
            }
        }
    }
},
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
         
  yaxis: {
    show: true,
    // showAlways: true,
    // showForNullSeries: true,
    // seriesName: undefined,
    // opposite: false,
    // reversed: false,
    // logarithmic: false,
    // logBase: 10,
    // tickAmount: 6,
    // min: 6,
    // max: 6,
    // forceNiceScale: false,
    // floating: false,
    // decimalsInFloat: undefined,
    labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
            colors: ['#ffffff'],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value:any) => { return value },
    },
    // axisBorder: {
    //     show: true,
    //     color: '#78909C',
    //     offsetX: 0,
    //     offsetY: 0
    // },
    // axisTicks: {
    //     show: true,
    //     borderType: 'solid',
    //     color: '#78909C',
    //     width: 6,
    //     offsetX: 0,
    //     offsetY: 0
    // },
    // title: {
    //     text: undefined,
    //     rotate: -90,
    //     offsetX: 0,
    //     offsetY: 0,
    //     style: {
    //         color: undefined,
    //         fontSize: '12px',
    //         fontFamily: 'Helvetica, Arial, sans-serif',
    //         fontWeight: 600,
    //         cssClass: 'apexcharts-yaxis-title',
    //     },
    // },
}

,
       
        })
        function CustomDropdown() {
          const [isOpen, setIsOpen] = useState(false);
          const options = ['queue', 'waittime', 'volume']; // Add your dropdown options here
          const toggleDropdown = () => {
            setIsOpen(!isOpen);
          };
          const selectOption = (option:any) => {
            setSelectedOption(option);
            setIsOpen(false);
          };

          return (
            <div className="relative inline-block">
              <div
                className="flex text-[12px] text-white items-center gap-1 bg-[#34383B] p-2 rounded-2xl cursor-pointer"
                onClick={toggleDropdown}
              >
                {selectedOption}
                <img src="/icons (2).png" height={10} width={10} alt="" />
              </div>
        
              {isOpen && (
                <ul className="absolute mt-2 py-1 z-30 w-32 bg-[#34383B] text-[12px] text-white rounded-2xl shadow">
                  {options.map((option) => (
                    <li
                      key={option}
                      className={`px-2 py-1 cursor-pointer ${
                        selectedOption === option ? 'bg-blue-500 rounded-2xl' : ''
                      }`}
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
  return (
    <div className="p-4 rounded-3xl bg-[linear-gradient(183.65deg,#4100FA_3%,rgba(178,183,231,0.38)107%)]">
      <div className="w-full flex justify-between items-center my-4">
        <h1 className=' text-white text-[20px] font-bold'>Overview</h1>
       
       <CustomDropdown/>
      </div>
  <Chart
  options={options}
  series={series}
  type="bar"
/>
    </div>
  )
}

export default BarChart