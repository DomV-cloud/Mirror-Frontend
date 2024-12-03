import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Chart from "react-apexcharts";
import { Progress, ProgressValue } from "../../Types/Progress/ProgressType";
import { getProgressById } from "../../Api/Client/Endpoints/ProgressById";

const AreaChart = () => {
  const { progressId } = useParams(); // Získáme progressId z URL parametru
  const [timePeriod, setTimePeriod] = useState("7");
  const [chartData, setChartData] = useState<number[]>([]); // Číselná pole pro hodnoty
  const [categories, setCategories] = useState<number[]>([]);
  const [progressName, setProgressName] = useState<string>('');  

  useEffect(() => {
    const fetchData = async () => {
      if (!progressId) return;
      try {
        const response = await getProgressById(progressId);
        const progress: Progress = response.data;
  
        // Transformace dat
        const timeData = progress.progressValue.map((entry: ProgressValue) => ({
          value: Number(entry.progressColumnValue.replace(":", ".")),
          date: entry.progressDate_Day,
          month: entry.progressDate_Month,
          timestamp: new Date(entry.progressDate_Year, entry.progressDate_Month - 1, entry.progressDate_Day).getTime(), // Timestamp pro snadné třídění
        }));
  
        // Řazení podle timestampu (od nejstaršího k nejnovějšímu)
        const sortedData = timeData.sort((a, b) => a.timestamp - b.timestamp);
        console.log("Sorted Time Data:", sortedData);
        
        // Data bez filtrace
        const values = sortedData.map((entry) => entry.value);
        const dates = sortedData.map((entry) => entry.date);
        
        setChartData(values); // Nastavení hodnot grafu
        setCategories(dates);
        console.log("Dates:", dates);
        console.log("Categories:", categories);
        setProgressName(progress.progressName); // Nastavení názvu progressu
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    fetchData();
  }, [progressId]);
  

  const filterDataByTimePeriod = (data: { value: number; date: string }[], period: string) => {
    const days = parseInt(period);
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - days);

    return data.filter((entry) => {
      const [day, month, year] = entry.date.split("/").map(Number);
      const entryDate = new Date(year, month - 1, day);
      console.log("Entry Date:", entryDate, "Cutoff Date:", cutoffDate);
      return entryDate >= cutoffDate;
    });
  };

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
      categories: categories.length ? categories : ["No data available"],
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
        text: "Time (MM:SS)", // Popisek osy Y
      },
    },
  };

  const chartSeries = [
    {
      name: "Your Progress",
      data: chartData,
      color: "#1A56DB",
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {progressName}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Training Time in last {timePeriod} days
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          +12%
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
            <button onClick={() => setTimePeriod("7")} className={`px-3 py-1 text-sm font-medium ${timePeriod === "7" ? "text-blue-500" : "text-gray-500"} dark:hover:text-white`}>
              Last 7 days
            </button>
            <button onClick={() => setTimePeriod("30")} className={`px-3 py-1 text-sm font-medium ${timePeriod === "30" ? "text-blue-500" : "text-gray-500"} dark:hover:text-white`}>
              Last 30 days
            </button>
            <button onClick={() => setTimePeriod("90")} className={`px-3 py-1 text-sm font-medium ${timePeriod === "90" ? "text-blue-500" : "text-gray-500"} dark:hover:text-white`}>
              Last 90 days
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
