import Sidebar from "./Sidebar";
import Header from "./Header";
import OrderNotification from "./../notifications/OrderNotification";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { websocketService } from "../../../../services/websocket";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const restaurantInfo = useAppSelector((state) => state.restaurant?.info);

  useEffect(() => {
    if (restaurantInfo?.id) {
      // Connect to WebSocket when component mounts and restaurant ID is available
      // const handleSocket = () => {
      //   alert("Hii")
      // };
      websocketService.connect(restaurantInfo.id);

      // Cleanup on unmount
      // return () => {
      //   websocketService.disconnect();
      // };
    }
  }, [restaurantInfo?.id]);

  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 pb-30">{children}</main>
      </div>
      <OrderNotification />
    </div>
  );
};

export default Layout;
