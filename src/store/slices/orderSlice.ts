import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Order item type
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

// Unified Order type using `id` instead of `_id`
export type Order = {
  id: string; // normalized from _id when needed
  userId: string;
  restaurantId: string;
  items: OrderItem[];
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

// State shape
interface OrderState {
  activeOrders: Order[];
  orderHistory: Order[];
  notifications: Order[];
  isLoading: boolean;
}

// Initial state
const initialState: OrderState = {
  activeOrders: [],
  orderHistory: [],
  notifications: [],
  isLoading: false,
};

// Create slice
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
      action: PayloadAction<{ id: string; status: "pending" | "accepted" | "preparing" | "ready" | "delivered" | "rejected" }>
    ) => {
      const order = state.activeOrders.find(
        (order) => order.id === action.payload.id
      );
      if (order) {
        // @ts-ignore - attach status dynamically if needed
        order.status = action.payload.status;

        // Move to history if final state
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
