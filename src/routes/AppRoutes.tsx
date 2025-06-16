import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Layout from "../features/restaurants/components/layout/Layout";

import RestaurantManagerLanding from "../features/restrauntManager/LandingPage/RestaurantManagerLanding";
import RestaurantForm from "../features/restrauntManager/InfoPage/RestaurantForm";
import ReferralForm from "../features/restrauntManager/InfoPage/ReferralForm";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import HomePage from "../features/auth/pages/HomePage";
import ErrorPage from "../features/auth/components/ErrorPage";

import PlaceOrderPage from "../features/customer/orderPlacement/PlaceOrderPage";
import OrderStatusPage from "../features/customer/orderStatus/OrderStatusPage";
import OrderHistoryPage from "../features/customer/orderHistory/OrderHistoryPage";

import OrderManagmentPage from "../features/admin/orders/OrderManagmentPage";
import Dashboard from "../features/admin/dashboard/Dashboard";

import Home from "../features/restaurants/pages/Home";
import Menu from "../features/restaurants/pages/Menu";
import Orders from "../features/restaurants/pages/Orders";
import OrderHistory from "../features/restaurants/pages/OrderHistory";
import RestaurantInfo from "../features/restaurants/pages/RestaurantInfo";
import Notifications from "../features/restaurants/pages/Notifications";

// Manager login/signup pages
import ManagerLoginPage from "../features/manager/Login";
import ManagerSignupPage from "../features/manager/Register";
import RestaurantRegistration from "../features/restrauntManager/InfoPage/RestaurantForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "place-order", element: <PlaceOrderPage /> },
      { path: "place-order/order-status", element: <OrderStatusPage /> },
      { path: "order-history", element: <OrderHistoryPage /> },
      { path: "login", element: <Login /> }, // restaurant login
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> }, // restaurant login
      { path: "register", element: <Register /> }, // restaurant register
    ],
  },
  {
    path: "/manager",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <ManagerLoginPage /> },
      { path: "register", element: <ManagerSignupPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "orders", element: <OrderManagmentPage /> },
    ],
  },

  {
    path: "/restaurant-manager",
    element: <RestaurantManagerLanding />,
  },
  {
    path: "/restaurant-manager/register",
    element: <RestaurantRegistration />,
  },
  {
    path: "/restaurant-manager/info",
    element: <RestaurantForm />,
  },
  {
    path: "/restaurant-manager/refer-form",
    element: <ReferralForm />,
  },
  {
    path: "/restaurant-manager/login",
    element: <ManagerLoginPage />,
  },

  {
    path: "/restaurant",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "orders", element: <Orders /> },
      { path: "order-history", element: <OrderHistory /> },
      { path: "restaurant-info", element: <RestaurantInfo /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
