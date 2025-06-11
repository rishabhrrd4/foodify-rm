import { NavLink } from "react-router-dom";

type SidebarProps = {
    isOpen: boolean;
  };
  
  const Sidebar = ({ isOpen }: SidebarProps) => {
    return (
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-4 transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-red-500">Admin</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/admin/dashboard" className="text-gray-700 hover:text-red-500">Dashboard</NavLink>
          <NavLink to="/admin/orders" className="text-gray-700 hover:text-red-500">Orders</NavLink>
          <NavLink to="/admin/users" className="text-gray-700 hover:text-red-500">Users</NavLink>
          <NavLink to="/admin/menu" className="text-gray-700 hover:text-red-500">Menu</NavLink>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  