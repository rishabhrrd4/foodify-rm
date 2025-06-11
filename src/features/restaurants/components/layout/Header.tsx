import { Bell, User } from "lucide-react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const notifications = useAppSelector((state) => state.orders.notifications);
  const restaurantInfo = useAppSelector((state) => state.restaurant.info);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/restaurant/restaurant-info");
  };

  const handleNotificationClick = () => {
    navigate("/restaurant/notifications");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-10">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-l font-bold text-gray-900">Welcome back to</h1>
          <p className="text-l font-bold text-orange-500">Dashboard</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-200 relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleNotificationClick}/>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 hover:bg-gray-200 rounded-lg px-2 py-1"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-orange-500">
                {restaurantInfo.name}
              </p>
              <p className="text-xs text-gray-500">Restaurant Partner</p>
            </div>
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
