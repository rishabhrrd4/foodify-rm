import axios from "../../../api/axios"; // Assuming this is your configured axios instance
import { login, logout } from '../../../store/slices/authSlice'; // Import Redux actions
import { store } from '../../../store/store'; // Import your Redux store

export const getManagerAccessToken = () => localStorage.getItem("managerAccessToken");
export const getManagerRefreshToken = () => localStorage.getItem("managerRefreshToken");

export const setManagerAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearManagerAuthTokens = () => {
  localStorage.removeItem("managerAccessToken");
  localStorage.removeItem("managerRefreshToken");
  localStorage.removeItem("restaurantId"); // Ensure this is also cleared
  delete axios.defaults.headers.common["Authorization"];
  store.dispatch(logout()); // Dispatch Redux logout action
};

export const loginManager = async (email: string, password: string, rememberMe: boolean) => {
  const response = await axios.post("/manager/login", {
    email,
    password,
    rememberMe
  });

  const { accessToken, refreshToken, data } = response.data;

  console.log(data);
  console.log(response.data.restaurantId);

  localStorage.setItem("managerAccessToken", accessToken);
  localStorage.setItem("managerRefreshToken", refreshToken);
  localStorage.setItem("restaurantId", data.restaurantId);

  setManagerAuthHeaders(accessToken);

  // Dispatch Redux login action
  store.dispatch(login(data)); // Pass the manager data to the user state

  return { accessToken, refreshToken, manager: data };
};

export const signupManager = async (name: string, email: string, password: string, accountNumber: string, ifscCode: string, bankName: string) => {
  const response = await axios.post("/manager/signup", {
    name,
    email,
    password,
    accountNumber,
    ifscCode,
    bankName
  });

  return response.data;
};

export const logoutManager = async () => {
  const token = getManagerAccessToken();

  try {
    if (token) {
      await axios.post(
        "/manager/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  } catch (error) {
    console.error("Manager logout failed:", error);
  } finally {
    clearManagerAuthTokens(); // This will now also dispatch the Redux logout action
  }
};

export const refreshManagerToken = async () => {
  const refreshToken = getManagerRefreshToken();

  if (!refreshToken) {
    clearManagerAuthTokens(); // Clear tokens and log out if no refresh token
    throw new Error("No refresh token");
  }

  try {
    const response = await axios.post("/manager/auth/refresh", {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken, data } = response.data;

    localStorage.setItem("managerAccessToken", accessToken);
    localStorage.setItem("managerRefreshToken", newRefreshToken);
    localStorage.setItem("restaurantId", data.restaurantId); // Assuming restaurantId comes back

    setManagerAuthHeaders(accessToken);

    // Update Redux state with new user data if refreshed
    store.dispatch(login(data)); // Dispatch login with potentially updated user data

    return { accessToken, refreshToken: newRefreshToken, manager: data };
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearManagerAuthTokens(); // This will now also dispatch the Redux logout action
    throw error;
  }
};