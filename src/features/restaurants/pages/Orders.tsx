import { User, MapPin, CreditCard } from 'lucide-react';
import { BiRupee } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { updateOrderStatus } from '../../../store/slices/orderSlice';
import type { OrderStatus } from '../../../store/slices/orderSlice';

const Orders = () => {
  const dispatch = useAppDispatch();
  const activeOrders = useAppSelector(state => state.orders.activeOrders);

  const handleStatusUpdate = (id: string, status: OrderStatus) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Active Orders</h1>
      
      <div className="space-y-4">
        {activeOrders.length === 0 ? (
          <p className="text-gray-500">No active orders</p>
        ) : (
          activeOrders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">Order #{order._id}</h3>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : order.status === 'preparing' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{order.userId}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BiRupee className="w-4 h-4 mr-2" />
                  <span>{order.totalAmount}</span>
                </div>
                {order.deliveryAddress && (
                  <div className="flex items-center text-gray-600 col-span-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                )}
                {order.paymentMethod && (
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>{order.paymentMethod}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Items:</h4>
                <ul className="text-sm space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.name} x{item.quantity}
                        {item.specialInstructions && (
                          <span className="text-xs text-gray-500 ml-2">({item.specialInstructions})</span>
                        )}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusUpdate(order._id, 'pending')}
                  className={`px-3 py-1 text-sm rounded ${
                    order.status === 'pending' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusUpdate(order._id, 'preparing')}
                  className={`px-3 py-1 text-sm rounded ${
                    order.status === 'preparing' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Preparing
                </button>
                <button
                  onClick={() => handleStatusUpdate(order._id, 'completed')}
                  className={`px-3 py-1 text-sm rounded ${
                    order.status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  Complete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;