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
import ProgressCard from "./ProgressCard";

type AddChartGridProps = {
  displayActiveProgress: Progress;
};

function DisplayActiveProgress({ displayActiveProgress }: AddChartGridProps) {
  const navigate = useNavigate();
  const nextMeasurementDate = new Date("2025-01-15");
  const measurementDay = "Monday";

  const handleRedirectToCreateChart = () => {
    navigate("/progresses");
  };

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full relative text-center mb-6 sm:mb-8">
        <div className="relative z-10 px-4">
          <Button
            color="primary"
            variant="shadow"
            onPress={handleRedirectToCreateChart}
            className="text-lg px-6 py-3 rounded-lg">
            Show All Progresses
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* ProgressCard */}
        <div className="flex-1 h-full">
          <ProgressCard displayActiveProgress={displayActiveProgress} />
        </div>

        {/* PlanningComponent */}
        <div className="flex-1 h-full">
          <PlanningComponent
            nextMeasurementDate={nextMeasurementDate}
            measurementDay={measurementDay}
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayActiveProgress;
