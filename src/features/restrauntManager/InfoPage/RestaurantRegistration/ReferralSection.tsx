import React from "react";
import { FileText } from "lucide-react";

interface ReferralSectionProps {
  onReferralClick: () => void;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ onReferralClick }) => {
  return (
    <>
      <div className="mt-8 p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center space-x-2 text-black-700">
          <FileText className="w-5 h-5" />
          <span className="font-medium">
            Documents required for registration
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm">
          <span className="text-gray-600">
            Did someone refer you to this platform?
          </span>
          <button
            onClick={onReferralClick}
            className="ml-2 text-orange-600 hover:underline"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
};

export default ReferralSection;