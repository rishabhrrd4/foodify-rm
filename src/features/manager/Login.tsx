import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginManager } from "../manager/auth/managerAuthService";

export default function ManagerLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const rId = localStorage.getItem("restaurantId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await loginManager(
        formData.email,
        formData.password,
        formData.rememberMe
      );
      setSuccess(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            localStorage.setItem("userLatitude", latitude.toString());
            localStorage.setItem("userLongitude", longitude.toString());

            if (rId === "") {
              navigate("/restaurant");
            } else {
              navigate("/restaurant-manager/info");
            }

            // navigate("/restaurant-manager/info");
          },
          (geoError) => {
            console.warn("Geolocation error:", geoError.message);
            navigate("/restaurant-manager/info");
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
        navigate("/restaurant-manager/info");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Manager Login
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4">Login successful!</div>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-2xl transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/manager/forgot-password")}
            className="text-sm text-orange-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}
