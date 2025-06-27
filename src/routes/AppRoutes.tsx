import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Layout from "../features/restaurants/components/layout/Layout";

import RestaurantManagerLanding from "../features/restrauntManager/LandingPage/RestaurantManagerLanding";
import RestaurantForm from "../features/restrauntManager/InfoPage/RestaurantForm";
import ReferralForm from "../features/restrauntManager/InfoPage/ReferralForm";

import ErrorPage from "../features/auth/components/ErrorPage";

import OrderManagmentPage from "../features/admin/orders/OrderManagmentPage";
import Dashboard from "../features/admin/dashboard/Dashboard";

import Home from "../features/restaurants/pages/Home";
import Menu from "../features/restaurants/pages/Menu";
import Orders from "../features/restaurants/pages/Orders";
import OrderHistory from "../features/restaurants/pages/OrderHistory";
import FeedbackHistory from "../features/restaurants/pages/FeedbackHistory"
import RestaurantInfo from "../features/restaurants/pages/RestaurantInfo";
import Notifications from "../features/restaurants/pages/Notifications";

import ManagerLoginPage from "../features/manager/Login";
import ManagerSignupPage from "../features/manager/Register";
import ForgotPassword from "../features/manager/ForgotPassword";
import ResetPasswordPage from "../features/manager/ResetPassword";
import CreateRestaurantPage from "../features/manager/CreateRestaurantPage";

import ProtectedRoute from "../routes/ProtectedRoute"; // Adjust the path as necessary

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/restaurant-manager" replace /> },
    ],
  },
  // Public Auth-related routes for managers
  {
    path: "/manager",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <ManagerLoginPage /> },
      { path: "register", element: <ManagerSignupPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/reset-password/:token", element: <ResetPasswordPage />
  },

  // Public Restaurant Manager flow paths (initial setup, accessible without prior login)
  {
    path: "/restaurant-manager",
    children: [
<<<<<<< HEAD
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "orders", element: <Orders /> },
      { path: "order-history", element: <OrderHistory /> },
      { path: "feedback-history", element: <FeedbackHistory /> },
      { path: "restaurant-info", element: <RestaurantInfo /> },
      { path: "notifications", element: <Notifications /> },
=======
      { index: true, element: <RestaurantManagerLanding /> },
      // { path: "register", element: <RestaurantRegistration /> },
      { path: "info", element: <RestaurantForm /> },
      { path: "refer-form", element: <ReferralForm /> },
    ]
  },


  // PROTECTED ROUTES BELOW THIS POINT
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />, 
        children: [
          { index: true, element: <Dashboard /> },
          { path: "orders", element: <OrderManagmentPage /> },
        ],
      },
>>>>>>> 761f49dc09c9839c6b1c31b4289b259d80f664d3
    ],
  },

  {
    path: "/create-restaurant",
    element: <ProtectedRoute />, 
    children: [
      { index: true, element: <CreateRestaurantPage /> },
    ]
  },

  {
    path: "/restaurant",
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ), // Layout is rendered if authenticated
        children: [
          { index: true, element: <Home /> },
          { path: "menu", element: <Menu /> },
          { path: "orders", element: <Orders /> },
          { path: "order-history", element: <OrderHistory /> },
          { path: "restaurant-info", element: <RestaurantInfo /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;