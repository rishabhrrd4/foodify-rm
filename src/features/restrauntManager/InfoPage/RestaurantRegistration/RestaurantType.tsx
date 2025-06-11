import React from "react";
import { restaurantTypes } from "./constants";

interface RestaurantTypeProps {
  restaurantType: string;
  onTypeSelect: (type: string) => void;
}

const RestaurantType: React.FC<RestaurantTypeProps> = ({
  restaurantType,
  onTypeSelect,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Restaurant Type</h3>
      <p className="text-gray-600 mb-4">
        What type of restaurant is this?
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {restaurantTypes.map((type) => (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              restaurantType === type
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantType;