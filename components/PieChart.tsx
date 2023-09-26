'use client'
import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = ({ volume }: any) => {
  const series= [parseInt(volume), 400]; // Adjust the values as needed
  const options :any= {
    colors: ['#00000033', '#545454'],
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      show: false,
      formatter: function (val:any, opts:any) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
    noData: {
      text: 'No data',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="text-center">
      <h1>Volume</h1>
      {volume && <Chart options={options} series={series} type="donut" />}
    </div>
  );
};

export default ApexChart;
