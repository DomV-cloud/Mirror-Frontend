import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import FireIcon from "./Icons/FireIcon";
import { Progress } from "../Types/Progress/ProgressType";
import { useNavigate } from "react-router-dom";

type ProgressCardProps = {
  displayActiveProgress: Progress;
  onEdit: () => void;
};
export default function ProgressCard({
  displayActiveProgress,
  onEdit,
}: ProgressCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/progresses/${displayActiveProgress.id}`);
  };

  return (
    <div
      className="w-full flex sm:flex-col md:flex-col lg:flex-row gap-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}>
      <Card className="flex-1 bg-white shadow-lg border border-gray-200">
        <CardHeader className="flex justify-between items-center border-b border-gray-200 p-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {displayActiveProgress.progressName}
            </h2>
            <p className="text-xs text-gray-500">
              Your current progress overview
            </p>
          </div>
          {displayActiveProgress.isActive && (
            <span className="text-xs sm:text-sm bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full shadow-sm">
              Active
            </span>
          )}
        </CardHeader>
        <CardBody className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-bold">Last Value</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600">
                85
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-bold">Goal</p>
              <p className="text-2xl font-semibold text-green-600">82</p>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-blue-600",
                track: "stroke-zinc-400",
              }}
              value={displayActiveProgress.percentageAchieved}
              size="lg"
              strokeWidth={4}
            />
            <div className="absolute flex flex-col items-center justify-center text-blue-600">
              <p className="text-3xl font-semibold">
                {displayActiveProgress.percentageAchieved}%
              </p>
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
            <Button onPress={onEdit} size="sm" variant="shadow" color="primary">
              Edit
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
