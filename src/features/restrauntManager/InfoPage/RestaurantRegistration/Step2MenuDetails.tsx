import React from "react";
import type { FormData } from "../../../../types";
// import { cuisineOptions, restaurantTypes } from "./constants";
import CuisineSelection from "./CuisineSelection";
import RestaurantType from "./RestaurantType";
import OperatingHours from "./OperatingHours";

interface Step2MenuDetailsProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  onHoursChange: (
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => void;
}

const Step2MenuDetails: React.FC<Step2MenuDetailsProps> = ({
  formData,
  onInputChange,
  onHoursChange,
}) => {
  return (
    <div className="space-y-8">
      <CuisineSelection 
        cuisineTypes={formData.cuisineTypes}
        onCuisineToggle={(cuisine) => {
          onInputChange(
            "cuisineTypes",
            formData.cuisineTypes.includes(cuisine)
              ? formData.cuisineTypes.filter((c) => c !== cuisine)
              : [...formData.cuisineTypes, cuisine]
          );
        }}
      />

      <RestaurantType
        restaurantType={formData.restaurantType}
        onTypeSelect={(type) => onInputChange("restaurantType", type)}
      />

      <OperatingHours
        operatingHours={formData.operatingHours}
        onHoursChange={onHoursChange}
      />
    </div>
  );
};

export default Step2MenuDetails;