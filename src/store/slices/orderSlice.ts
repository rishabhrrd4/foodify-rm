import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface Order {
  _id: string;
  id: string; 
  userId: string;
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  itemTotal: number;
  totalAmount: number;
  tax: number;
  platformFee: number;
  deliveryCharges: number;
  discount: number;
  subtotal: number;
  total: number;
  distanceInKm: number;
  couponCode: string | null;
  couponId: string | null;
  status: "pending" | "accepted" | "preparing" | "ready" | "delivered" | "rejected";
  orderTime: string;
  estimatedDeliveryTime?: string;
  deliveryAddress: string;
  paymentMethod: string;
}

interface OrderState {
  activeOrders: Order[];
  orderHistory: Order[];
  notifications: Order[];
  isLoading: boolean;
}

const initialState: OrderState = {
  activeOrders: [
    {
      _id: "ORD001",
      id: "ORD001",
      userId: "user1",
      restaurantId: "rest1",
      customerName: "Amit Sharma",
      customerPhone: "+91 9876543210",
      items: [
        { id: "1", name: "Butter Chicken", quantity: 2, price: 349 },
        { id: "3", name: "Dal Makhani", quantity: 1, price: 249 },
      ],
      itemTotal: 947,
      totalAmount: 947,
      tax: 100,
      platformFee: 20,
      deliveryCharges: 30,
      discount: 0,
      subtotal: 997,
      total: 997,
      distanceInKm: 2.5,
      couponCode: null,
      couponId: null,
      status: "pending",
      orderTime: new Date().toISOString(),
      deliveryAddress: "123 Vikas Marg, Delhi",
      paymentMethod: "Online",
    },
    {
      _id: "ORD002",
      id: "ORD002",
      userId: "user2",
      restaurantId: "rest1",
      customerName: "Priya Verma",
      customerPhone: "+91 9876543211",
      items: [{ id: "2", name: "Paneer Tikka", quantity: 1, price: 299 }],
      itemTotal: 299,
      totalAmount: 299,
      tax: 30,
      platformFee: 20,
      deliveryCharges: 25,
      discount: 0,
      subtotal: 324,
      total: 324,
      distanceInKm: 1.8,
      couponCode: null,
      couponId: null,
      status: "preparing",
      orderTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      deliveryAddress: "456 Connaught Place, Delhi",
      paymentMethod: "Cash on Delivery",
    },
  ],
  orderHistory: [
    {
      _id: "ORD003",
      id: "ORD003",
      userId: "user3",
      restaurantId: "rest1",
      customerName: "Rahul Singh",
      customerPhone: "+91 9876543212",
      items: [{ id: "4", name: "Gulab Jamun", quantity: 1, price: 99 }],
      itemTotal: 99,
      totalAmount: 99,
      tax: 10,
      platformFee: 10,
      deliveryCharges: 20,
      discount: 0,
      subtotal: 119,
      total: 119,
      distanceInKm: 3.2,
      couponCode: null,
      couponId: null,
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
        (order) => order.id === action.payload.id || order._id === action.payload.id
      );
      if (order) {
        order.status = action.payload.status;
        if (
          action.payload.status === "delivered" ||
          action.payload.status === "rejected"
        ) {
          state.orderHistory.unshift(order);
          state.activeOrders = state.activeOrders.filter(
            (o) => o.id !== action.payload.id && o._id !== action.payload.id
          );
        }
      }
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (order) => order.id !== action.payload && order._id !== action.payload
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