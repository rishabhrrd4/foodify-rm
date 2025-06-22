import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { Order } from "../../../store/slices/orderSlice";

const OrderList: React.FC = () => {
  const activeOrders = useSelector((state: RootState) => state.orders.activeOrders);
 
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Live Orders</h2>

      {activeOrders.length === 0 ? (
        <p className="text-gray-600">No active orders.</p>
      ) : (
        <div className="space-y-4">
          {activeOrders.map((order: Order) => (
            <div
              key={order._id || order.id}
              className="bg-white shadow p-4 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">Order ID: {order._id || order.id}</h3>
                {order.distanceInKm && (
                  <span className="text-sm text-gray-500">
                    Distance: {order.distanceInKm.toFixed(2)} km
                  </span>
                )}
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium">Customer: {order.customerName}</p>
                <p className="text-sm text-gray-600">Phone: {order.customerPhone}</p>
              </div>

              <ul className="text-sm text-gray-800 mb-2">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <div className="text-sm text-gray-600 space-y-1 mb-2">
                {order.itemTotal !== undefined && <div>Item Total: ₹{order.itemTotal}</div>}
                {order.tax !== undefined && <div>Tax: ₹{order.tax}</div>}
                {order.platformFee !== undefined && <div>Platform Fee: ₹{order.platformFee}</div>}
                {order.deliveryCharges !== undefined && <div>Delivery Charges: ₹{order.deliveryCharges}</div>}
                {order.discount !== undefined && <div>Discount: ₹{order.discount}</div>}
                {order.subtotal !== undefined && <div>Subtotal: ₹{order.subtotal}</div>}
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
                <div className="text-lg font-semibold text-green-700">
                  Total: ₹{order.total || order.totalAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;