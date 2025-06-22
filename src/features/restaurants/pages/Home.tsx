import { TrendingUp, Clock, Star } from 'lucide-react';
import { BiRupee } from 'react-icons/bi';

type RestaurantInfo = {
  name: string;
  description: string;
  cuisine: string[];
  totalOrders: number;
  rating: number;
};

type Order = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed';
};

// Static data for demonstration
const staticRestaurantInfo: RestaurantInfo = {
  name: "King Kitchen",
  description: "A delightful culinary experience with a variety of dishes.",
  cuisine: ["Italian", "Indian", "Chinese"],
  totalOrders: 1250,
  rating: 4.5,
};

const staticActiveOrders: Order[] = [
  { id: "ORD001", customerName: "Sumit", totalAmount: 2500, status: "preparing" },
  { id: "ORD002", customerName: "Bobu Rao", totalAmount: 1200, status: "pending" },
  { id: "ORD003", customerName: "Charlie", totalAmount: 3000, status: "preparing" },
  { id: "ORD004", customerName: "Prince", totalAmount: 1800, status: "pending" },
];

const staticOrderHistory: Order[] = [
  { id: "ORD005", customerName: "Virat", totalAmount: 1500, status: "completed" },
  { id: "ORD006", customerName: "Nayan ", totalAmount: 2200, status: "completed" },
  { id: "ORD007", customerName: "Suresh ", totalAmount: 900, status: "completed" },
];

const Home = () => {
  const restaurantInfo = staticRestaurantInfo;
  const activeOrders = staticActiveOrders;
  const orderHistory = staticOrderHistory;

  const todayRevenue = activeOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = activeOrders.length > 0 ? todayRevenue / activeOrders.length : 0;

  return (
    <div className="p-6 space-y-6">
      <section className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-red-100">Here's what's happening at {restaurantInfo.name} today</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Orders */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Active Orders</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{activeOrders.length}</p>
            <p className="text-xs text-gray-500">{orderHistory.length} completed today</p>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Today's Revenue</h3>
            <BiRupee className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">₹{todayRevenue}</p>
            <p className="text-xs text-gray-500">+12% from yesterday</p>
          </div>
        </div>

        {/* Average Order */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Average Order</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">₹{Math.round(averageOrderValue)}</p>
            <p className="text-xs text-gray-500">Based on {activeOrders.length} orders</p>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Rating</h3>
            <Star className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{restaurantInfo.rating}</p>
            {/* <p className="text-xs text-gray-500">{availableItems} items available</p> */}
          </div>
        </div>
      </section>

      {/* Recent Orders and Restaurant Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-4">
          <header className="pb-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </header>
          <div className="mt-4 space-y-4">
            {activeOrders.slice(0, 3).map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-600">#{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'preparing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Overview */}
        <div className="bg-white rounded-lg shadow p-4">
          <header className="pb-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Restaurant Overview</h3>
          </header>
          <div className="mt-4 space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold">{restaurantInfo.name}</h4>
              <p className="text-gray-600">{restaurantInfo.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Cuisine:</span>
                <p className="font-medium">{restaurantInfo.cuisine.join(', ')}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Orders:</span>
                <p className="font-medium">{restaurantInfo.totalOrders}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;