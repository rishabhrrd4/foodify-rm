import axios from "../../../api/axios";

export const getManagerAccessToken = () => localStorage.getItem("managerAccessToken");
export const getManagerRefreshToken = () => localStorage.getItem("managerRefreshToken");

export const setManagerAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearManagerAuthTokens = () => {
  localStorage.removeItem("managerAccessToken");
  localStorage.removeItem("managerRefreshToken");
  localStorage.removeItem("managerId");
  delete axios.defaults.headers.common["Authorization"];
};

export const loginManager = async (email: string, password: string, rememberMe: boolean) => {
  const response = await axios.post("/manager/login", {
    email,
    password,
    rememberMe
});

  const { accessToken, refreshToken, data } = response.data;
  
  console.log(data);
  console.log(response.data.restaunrantId);
  

  localStorage.setItem("managerAccessToken", accessToken);
  localStorage.setItem("managerRefreshToken", refreshToken);
  // localStorage.setItem("managerId", data._id);
  localStorage.setItem("restaurantId", data.restaurantId)

  setManagerAuthHeaders(accessToken);

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
    clearManagerAuthTokens();
  }
};

export const refreshManagerToken = async () => {
  const refreshToken = getManagerRefreshToken();

  if (!refreshToken) throw new Error("No refresh token");

  try {
    const response = await axios.post("/manager/auth/refresh", {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken, data } = response.data;

    localStorage.setItem("managerAccessToken", accessToken);
    localStorage.setItem("managerRefreshToken", newRefreshToken);
    localStorage.setItem("managerId", data._id);

    setManagerAuthHeaders(accessToken);

    return { accessToken, refreshToken: newRefreshToken, manager: data };
  } catch (error) {
    clearManagerAuthTokens();
    throw error;
  }
};
