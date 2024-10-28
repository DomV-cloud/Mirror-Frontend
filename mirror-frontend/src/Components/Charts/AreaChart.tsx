// src/AreaChart.tsx
import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { getAllProgresses } from '../../Api/Client/Endpoints/progressValueApi';
import { Progress, ProgressValue } from '../../Types/Progress/ProgressType';

const AreaChart = () => {
  const [timePeriod, setTimePeriod] = useState('7');
  const [chartData, setChartData] = useState<string[]>([]); // String array for time values
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProgresses();
        const progresses: Progress[] = response.data;

        const timeData = progresses.flatMap((item) =>
          item.progressColumnHead === "Time" 
            ? item.progressValue.map((entry : ProgressValue) => ({
                value: entry.progressColumnValue,
                date: `${entry.progressDate_Day}/${entry.progressDate_Month}/${entry.progressDate_Year}`,
              }))
            : []
        );

        const values = timeData.map((entry) => entry.value);
        const dates = timeData.map((entry) => entry.date);

        setChartData(values);
        setCategories(dates);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

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
        show: true,
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
        top: 0,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: 'Time (MM:SS)', // Y-axis label
      },
    },
  };

  const chartSeries = [
    {
      name: "Training Time",
      data: chartData.map((value) => Number(value.replace(':', '.'))),
      color: "#1A56DB",
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {timePeriod === '7' ? '32.4k' : timePeriod === '30' ? '120k' : '350k'}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Training Time in last {timePeriod} days
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
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
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
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
