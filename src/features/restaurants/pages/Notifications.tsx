import { useState } from 'react';
import { X } from 'lucide-react';

// Type definition for incoming order notifications
type Order = {
  _id: string;
  customerName: string;
  total: number;
  status: string;
  orderTime: string;
};

const initialNotifications: Order[] = [
  {
    _id: 'ORD101',
    customerName: 'Rohit Kumar',
    total: 450,
    status: 'pending',
    orderTime: new Date().toISOString(),
  },
  {
    _id: 'ORD102',
    customerName: 'Anjali Singh',
    total: 1200,
    status: 'preparing',
    orderTime: new Date().toISOString(),
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Order[]>(initialNotifications);

  const handleDismiss = (orderId: string) => {
    setNotifications(prev => prev.filter(order => order._id !== orderId));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No new notifications</p>
        ) : (
          notifications.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss(order._id);
                }}
                className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              <div className="flex justify-between items-start mb-2 pr-8">
                <div>
                  <h3 className="font-semibold">New Order #{order._id}</h3>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Total: ₹{order.total}</p>
                <p>{new Date(order.orderTime).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
