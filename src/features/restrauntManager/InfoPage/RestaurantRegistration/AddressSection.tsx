import React from "react";
import type { FormData } from "../../../../types/index";
import { MapPin } from "lucide-react";

interface AddressSectionProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  getLocation: () => void;
  location: { lat: number; lon: number } | null;
  error: string | null;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  formData,
  onInputChange,
  getLocation,
  location,
  error,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        Add your restaurant's location for order pick-up
      </h3>
      <div className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">
            Interactive map would be integrated here
          </p>
          <button
            onClick={getLocation}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          >
            📍 Use current location
          </button>
          {location && (
            <p>
              Your location: {location.lat}, {location.lon}
            </p>
          )}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium mb-2">Block 3rd</h4>
        <p className="text-sm text-gray-600">
          Connaught Place, Delhi NCR
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-3">Restaurant address details</h4>
        <p className="text-sm text-gray-600 mb-4">
          Address details as base the restaurant location mentioned
          above
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Shop no. / building no. (optional)"
            value={formData.shopNumber}
            onChange={(e) => onInputChange("shopNumber", e.target.value as FormData[keyof FormData])}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Floor / tower (optional)"
            value={formData.floor}
            onChange={(e) => onInputChange("floor", e.target.value as FormData[keyof FormData])}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Area / Sector / Locality*"
            value={formData.area}
            onChange={(e) => onInputChange("area", e.target.value as FormData[keyof FormData])}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => onInputChange("city", e.target.value as FormData[keyof FormData])}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
            readOnly
          />
        </div>
        <input
          type="text"
          placeholder="Add any nearby landmark (optional)"
          value={formData.landmark}
          onChange={(e) => onInputChange("landmark", e.target.value as FormData[keyof FormData])}
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            Please ensure that this address is the same as mentioned on
            your FSSAI license
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;