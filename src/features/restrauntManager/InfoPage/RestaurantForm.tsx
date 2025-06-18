import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeolocation from "../../../hooks/useGeolocation";
import Step1BasicInfo from "./RestaurantRegistration/Step1BasicInfo";
import axios from "axios";

// Define the type for the expected response data
type RestaurantRegistrationResponse = {
  name: string;
  description: string;
  address: string;
  phone: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  tags: string[];
};

// Update FormData type to include fields that match the new response structure
// Assuming existing fields are still relevant for the form input
type FormData = {
  restaurantName: string; // Corresponds to 'name' in response
  description: string; // New field for description
  ownerName: string;
  email: string;
  phone: string; // Corresponds to 'phone' in response
  whatsappUpdates: boolean;
  primaryContactSame: boolean;
  primaryPhone: string;
  shopNumber: string;
  floor: string;
  area: string; // Part of 'address' in response
  city: string; // Part of 'address' in response
  landmark: string; // Part of 'address' in response
  cuisineTypes: string[]; // Corresponds to 'tags' in response
  restaurantType: string;
  operatingHours: {
    Monday: { open: string; close: string; closed: boolean };
    Tuesday: { open: string; close: string; closed: boolean };
    Wednesday: { open: string; close: string; closed: boolean };
    Thursday: { open: string; close: string; closed: boolean };
    Friday: { open: string; close: string; closed: boolean };
    Saturday: { open: string; close: string; closed: boolean };
    Sunday: { open: string; close: string; closed: boolean };
  };
  bankAccount: string;
  ifscCode: string;
  accountHolder: string;
  gstNumber: string;
  // location will be derived from useGeolocation and sent in submit
};

const RestaurantRegistration: React.FC = () => {
  const { location, error, getLocation } = useGeolocation();
  const [formData, setFormData] = useState<FormData>({
    restaurantName: "",
    description: "", // Initialize new field
    ownerName: "",
    email: "",
    phone: "",
    whatsappUpdates: false,
    primaryContactSame: false,
    primaryPhone: "",
    shopNumber: "",
    floor: "",
    area: "",
    city: "Delhi NCR",
    landmark: "",
    cuisineTypes: [],
    restaurantType: "",
    operatingHours: {
      Monday: { open: "09:00", close: "22:00", closed: false },
      Tuesday: { open: "09:00", close: "22:00", closed: false },
      Wednesday: { open: "09:00", close: "22:00", closed: false },
      Thursday: { open: "09:00", close: "22:00", closed: false },
      Friday: { open: "09:00", close: "22:00", closed: false },
      Saturday: { open: "09:00", close: "22:00", closed: false },
      Sunday: { open: "09:00", close: "22:00", closed: false },
    },
    bankAccount: "",
    ifscCode: "",
    accountHolder: "",
    gstNumber: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitStep1 = async () => {
    try {
      // Construct the payload to match the expected backend structure
      const payload = {
        name: formData.restaurantName,
        description: formData.description,
        address: `${formData.shopNumber ? formData.shopNumber + ", " : ""}${
          formData.floor ? formData.floor + ", " : ""
        }${formData.area}, ${formData.city}${
          formData.landmark ? ", " + formData.landmark : ""
        }`,
        phone: formData.phone,
        location: location
          ? {
              type: "Point",
              coordinates: [location.lon, location.lat],
            }
          : undefined, // Send location if available
        tags: formData.cuisineTypes,
        // Include any other formData fields that the backend expects but are not in the response body example
        // e.g., ownerName, email, whatsappUpdates, etc.latitude
        ownerName: formData.ownerName,
        email: formData.email,
        whatsappUpdates: formData.whatsappUpdates,
        primaryContactSame: formData.primaryContactSame,
        primaryPhone: formData.primaryPhone,
        restaurantType: formData.restaurantType,
        operatingHours: formData.operatingHours,
        bankAccount: formData.bankAccount,
        ifscCode: formData.ifscCode,
        accountHolder: formData.accountHolder,
        gstNumber: formData.gstNumber,
      };

      const response = await axios.post<RestaurantRegistrationResponse>(
        "http://localhost:3005/restaurant/create",
        payload
      );
      console.log("Step 1 submitted:", response.data);
      navigate("/thank-you");
    } catch (err) {
      console.error("Error submitting step 1:", err);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Step 1: Restaurant Information
        </h1>

        <Step1BasicInfo
          formData={formData}
          onInputChange={handleInputChange}
          location={location}
          error={error}
          getLocation={getLocation}
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