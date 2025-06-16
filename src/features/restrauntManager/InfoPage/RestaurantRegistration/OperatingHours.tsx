import React from "react";
import type { OperatingHours as OperatingHoursType } from "../../../../types";

interface OperatingHoursProps {
  operatingHours: {
    [key: string]: OperatingHoursType;
  };
  onHoursChange: (
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => void;
}

const OperatingHours: React.FC<OperatingHoursProps> = ({
  operatingHours,
  onHoursChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Operating Hours</h3>
      <p className="text-gray-600 mb-4">
        Set your restaurant's operating hours for each day
      </p>
      <div className="space-y-3">
        {Object.entries(operatingHours).map(([day, hours]) => (
          <div
            key={day}
            className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg"
          >
            <div className="w-20 font-medium">{day}</div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={hours.closed}
                onChange={(e) => onHoursChange(day, "closed", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Closed</span>
            </label>
            {!hours.closed && (
              <>
                <input
                  type="time"
                  value={hours.open}
                  onChange={(e) => onHoursChange(day, "open", e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm"
                />
                <span>to</span>
                <input
                  type="time"
                  value={hours.close}
                  onChange={(e) => onHoursChange(day, "close", e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatingHours;
