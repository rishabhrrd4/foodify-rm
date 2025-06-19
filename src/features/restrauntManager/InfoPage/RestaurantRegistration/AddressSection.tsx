import React from "react";
import type { FormData } from "../../../../types/index";

interface AddressSectionProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: FormData[keyof FormData]
  ) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        Add your restaurant's location for order pick-up
      </h3>

      <div className="bg-orange-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium mb-2">Block 3rd</h4>
        <p className="text-sm text-gray-600">Connaught Place, Delhi NCR</p>
      </div>

      <div>
        <h4 className="font-medium mb-3">Restaurant address details</h4>
        <p className="text-sm text-gray-600 mb-4">
          Address details as per your FSSAI registration
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Shop no. / building no. (optional)"
            value={formData.shopNumber}
            onChange={(e) =>
              onInputChange("shopNumber", e.target.value)
            }
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Floor / tower (optional)"
            value={formData.floor}
            onChange={(e) =>
              onInputChange("floor", e.target.value)
            }
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Area / Sector / Locality*"
            value={formData.area}
            onChange={(e) =>
              onInputChange("area", e.target.value)
            }
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              onInputChange("city", e.target.value)
            }
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
            readOnly
          />
        </div>
        <input
          type="text"
          placeholder="Add any nearby landmark (optional)"
          value={formData.landmark}
          onChange={(e) =>
            onInputChange("landmark", e.target.value)
          }
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            Please ensure that this address is the same as mentioned on your
            FSSAI license
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
