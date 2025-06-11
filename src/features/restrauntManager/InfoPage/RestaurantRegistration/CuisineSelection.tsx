import React from "react";
import { cuisineOptions } from "./constants";

interface CuisineSelectionProps {
  cuisineTypes: string[];
  onCuisineToggle: (cuisine: string) => void;
}

const CuisineSelection: React.FC<CuisineSelectionProps> = ({
  cuisineTypes,
  onCuisineToggle,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Cuisine Types</h3>
      <p className="text-gray-600 mb-4">
        Select all cuisine types your restaurant serves
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cuisineOptions.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onCuisineToggle(cuisine)}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              cuisineTypes.includes(cuisine)
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineSelection;