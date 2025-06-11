import React, { useState } from "react";
import { MapPin, Upload, FileText, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import useGeolocation from "../../../hooks/useGeolocation";

interface FormData {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsappUpdates: boolean;
  primaryContactSame: boolean;
  primaryPhone: string;
  shopNumber: string;
  floor: string;
  area: string;
  city: string;
  landmark: string;
  cuisineTypes: string[];
  restaurantType: string;
  operatingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  bankAccount: string;
  ifscCode: string;
  accountHolder: string;
  gstNumber: string;
}

const RestaurantInfoForm: React.FC = () => {
  const { location, error, getLocation } = useGeolocation();
  const [currentStep, setCurrentStep] = useState(1);
  // const [showPaymentDetails, setShowPaymentDetails] = useState(false);
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

  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null;
  }>({
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

  const cuisineOptions = [
    "North Indian",
    "South Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Thai",
    "Continental",
    "Fast Food",
    "Desserts",
    "Beverages",
    "Street Food",
    "Biryani",
    "Pizza",
    "Burger",
  ];

  const restaurantTypes = [
    "Fine Dining",
    "Casual Dining",
    "Quick Service",
    "Cafe",
    "Cloud Kitchen",
    "Food Truck",
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (key: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleCuisineToggle = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter((c) => c !== cuisine)
        : [...prev.cuisineTypes, cuisine],
    }));
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
        [day]: { ...prev.operatingHours[day], [field]: value },
      },
    }));
  };

  const navigate = useNavigate();
  const handleForm = () => {
    navigate("/restaurant-manager/refer-form");
  };

  const FileUploadCard = ({
    title,
    description,
    fileKey,
    accept = "*/*",
  }: {
    title: string;
    description: string;
    fileKey: string;
    accept?: string;
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
      <input
        type="file"
        id={fileKey}
        accept={accept}
        onChange={(e) =>
          e.target.files?.[0] && handleFileUpload(fileKey, e.target.files[0])
        }
        className="hidden"
      />
      <label htmlFor={fileKey} className="cursor-pointer">
        <div className="flex flex-col items-center space-y-2">
          {uploadedFiles[fileKey] ? (
            <Check className="w-8 h-8 text-green-500" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-gray-700">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
            {uploadedFiles[fileKey] && (
              <p className="text-sm text-green-600 mt-1">
                ✓ {uploadedFiles[fileKey]?.name}
              </p>
            )}
          </div>
        </div>
      </label>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Restaurant Name */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Restaurant name</h3>
              <p className="text-gray-600 mb-4">
                Customers will see this name on the platform
              </p>
              <input
                type="text"
                placeholder="Restaurant name*"
                value={formData.restaurantName}
                onChange={(e) =>
                  handleInputChange("restaurantName", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Owner Details */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Owner details</h3>
              <p className="text-gray-600 mb-4">
                Platform will use these details for all business communications
                and updates
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full name*"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email address*"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <label className="flex items-center mt-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={formData.whatsappUpdates}
                  onChange={(e) =>
                    handleInputChange("whatsappUpdates", e.target.checked)
                  }
                  className="mr-2 w-4 h-4 text-orange-600"
                />
                Get restaurant updates via WhatsApp
              </label>
            </div>

            {/* Primary Contact */}
            <div>
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
                  onChange={(e) =>
                    handleInputChange("primaryContactSame", e.target.checked)
                  }
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
                    onChange={(e) =>
                      handleInputChange("primaryPhone", e.target.value)
                    }
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Address Section */}
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
                    onChange={(e) =>
                      handleInputChange("shopNumber", e.target.value)
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Floor / tower (optional)"
                    value={formData.floor}
                    onChange={(e) => handleInputChange("floor", e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Area / Sector / Locality*"
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
                    readOnly
                  />
                </div>
                <input
                  type="text"
                  placeholder="Add any nearby landmark (optional)"
                  value={formData.landmark}
                  onChange={(e) =>
                    handleInputChange("landmark", e.target.value)
                  }
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Cuisine Types */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Cuisine Types</h3>
              <p className="text-gray-600 mb-4">
                Select all cuisine types your restaurant serves
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cuisineOptions.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleCuisineToggle(cuisine)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.cuisineTypes.includes(cuisine)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Restaurant Type */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Restaurant Type</h3>
              <p className="text-gray-600 mb-4">
                What type of restaurant is this?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {restaurantTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange("restaurantType", type)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.restaurantType === type
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Operating Hours</h3>
              <p className="text-gray-600 mb-4">
                Set your restaurant's operating hours for each day
              </p>
              <div className="space-y-3">
                {Object.entries(formData.operatingHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="w-20 font-medium">{day}</div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hours.closed}
                        onChange={(e) =>
                          handleHoursChange(day, "closed", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Closed</span>
                    </label>
                    {!hours.closed && (
                      <>
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) =>
                            handleHoursChange(day, "open", e.target.value)
                          }
                          className="p-2 border border-gray-300 rounded text-sm"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) =>
                            handleHoursChange(day, "close", e.target.value)
                          }
                          className="p-2 border border-gray-300 rounded text-sm"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
              <p className="text-gray-600 mb-6">
                Please upload the following documents for verification
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploadCard
                  title="FSSAI License"
                  description="Upload your valid FSSAI license (PDF/JPG)"
                  fileKey="fssaiLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <FileUploadCard
                  title="PAN Card"
                  description="Upload restaurant/business PAN card"
                  fileKey="panCard"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <FileUploadCard
                  title="Menu Card"
                  description="Upload current menu with prices (PDF/JPG)"
                  fileKey="menuCard"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <FileUploadCard
                  title="Restaurant Photos"
                  description="Upload interior/exterior photos"
                  fileKey="restaurantPhotos"
                  accept=".jpg,.jpeg,.png"
                />
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      Important Notes:
                    </p>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• All documents should be clear and readable</li>
                      <li>
                        • FSSAI license should be valid and match restaurant
                        address
                      </li>
                      <li>• Maximum file size: 5MB per document</li>
                      <li>• Accepted formats: PDF, JPG, PNG</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Payment & Contract Details
              </h3>
              <p className="text-gray-600 mb-6">
                Provide your bank details for receiving payments
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Bank Account Number*"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    handleInputChange("bankAccount", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="IFSC Code*"
                  value={formData.ifscCode}
                  onChange={(e) =>
                    handleInputChange("ifscCode", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Account Holder Name*"
                  value={formData.accountHolder}
                  onChange={(e) =>
                    handleInputChange("accountHolder", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="GST Number (optional)"
                  value={formData.gstNumber}
                  onChange={(e) =>
                    handleInputChange("gstNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Terms & Conditions</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" required />
                    <span>
                      I agree to the platform's terms and conditions for
                      restaurant partners
                    </span>
                  </label>
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" required />
                    <span>
                      I confirm that all provided information is accurate and
                      up-to-date
                    </span>
                  </label>
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" required />
                    <span>
                      I understand the commission structure and payment terms
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? "bg-orange-50 border-l-4 border-orange-500"
                        : currentStep > step.id
                        ? "bg-green-50"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step.id
                          ? "bg-orange-500 text-white"
                          : currentStep > step.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {currentStep > step.id ? "✓" : step.id}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          currentStep === step.id
                            ? "text-orange-700"
                            : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 text-black-700">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">
                    Documents required for registration
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-600">
                    Did someone refer you to this platform?
                  </span>
                  <button
                    onClick={handleForm}
                    className="ml-2 text-orange-600 hover:underline"
                  >
                    Yes
                  </button>
                </div>
              </div>
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
                      navigate("/auth/login");
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

export default RestaurantInfoForm;
