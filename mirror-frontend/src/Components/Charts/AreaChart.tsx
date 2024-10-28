import { useState } from 'react';
import Chart from 'react-apexcharts';

const AreaChart = () => {
  const [timePeriod, setTimePeriod] = useState('7');

  // Nastavení konfigurace grafu
  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    xaxis: {
      categories: timePeriod === '7' 
                  ? ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb']
                  : timePeriod === '30' 
                  ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
                  : Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`),
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  // Nastavení datové série grafu
  const chartSeries = [
    {
      name: "New users",
      data: timePeriod === '7'
        ? [6500, 6418, 6456, 6526, 6356, 6456, 6700]
        : timePeriod === '30'
        ? Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 6000)
        : Array.from({ length: 90 }, () => Math.floor(Math.random() * 1000) + 6000),
      color: "#1A56DB",
    },
  ];

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {timePeriod === '7' ? '32.4k' : timePeriod === '30' ? '120k' : '350k'}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Users in last {timePeriod} days</p>
        </div>
        <div
          className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center"
        >
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>

      <div className="py-4" id="area-chart">
        <Chart options={options} series={chartSeries} type="area" height={300} />
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between pt-4">
        <div className="flex justify-between items-center">
          <div>
            <button onClick={() => setTimePeriod('7')} className={`px-3 py-1 text-sm font-medium ${timePeriod === '7' ? 'text-blue-500' : 'text-gray-500'} dark:hover:text-white`}>
              Last 7 days
            </button>
            <button onClick={() => setTimePeriod('30')} className={`px-3 py-1 text-sm font-medium ${timePeriod === '30' ? 'text-blue-500' : 'text-gray-500'} dark:hover:text-white`}>
              Last 30 days
            </button>
            <button onClick={() => setTimePeriod('90')} className={`px-3 py-1 text-sm font-medium ${timePeriod === '90' ? 'text-blue-500' : 'text-gray-500'} dark:hover:text-white`}>
              Last 90 days
            </button>
          </div>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
          >
            Users Report
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
