import { IProgress } from "../Types/Progress/ProgressType";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import PlanningComponent from "./PlanningComponent";
import ProgressCard from "./ProgressCard";
import { useState } from "react";
import { IProgressGoal } from "../Interfaces/ProgressGoal/IProgressGoal";

type AddChartGridProps = {
  displayActiveProgress: IProgress;
};

type ProgressGoalResponse = {
  Measurement: ProgressGoalMeasurementResponse;
  IsAchieved?: boolean;
  TrackedDays: number;
  PercentageAchieved: number;
};

type ProgressGoalMeasurementResponse = {
  MeasurementDay: string;
  MeasurementDate: Date;
  DaysRemaining: number;
};

function DisplayActiveProgress({ displayActiveProgress }: AddChartGridProps) {
  const navigate = useNavigate();
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
        <div className="flex-1 h-full">
          <ProgressCard displayActiveProgress={displayActiveProgress} />
        </div>

        <div className="flex-1 h-full">
          <PlanningComponent
            Measurement={displayActiveProgress.Goal.Measurement}
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayActiveProgress;
