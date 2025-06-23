import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export type OrderStatus = "pending" | "accepted" | "rejected" | "preparing" | "completed";

export interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  tax?: number;
  status: OrderStatus;
  orderTime: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}

interface RestaurantInfo {
  name: string;
  description: string;
  cuisine: string[];
  totalOrders: number;
  rating: number;
  todayRevenue: number; // Added to track daily revenue
}

interface OrderState {
  activeOrders: Order[];
  orderHistory: Order[];
  notifications: Order[];
  restaurantInfo: RestaurantInfo;
}

const initialState: OrderState = {
  activeOrders: [
    {
      _id: "ORD001",
      userId: "USER001",
      restaurantId: "REST001",
      customerName: "Sumit",
      items: [
        { name: "Pizza", quantity: 1, price: 250 },
        { name: "Pasta", quantity: 2, price: 180 },
      ],
      totalAmount: 610,
      status: "preparing",
      orderTime: new Date().toISOString(),
    },
    {
      _id: "ORD002",
      userId: "USER002",
      restaurantId: "REST001",
      customerName: "Bobu Rao",
      items: [
        { name: "Burger", quantity: 1, price: 120 },
        { name: "Fries", quantity: 1, price: 80 },
      ],
      totalAmount: 200,
      status: "pending",
      orderTime: new Date().toISOString(),
    },
  ],
  orderHistory: [
    {
      _id: "ORD003",
      userId: "USER003",
      restaurantId: "REST001",
      customerName: "Virat",
      items: [
        { name: "Salad", quantity: 1, price: 150 },
        { name: "Soup", quantity: 1, price: 100 },
      ],
      totalAmount: 250,
      status: "completed",
      orderTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
  ],
  notifications: [],
  restaurantInfo: {
    name: "King Kitchen",
    description: "A delightful culinary experience with a variety of dishes.",
    cuisine: ["Italian", "Indian", "Chinese"],
    totalOrders: 1250,
    rating: 4.5,
    todayRevenue: 0, // Initialize today's revenue
  },
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.activeOrders.push(action.payload);
      state.notifications.push(action.payload);
      state.restaurantInfo.todayRevenue += action.payload.totalAmount;
    },
    // In your orderSlice.ts reducers
updateOrderStatus: (
  state,
  action: PayloadAction<{ id: string; status: OrderStatus }>
) => {
  const orderIndex = state.activeOrders.findIndex(
    (order) => order._id === action.payload.id
  );
  
  if (orderIndex !== -1) {
    const order = state.activeOrders[orderIndex];
    const updatedOrder = { 
      ...order, 
      status: action.payload.status 
    };
    
    if (action.payload.status === "completed") {
      // Add to today's revenue when order is completed
      state.restaurantInfo.todayRevenue += order.totalAmount;
      state.orderHistory.unshift(updatedOrder);
      state.activeOrders.splice(orderIndex, 1);
      state.restaurantInfo.totalOrders += 1;
    } else {
      state.activeOrders[orderIndex] = updatedOrder;
    }
  }
},
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
    resetDailyRevenue: (state) => {
      state.restaurantInfo.todayRevenue = 0;
    },
  },
});

export const { 
  addOrder, 
  updateOrderStatus, 
  clearNotification,
  resetDailyRevenue
} = orderSlice.actions;

export default orderSlice.reducer;