// import React from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../store/store";
// import type { Order } from "../../../store/slices/orderSlice";

// const OrderList: React.FC = () => {
//   const orders = useSelector((state: RootState) => state.orders.orders);

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold text-gray-800">Live Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600">No orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order: Order) => (
//             <div
//               key={order._id}
//               className="bg-white shadow p-4 rounded-lg border border-gray-200"
//             >
//               <div className="flex justify-between items-center mb-1">
//                 <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
//                 <span className="text-sm text-gray-500">
//                   Distance: {order.distanceInKm.toFixed(2)} km
//                 </span>
//               </div>

//               <ul className="text-sm text-gray-800 mb-2">
//                 {order.items.map((item, idx) => (
//                   <li key={idx}>
//                     {item.name} × {item.quantity} — ₹{item.price * item.quantity}
//                   </li>
//                 ))}
//               </ul>

//               <div className="text-sm text-gray-600 space-y-1 mb-2">
//                 <div>Item Total: ₹{order.itemTotal}</div>
//                 <div>Tax: ₹{order.tax}</div>
//                 <div>Platform Fee: ₹{order.platformFee}</div>
//                 <div>Delivery Charges: ₹{order.deliveryCharges}</div>
//                 <div>Discount: ₹{order.discount}</div>
//                 <div>Subtotal: ₹{order.subtotal}</div>
//               </div>

//               <div className="text-right text-lg font-semibold text-green-700">
//                 Total: ₹{order.total}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderList;
