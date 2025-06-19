import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

// export interface Order {
//   id: string;
//   customerName: string;
//   customerPhone: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status:
//     | "pending"
//     | "accepted"
//     | "preparing"
//     | "ready"
//     | "delivered"
//     | "rejected";
//   orderTime: string;
//   estimatedDeliveryTime?: string;
//   deliveryAddress: string;
//   paymentMethod: string;
// }

export type Order = {
  _id: string;
  userId: string;
  restaurantId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  itemTotal: number;
  tax: number;
  platformFee: number;
  deliveryCharges: number;
  discount: number;
  subtotal: number;
  total: number;
  distanceInKm: number;
  couponCode: string | null;
  couponId: string | null;
};

interface OrderState {
  activeOrders: Order[];
  orderHistory: Order[];
  notifications: Order[];
  isLoading: boolean;
}

const initialState: OrderState = {
  activeOrders: [
    {
      id: "ORD001",
      customerName: "Amit Sharma",
      customerPhone: "+91 9876543210",
      items: [
        { id: "1", name: "Butter Chicken", quantity: 2, price: 349 },
        { id: "3", name: "Dal Makhani", quantity: 1, price: 249 },
      ],
      totalAmount: 947,
      status: "pending",
      orderTime: new Date().toISOString(),
      deliveryAddress: "123 Vikas Marg, Delhi",
      paymentMethod: "Online",
    },
    {
      id: "ORD002",
      customerName: "Priya Verma",
      customerPhone: "+91 9876543211",
      items: [{ id: "2", name: "Paneer Tikka", quantity: 1, price: 299 }],
      totalAmount: 299,
      status: "preparing",
      orderTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      deliveryAddress: "456 Connaught Place, Delhi",
      paymentMethod: "Cash on Delivery",
    },
  ],
  orderHistory: [
    {
      id: "ORD003",
      customerName: "Rahul Singh",
      customerPhone: "+91 9876543212",
      items: [{ id: "4", name: "Gulab Jamun", quantity: 1, price: 99 }],
      totalAmount: 99,
      status: "delivered",
      orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      deliveryAddress: "789 Lajpat Nagar, Delhi",
      paymentMethod: "Online",
    },
  ],
  notifications: [],
  isLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.activeOrders.push(action.payload);
      state.notifications.push(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const order = state.activeOrders.find(
        (order) => order.id === action.payload.id
      );
      if (order) {
        order.status = action.payload.status;
        if (
          action.payload.status === "delivered" ||
          action.payload.status === "rejected"
        ) {
          state.orderHistory.unshift(order);
          state.activeOrders = state.activeOrders.filter(
            (o) => o.id !== action.payload.id
          );
        }
      }
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (order) => order.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addOrder,
  updateOrderStatus,
  clearNotification,
  clearAllNotifications,
} = orderSlice.actions;

export default orderSlice.reducer;
