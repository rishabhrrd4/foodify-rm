import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelector';
import { clearNotification, updateOrderStatus } from '../../../../store/slices/orderSlice';
import { FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OrderNotification = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.orders.notifications);
  const [visibleNotifications, setVisibleNotifications] = useState<string[]>([]);

  const handleDismiss = useCallback((orderId: string) => {
    setVisibleNotifications(prev => prev.filter(id => id !== orderId));
    setTimeout(() => {
      dispatch(clearNotification(orderId));
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotification = notifications[notifications.length - 1];
      if (!visibleNotifications.includes(newNotification.id)) {
        setVisibleNotifications(prev => [...prev, newNotification.id]);
        setTimeout(() => handleDismiss(newNotification.id), 10000);
      }
    }
  }, [notifications, visibleNotifications, handleDismiss]);

  const handleAccept = (orderId: string) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'accepted' }));
    handleDismiss(orderId);
  };

  const handleReject = (orderId: string) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'rejected' }));
    handleDismiss(orderId);
  };

  const visibleOrders = notifications.filter(order =>
    visibleNotifications.includes(order.id)
  );

  if (visibleOrders.length === 0) return null;

  return createPortal(
    <div 
      className="fixed inset-x-0 top-4 z-50 flex flex-col items-center space-y-4 px-4 sm:items-end sm:px-6 pointer-events-none"
    >
      {visibleOrders.map((order) => (
        <div
          key={order.id}
          className="w-full sm:w-96 max-w-sm bg-white border border-orange-200 shadow-lg rounded-lg p-4 animate-fade-in pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">New Order!</h3>
              <p className="text-sm text-gray-600">Order #{order.id}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss(order.id);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Order Details */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Customer:</span>
              <span className="font-medium text-gray-900">{order.customerName}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Phone:</span>
              <span>{order.customerPhone}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total:</span>
              <span className="font-semibold text-green-600">₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
            <div className="space-y-1 text-sm">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAccept(order.id);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-md"
            >
              <FaCheckCircle className="h-4 w-4" />
              Accept
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReject(order.id);
              }}
              className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 text-sm px-3 py-2 rounded-md"
            >
              <FaTimesCircle className="h-4 w-4" />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default OrderNotification;
