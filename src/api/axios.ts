// src/api/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005", // <-- Replace with your manager backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
