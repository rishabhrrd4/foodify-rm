import { useState } from "react";
import { TrendingUp, Clock, Star, DollarSign } from "lucide-react";
import  { type TimeFilterOption } from "./TimeFilter";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import CuisineChart from "./CuisineChart";
import {
  revenueAndOrdersData,
  orderStatusData,
  cuisineData,
} from "./dashboardData";

interface MetricData {
  activeOrders: number;
  todayRevenue: number;
  averageOrderValue: number;
  rating: number;
  totalOrders: number;
  preparingOrders: number;
  pendingOrders: number;
  completedToday: number;
}



const RestaurantDashboard = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilterOption>("weekly");

  const metrics: MetricData = {
    activeOrders: 31,
    todayRevenue: 4890,
    averageOrderValue: 358,
    rating: 4.8,
    totalOrders: 2847,
    preparingOrders: 23,
    pendingOrders: 8,
    completedToday: 76,
  };

  const currentData = revenueAndOrdersData[timeFilter];


  const renderMetricCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    additionalInfo?: React.ReactNode,
    trendInfo?: React.ReactNode
  ) => (
    <div className="bg-white rounded-lg shadow-xs p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trendInfo && <div className="mt-1">{trendInfo}</div>}
          {additionalInfo && <div className="mt-2">{additionalInfo}</div>}
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
            <p className="text-orange-100 opacity-90">
              Track your performance and grow your business
            </p>
          </div>
        </div>
      </header>

      {/* Metrics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {renderMetricCard(
          "Active Orders",
          metrics.activeOrders,
          <Clock className="h-5 w-5 text-orange-500" />,
          <div className="flex items-center text-xs text-gray-500">
            <span className="text-orange-600 font-medium">
              Preparing: {metrics.preparingOrders}
            </span>
            <span className="mx-1">•</span>
            <span className="text-yellow-600 font-medium">
              Pending: {metrics.pendingOrders}
            </span>
          </div>
        )}

        {renderMetricCard(
          "Today's Revenue",
          `₹${metrics.todayRevenue.toLocaleString()}`,
          <DollarSign className="h-5 w-5 text-green-500" />,
          undefined,
          <p className="text-xs text-green-600">+12.5% from yesterday</p>
        )}

        {renderMetricCard(
          "Average Order Value",
          `₹${metrics.averageOrderValue}`,
          <TrendingUp className="h-5 w-5 text-blue-500" />,
          undefined,
          <p className="text-xs text-blue-600">+5.2% this week</p>
        )}

        {renderMetricCard(
          "Customer Rating",
          metrics.rating,
          <Star className="h-5 w-5 text-yellow-500" />,
          <p className="text-xs text-gray-500">
            From {metrics.totalOrders} orders
          </p>
        )}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Order Status Pie Chart */}
        <OrderStatusChart
          data={orderStatusData}
          title="Today Order Status Distribution"
        />

        {/* Cuisine Performance Chart */}
        <CuisineChart data={cuisineData} title="Popular Cuisines Performance" />

        {/* Revenue Chart Section */}
        <div className="lg:col-span-2 space-y-4">
          <RevenueChart
            data={currentData}
            title="Revenue & Orders Trend{getFilterTitle}"
            timeFilter={timeFilter}
            onFilterChange={setTimeFilter}
          />
        </div>
      </section>

      
    </div>
  );
};

export default RestaurantDashboard;
