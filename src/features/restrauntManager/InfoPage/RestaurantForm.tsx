import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1BasicInfo from "./RestaurantRegistration/Step1BasicInfo";
import axios from "axios";

type RestaurantRegistrationResponse = {
  name: string;
  description: string;
  address: string;
  phone: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  tags: string[];
};

type FormData = {
  restaurantName: string;
  description: string;
  phone: string;
  shopNumber: string;
  floor: string;
  area: string;
  city: string;
  landmark: string;
  cuisineTypes: string[];
}

const RestaurantRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    restaurantName: "",
    description: "",
    phone: "",
    shopNumber: "",
    floor: "",
    area: "",
    city: "Delhi NCR",
    landmark: "",
    cuisineTypes: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  // console.log(localStorage.getItem("managerAccessToken"));

  const handleSubmitStep1 = async () => {
    try {
      const lat = localStorage.getItem("userLatitude");
      const lon = localStorage.getItem("userLongitude");

      const address = `${formData.shopNumber ? formData.shopNumber + ", " : ""}${
        formData.floor ? formData.floor + ", " : ""
      }${formData.area}, ${formData.city}${
        formData.landmark ? ", " + formData.landmark : ""
      }`;

      const payload = {
        name: formData.restaurantName,
        description: formData.description,
        address: address,
        phone: formData.phone,
        location:
          lat && lon
            ? {
                type: "Point",
                coordinates: [parseFloat(lon), parseFloat(lat)],
              }
            : undefined,
        tags: formData.cuisineTypes,
      };

      console.log(payload);
      

      const token = localStorage.getItem("managerAccessToken")

      const response = await axios.post(
        "http://localhost:3005/restaurant/create",
        payload, {headers: {Authorization: `Bearer ${token}`}}
      );

      console.log("submitted:", response.data);
      navigate("/restaurant");
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Restaurant Information
        </h1>

        <Step1BasicInfo
          formData={formData}
          onInputChange={handleInputChange}
        />

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSubmitStep1}
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegistration;
