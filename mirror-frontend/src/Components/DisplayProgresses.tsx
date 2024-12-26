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
import PlanningComponent from "./PlanningComponent";
import backgroundImage from '../assets/images/sprout-growing-bg.jpg';

type AddChartGridProps = {
  progresses: Progress[];
};

function DisplayProgresses({ progresses }: AddChartGridProps) {
  const navigate = useNavigate();
  const nextMeasurementDate = new Date("2025-01-15");
  const measurementDay = "Monday";

  const handleRedirectToCreateChart = () => {
    navigate("/progressess");
  };

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full relative text-center mb-6 sm:mb-8">
      {/* Pozadí s obrázkem */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent"
        /*Tady bych to nahradil spíše animací */
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Text nad obrázkem */}
      <div className="relative z-10 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Plant the seed today, and watch your progress bloom.
        </h1>
        <Button
          color="primary"
          variant="shadow"
          onClick={handleRedirectToCreateChart}
          className="text-lg px-6 py-3 rounded-lg"
        >
          Add Progress
        </Button>
      </div>
    </div>


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
      <PlanningComponent nextMeasurementDate={nextMeasurementDate} measurementDay={measurementDay} />
    </div>

    </div>
  );
}

export default DisplayProgresses;
