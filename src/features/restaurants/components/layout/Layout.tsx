import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const restaurantInfo = useAppSelector((state) => state.restaurant?.info);

  useEffect(() => {
    if (restaurantInfo?.id) {
    }
  }, [restaurantInfo?.id]);

  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 pb-30">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
