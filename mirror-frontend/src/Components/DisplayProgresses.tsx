import { Progress } from "../Types/Progress/ProgressType";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import FireIcon from "./Icons/FireIcon";

type AddChartGridProps = {
  progresses: Progress[];
};

function DisplayProgresses({ progresses }: AddChartGridProps) {
  const navigate = useNavigate();

  const handleRedirectToCreateChart = () => {
    navigate("/progressess");
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4 sm:p-6 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Your Progresses
      </h1>
      <Button
        color="primary"
        variant="shadow"
        onClick={handleRedirectToCreateChart}
        className="mb-6 sm:mb-8"
      >
        Add Progress
      </Button>
      <div className="w-full flex sm:flex-col md:flex-col lg:flex-row gap-4">
      {/*This should wrap into component z.B. TrackingComponent*/}
      {progresses.map((progress, index) => (
        <Card
        key={index}
        className="flex-1 bg-white shadow-lg border border-gray-200"
      >
        <CardHeader className="flex justify-between items-center border-b border-gray-200 p-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {progress.progressName}
            </h2>
            <p className="text-xs text-gray-500">Your current progress overview</p>
          </div>
          {progress.isAchieved && (
            <span className="text-xs sm:text-sm text-green-600 font-medium">
              Active
            </span>
          )}
        </CardHeader>
        <CardBody className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Progress Stats */}
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-bold">Last Value</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600">
                85
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-bold">Goal</p>
              <p className="text-2xl font-semibold text-green-600">
                82
              </p>
            </div>
          </div>
      
          {/* Right: Circular Progress */}
          <div className="relative flex flex-col items-center justify-center">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-blue-600",
                track: "stroke-zinc-400",
              }}
              value={progress.percentageAchieved}
              size="lg"
              strokeWidth={4}
            />
            <div className="absolute flex flex-col items-center justify-center text-blue-600">
              <p className="text-3xl font-semibold">{progress.percentageAchieved}%</p>
              <p className="text-sm">Completed</p>
            </div>
          </div>
        </CardBody>
      
        <CardFooter className="border-t border-gray-200 p-4 flex flex-wrap justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-600">
              Tracked Days: <strong className="text-gray-800">35</strong>
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FireIcon size={18} color="red" />
              <span>Streak: 10 days</span>
            </div>
          </div>
          <div>
            <Button size="sm" variant="shadow" color="primary">
              Details
            </Button>
          </div>
        </CardFooter>
      </Card>
      ))}
      {/*This should wrap into component z.B. PlanningComponent*/}
      <Card className="flex-1 bg-white shadow-lg border border-gray-200">
        <CardHeader>
          <div className="text-lg font-semibold">Next Measurement Countdown</div>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center p-4">
          <div className="text-4xl font-bold text-red-600">5</div>
        </CardBody>
      </Card>
    </div>

    </div>
  );
}

export default DisplayProgresses;
