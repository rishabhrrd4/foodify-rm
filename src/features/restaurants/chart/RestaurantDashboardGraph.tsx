import { useState } from "react";
import { type TimeFilterOption } from "./TimeFilter";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import CuisineChart from "./CuisineChart";
import {
  revenueAndOrdersData,
  orderStatusData,
  cuisineData,
} from "./dashboardData";

const RestaurantDashboardGraph = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilterOption>("weekly");

  const currentData = revenueAndOrdersData[timeFilter];

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
            title="Revenue & Orders Trend"
            timeFilter={timeFilter}
            onFilterChange={setTimeFilter}
          />
        </div>
      </section>
    </div>
  );
};

export default RestaurantDashboardGraph;
