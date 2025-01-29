import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

type PlanningComponentProps = {
  nextMeasurementDate: Date;
  measurementDay: string; // Den, který si uživatel nastavil (např. "Monday")
};

const PlanningComponent: React.FC<PlanningComponentProps> = ({
  nextMeasurementDate,
  measurementDay,
}) => {
  const today = new Date();
  const daysUntilNextMeasurement = Math.ceil(
    (nextMeasurementDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="relative flex-1 bg-white shadow-lg border border-gray-200 w-full">
      {/* Štítek nahoře vpravo */}
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
        {measurementDay}
      </div>

      <CardHeader className="border-b border-gray-200 p-4">
        <div className="text-lg font-semibold text-gray-800">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Next Measurement Countdown
          </h2>
          <p className="text-xs text-gray-500">
            Your current progress overview
          </p>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center p-6">
        {/* Odpočet dní */}
        <div className="text-5xl font-bold text-red-600 mb-4">
          {daysUntilNextMeasurement}
        </div>
        <p className="text-lg text-gray-600">days remaining</p>

        {/* Datum dalšího měření */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Next measurement on:</p>
          <p className="text-lg font-semibold text-gray-800">
            {nextMeasurementDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default PlanningComponent;
