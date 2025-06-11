import React from "react";
import type { FormData } from "../../../../types";

interface OwnerDetailsProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const OwnerDetails: React.FC<OwnerDetailsProps> = ({ formData, onInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Owner details</h3>
      <p className="text-gray-600 mb-4">
        Platform will use these details for all business communications and updates
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full name*"
          value={formData.ownerName}
          onChange={(e) => onInputChange("ownerName", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email address*"
          value={formData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3">
          <span className="text-black-500 font-medium">🇮🇳 +91</span>
        </div>
        <input
          type="tel"
          placeholder="Phone number*"
          value={formData.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      <label className="flex items-center mt-3 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={formData.whatsappUpdates}
          onChange={(e) => onInputChange("whatsappUpdates", e.target.checked)}
          className="mr-2 w-4 h-4 text-orange-600"
        />
        Get restaurant updates via WhatsApp
      </label>

      {/* Primary Contact */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">
          Restaurant's primary contact number
        </h3>
        <p className="text-gray-600 mb-4">
          Customers, delivery partners and platform may call on this
          number for order support
        </p>
        <label className="flex items-center mb-3 text-sm">
          <input
            type="checkbox"
            checked={formData.primaryContactSame}
            onChange={(e) => onInputChange("primaryContactSame", e.target.checked)}
            className="mr-2 w-4 h-4 text-orange-600"
          />
          Same as owner mobile number
        </label>
        {!formData.primaryContactSame && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3">
              <span className="text-black-500 font-medium">🇮🇳 +91</span>
            </div>
            <input
              type="tel"
              placeholder="Primary contact number*"
              value={formData.primaryPhone}
              onChange={(e) => onInputChange("primaryPhone", e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDetails;