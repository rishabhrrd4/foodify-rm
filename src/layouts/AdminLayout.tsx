import { Outlet } from "react-router-dom";
import Sidebar from "../features/auth/components/Sidebar";
import Header from "../features/auth/components/Header";
import { useState } from "react";

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSideBarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSideBarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header onToggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)} />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
