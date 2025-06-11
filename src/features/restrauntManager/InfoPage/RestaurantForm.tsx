import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeolocation from "../../../hooks/useGeolocation";
import StepsProgress from "./RestaurantRegistration/StepsProgress";
import Step1BasicInfo from "./RestaurantRegistration/Step1BasicInfo";
import Step2MenuDetails from "./RestaurantRegistration/Step2MenuDetails";
import Step3Documents from "./RestaurantRegistration/Step3Documents";
import Step4Payment from "./RestaurantRegistration/Step4Payment";
// import FileUploadCard from "./RestaurantRegistration/FileUploadCard"; // Although passed as prop, still imported for clarity of structure
import DocumentNotes from "./RestaurantRegistration/DocumentNotes";
import ReferralSection from "./RestaurantRegistration/ReferralSection";
import type { FormData, UploadedFiles } from "../../../types";

const RestaurantRegistration: React.FC = () => {
  const { location, error, getLocation } = useGeolocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    restaurantName: "",
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

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    fssaiLicense: null,
    menuCard: null,
    restaurantPhotos: null,
    panCard: null,
  });

  const steps = [
    {
      id: 1,
      title: "Restaurant information",
      subtitle: "Name, location and contact number",
      icon: "🏪",
    },
    {
      id: 2,
      title: "Menu and operational details",
      subtitle: "Cuisine, hours, and menu",
      icon: "📋",
    },
    {
      id: 3,
      title: "Restaurant documents",
      subtitle: "License and verification",
      icon: "📄",
    },
    {
      id: 4,
      title: "Partner contract",
      subtitle: "Terms and payment details",
      icon: "📝",
    },
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (key: keyof UploadedFiles | string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [key]: file }));
  };

  const navigate = useNavigate();
  const handleReferralClick = () => {
    navigate("/restaurant-manager/refer-form");
  };

  const handleHoursChange = (
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            formData={formData}
            onInputChange={handleInputChange}
            location={location}
            error={error}
            getLocation={getLocation}
          />
        );
      case 2:
        return (
          <Step2MenuDetails
            formData={formData}
            onInputChange={handleInputChange}
            onHoursChange={handleHoursChange}
          />
        );
      case 3:
        return (
          <Step3Documents
            uploadedFiles={uploadedFiles}
            onFileUpload={handleFileUpload}
          />
        );
      case 4:
        return (
          <Step4Payment formData={formData} onInputChange={handleInputChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-orange-500">Foodify</div>
              <div className="text-sm text-gray-500">restaurant partner</div>
            </div>
            <div className="text-sm text-indigo-600">
              Need help? Call +91 97-38-38-38-38
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">
                Complete your registration
              </h2>
              <StepsProgress currentStep={currentStep} steps={steps} />
              <DocumentNotes />
              <ReferralSection onReferralClick={handleReferralClick} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps.find((s) => s.id === currentStep)?.title}
                </h1>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-6 border-t">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentStep === steps.length) {
                      navigate("/auth/login"); // Redirect to login after submission
                    }
                    if (currentStep < steps.length) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      alert(
                        "Registration completed! Your application will be reviewed within 24 hours."
                      );
                    }
                  }}
                  className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {currentStep === steps.length ? "Submit Application" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegistration;
