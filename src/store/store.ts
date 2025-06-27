import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";
import restaurantReducer from "./slices/restaurantSlice";
import authReducer from "../store/slices/authSlice"; // <--- Add this line

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    orders: orderReducer,
    restaurant: restaurantReducer,
    auth: authReducer, // <--- Add this line to include your auth slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;