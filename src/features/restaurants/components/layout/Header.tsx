import { Bell, User, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNotificationClick = () => {
    navigate("/restaurant/notifications");
  };

  const handleProfileClick = () => {
    navigate("/restaurant/manager-info");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("managerAccessToken");
    localStorage.removeItem("managerRefreshToken");
    localStorage.removeItem("restaurantId");
    localStorage.removeItem("managerId");
    localStorage.removeItem("userLatitude");
    localStorage.removeItem("userLongitude");

    setShowDropdown(false);
    navigate("/manager/login");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-10">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-l font-bold text-gray-900">Welcome back to</h1>
          <p className="text-l font-bold text-orange-500">Dashboard</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Notification Bell */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-200 relative">
              <Bell
                className="h-6 w-6 text-gray-600 cursor-pointer"
                onClick={handleNotificationClick}
              />
              
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-3 hover:bg-gray-200 rounded-lg px-2 py-1"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-orange-500">
                  Restaurant Manager
                </p>
              </div>
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
