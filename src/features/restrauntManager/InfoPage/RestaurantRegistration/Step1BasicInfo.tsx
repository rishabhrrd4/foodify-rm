import React from "react";
import type { FormData } from "../../../../types";
import AddressSection from "./AddressSection";

interface Step1BasicInfoProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  formData,
  onInputChange,
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

      <div>
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-600 mb-4">
          Tell us more about your restaurant (optional)
        </p>
        <textarea
          placeholder="e.g. A cozy place with delicious food"
          value={formData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows={4}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Phone Number</h3>
        <p className="text-gray-600 mb-4">We’ll use this to contact you</p>
        <input
          type="tel"
          placeholder="Phone number*"
          value={formData.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <AddressSection formData={formData} onInputChange={onInputChange} />
    </div>
  );
};

export default Step1BasicInfo;
