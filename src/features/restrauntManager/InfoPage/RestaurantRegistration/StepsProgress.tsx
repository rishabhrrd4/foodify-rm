import React from "react";
import type { Step } from "../../../../types";

interface StepsProgressProps {
  steps: Step[];
  currentStep: number;
}

const StepsProgress: React.FC<StepsProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            currentStep === step.id
              ? "bg-orange-50 border-l-4 border-orange-500"
              : currentStep > step.id
              ? "bg-green-50"
              : "bg-gray-50"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === step.id
                ? "bg-orange-500 text-white"
                : currentStep > step.id
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {currentStep > step.id ? "✓" : step.id}
          </div>
          <div className="flex-1">
            <div
              className={`font-medium ${
                currentStep === step.id ? "text-orange-700" : "text-gray-700"
              }`}
            >
              {step.title}
            </div>
            <div className="text-sm text-gray-500">{step.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsProgress;