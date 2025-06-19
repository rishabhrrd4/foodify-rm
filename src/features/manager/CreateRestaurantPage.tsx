import React from "react";
import { useNavigate } from "react-router-dom";

const CreateRestaurantPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to restaurant creation form (update the path accordingly)
    navigate("/restaurant/create");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleClick}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Create a Restaurant
      </button>
    </div>
  );
};

export default CreateRestaurantPage;
