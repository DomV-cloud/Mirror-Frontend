import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { Progress } from "../../Types/Progress/ProgressType";
import { getProgressById } from "../../Api/Client/Endpoints/ProgressById";
import UpdateProgressModal from "../Modals/UpdateProgressModal";

const AreaChart = () => {
  const { progressId } = useParams();
  const [chartData, setChartData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [progressName, setProgressName] = useState<string>("");
  const [dataByMonth, setDataByMonth] = useState<
    Record<string, Record<string, { value: number[]; date: string[] }>>
  >({});
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedColumnHead, setSelectedColumnHead] = useState<string>("all");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState<Progress | null>(null);

  const handleOpenDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  const fetchProgressData = async (id: string) => {
    try {
      const response = await getProgressById(id);
      const progress: Progress = response.data;

      const groupedData: Record<
        string,
        Record<string, { value: number[]; date: string[] }>
      > = {
        all: { all: { value: [], date: [] } },
      };

      Object.entries(progress.progressValue).forEach(([key, entries]) => {
        entries.forEach((entry: any) => {
          const columnHead = entry.progressColumnHead || "default";
          const value = Number(entry.progressColumnValue.replace(":", "."));
          const date = `${entry.progressDate_Day}/${entry.progressDate_Month}/${entry.progressDate_Year}`;
          const month = `${entry.progressDate_Month}-${entry.progressDate_Year}`;

          if (!groupedData[columnHead]) {
            groupedData[columnHead] = { all: { value: [], date: [] } };
          }

          if (!groupedData[columnHead][month]) {
            groupedData[columnHead][month] = { value: [], date: [] };
          }

          groupedData[columnHead][month].value.push(value);
          groupedData[columnHead][month].date.push(date);

          groupedData[columnHead].all.value.push(value);
          groupedData[columnHead].all.date.push(date);

          groupedData.all.all.value.push(value);
          groupedData.all.all.date.push(date);
        });
      });

      setSelectedProgress(progress);
      setDataByMonth(groupedData);
      setChartData(groupedData.all.all.value);
      setCategories(groupedData.all.all.date);
      setProgressName(progress.progressName || "Unnamed Progress");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (progressId) fetchProgressData(progressId);
  }, [progressId]);

  const currentMonthData = useMemo(() => {
    return (
      dataByMonth[selectedColumnHead]?.[selectedMonth] || { value: [], date: [] }
    );
  }, [selectedColumnHead, selectedMonth, dataByMonth]);

  useEffect(() => {
    setChartData(currentMonthData.value);
    setCategories(currentMonthData.date);
  }, [currentMonthData]);

  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    tooltip: { enabled: true, x: { show: true } },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0, shade: "#1C64F2", gradientToColors: ["#1C64F2"] },
    },
    dataLabels: { enabled: false },
    stroke: { width: 6 },
    grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: 0 } },
    xaxis: {
      categories: categories.length > 0 ? categories : ["No data available"],
      labels: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { title: { text: "Time (MM:SS)" } },
  };

  const chartSeries = [{ name: "Your Progress", data: chartData, color: "#1A56DB" }];

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {progressName}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Select Column and Month to View Data
          </p>
        </div>
        <button
          onClick={handleOpenDialog}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Data
        </button>
      </div>

      <UpdateProgressModal
        opened={showDialog}
        onClose={handleCloseDialog}
        progressesToUpdate={selectedProgress}
      />

      <div className="flex space-x-4 py-4">
        <div>
          <label htmlFor="column-head" className="block text-sm font-medium text-gray-700">
            Select Column Head
          </label>
          <select
            id="column-head"
            value={selectedColumnHead}
            onChange={(e) => setSelectedColumnHead(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300"
          >
            {Object.keys(dataByMonth).map((columnHead) => (
              <option key={columnHead} value={columnHead}>
                {columnHead}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Select Month
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300"
          >
            <option value="all">All</option>
            {Object.keys(dataByMonth[selectedColumnHead] || {})
              .filter((key) => key !== "all")
              .map((monthKey) => (
                <option key={monthKey} value={monthKey}>
                  {monthKey}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="py-4" id="area-chart">
        <Chart
          key={categories.join("-")}
          options={{ ...options, xaxis: { ...options.xaxis, categories } }}
          series={chartSeries}
          type="area"
          height={300}
        />
      </div>
    </div>
  );
};

export default AreaChart;
