import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const OrderHistory = () => {
  const orderHistory = useAppSelector((state) => state.orders.orderHistory);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orderHistory.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = filteredOrders.reduce(
    (sum, order) =>
      order.status === "delivered" ? sum + order.totalAmount : sum,
    0
  );

  const deliveredOrders = filteredOrders.filter(
    (order) => order.status === "delivered"
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">View and analyze your past orders</p>
        </div>
        <div className="w-full sm:w-64">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Customer Name or Order ID
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter name or order ID..."
            className="block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card */}
        <div className="border rounded-lg shadow-sm p-4">
          <div className="pb-3">
            <h2 className="text-sm font-medium text-gray-600">Total Orders</h2>
          </div>
          <div className="text-2xl font-bold">{filteredOrders.length}</div>
        </div>

        <div className="border rounded-lg shadow-sm p-4">
          <div className="pb-3">
            <h2 className="text-sm font-medium text-gray-600">
              Delivered Orders
            </h2>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {deliveredOrders}
          </div>
        </div>

        <div className="border rounded-lg shadow-sm p-4">
          <div className="pb-3">
            <h2 className="text-sm font-medium text-gray-600">Total Revenue</h2>
          </div>
          <div className="text-2xl font-bold text-green-600">
            ₹{totalRevenue}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Status filter */}
        <div className="w-48">
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Date filter */}
        <div className="w-48">
          <label
            htmlFor="dateFilter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by date
          </label>
          <select
            id="dateFilter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="border rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              No orders match your current filters.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p>
                        <span className="font-medium">Customer:</span>{" "}
                        {order.customerName}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {order.customerPhone}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">Order Time:</span>{" "}
                        {new Date(order.orderTime).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">Payment:</span>{" "}
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Items:
                    </p>
                    <div className="text-sm text-gray-600">
                      {order.items.map((item, index) => (
                        <span key={item.id}>
                          {item.name} x{item.quantity}
                          {index < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{order.totalAmount}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
