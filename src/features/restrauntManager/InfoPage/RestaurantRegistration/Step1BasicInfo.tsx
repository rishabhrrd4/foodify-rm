import React from "react";
import type { FormData } from "../../../../types";
import AddressSection from "./AddressSection";
import OwnerDetails from "./OwnerDetails";

interface Step1BasicInfoProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  // onFileUpload: (key: string, file: File) => void;
  getLocation: () => void;
  location: { lat: number; lon: number } | null;
  error: string | null;
}

const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  formData,
  onInputChange,
  getLocation,
  location,
  error,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Restaurant name</h3>
        <p className="text-gray-600 mb-4">
          Customers will see this name on the platform
        </p>
        <input
          type="text"
          placeholder="Restaurant name*"
          value={formData.restaurantName}
          onChange={(e) => onInputChange("restaurantName", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <OwnerDetails formData={formData} onInputChange={onInputChange} />

      <AddressSection
        formData={formData}
        onInputChange={onInputChange}
        getLocation={getLocation}
        location={location}
        error={error}
      />
    </div>
  );
};

export default Step1BasicInfo;
