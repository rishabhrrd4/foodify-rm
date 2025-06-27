import { store } from "../store/index.tsx";
import { addOrder } from "../store/slices/orderSlice";
// import type { Order } from "../store/slices/orderSlice";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const token = localStorage.getItem("managerAccessToken");

// Retry configuration
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_INTERVAL_MS = 5000;

const createMockWebSocketService = () => {
  let reconnectAttempts = 0;
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  const connectWebSocket = (restaurantId: string) => {
    // Clear any existing reconnect timeout if trying to connect explicitly
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    if (socket && socket.connected) {
      console.log("WebSocket already connected.");
      return; // Prevent connecting multiple times
    }

    console.log(`Attempting to connect WebSocket (Attempt: ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`);

    socket = io("http://localhost:3005", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });

    socket.on("connect", () => {
      console.log("WebSocket connected successfully!");
      reconnectAttempts = 0;
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message);
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        console.log(`Retrying connection in ${RECONNECT_INTERVAL_MS / 1000} seconds...`);
        reconnectTimeout = setTimeout(() => connectWebSocket(restaurantId), RECONNECT_INTERVAL_MS);
      } else {
        console.error("Maximum WebSocket reconnect attempts reached. Please check the server.");
        // Optionally dispatch an action to inform the UI about persistent connection issues
        // store.dispatch(setConnectionStatus('failed'));
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
      if (reason === "io client disconnect") {
        // Disconnected intentionally, no retry needed
        console.log("Disconnected by client.");
      } else {
        // Disconnected due to server or network issues, try to reconnect
        console.log("Attempting to reconnect WebSocket...");
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts++;
          reconnectTimeout = setTimeout(() => connectWebSocket(restaurantId), RECONNECT_INTERVAL_MS);
        } else {
          console.error("Maximum WebSocket reconnect attempts reached after disconnect.");
          // store.dispatch(setConnectionStatus('failed'));
        }
      }
    });

    socket.on("newOrder", (data) => {
      console.log("New order received:", data);
      store.dispatch(addOrder(data));
    });
  };

  return {
    connect: (restaurantId: string) => {
      connectWebSocket(restaurantId);
    },
    handleOrderAccept: (orderId: string) => {
      console.log("Accepting order:", orderId);
      if (socket) {
        socket.emit("orderResponse", { approved: true, orderId });
      } else {
        console.warn("WebSocket not connected. Cannot accept order.");
      }
    },
    handleOrderReject: (orderId: string) => {
      console.log("Rejecting order:", orderId);
      if (socket) {
        socket.emit("orderResponse", { approved: false, orderId });
      } else {
        console.warn("WebSocket not connected. Cannot reject order.");
      }
    },
    disconnect: () => {
      if (socket) {
        socket.disconnect(); // Disconnect intentionally
        socket = null;
        console.log("WebSocket manually disconnected.");
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
      reconnectAttempts = 0; // Reset attempts
    },
  };
};

export const websocketService = createMockWebSocketService();