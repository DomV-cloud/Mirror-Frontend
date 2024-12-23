import { Progress } from "../Types/Progress/ProgressType";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, CircularProgress } from "@nextui-org/react";

type AddChartGridProps = {
  progresses: Progress[];
};

function DisplayProgresses({ progresses }: AddChartGridProps) {
  const navigate = useNavigate();

  const handleRedirectToCreateChart = () => {
    navigate('/progressess');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Your Progresses</h1>
      <Button 
        color="primary" 
        variant="shadow" 
        onClick={handleRedirectToCreateChart}
        className="mb-8"
      >
        Add Progress
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {progresses.map((progress, index) => (
          <Card key={index} className="w-full bg-white shadow-lg">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{progress.progressName}</h2>
              {progress.isAchieved && (
                <span className="text-sm text-green-600 font-medium">
                  Active
                </span>
              )}
            </CardHeader>
            <CardBody className="flex flex-col items-center">
              <CircularProgress
                value={progress.percentageAchieved}
                size="lg"
                label={`${progress.percentageAchieved}%`}
                className="text-blue-600 mb-4"
              />
            </CardBody>
            <CardFooter className="flex justify-between items-center text-sm text-gray-500">
              <div>
                <p>Tracked Days: <strong>{progress.trackedDays}</strong></p>
                <p>Last Value: <strong>85</strong></p>
              </div>
              <Button 
                size="sm" 
                variant="light" 
              >
                Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DisplayProgresses;
