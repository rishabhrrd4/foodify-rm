import React, { useState } from "react";
import axios from "axios";

export default function ManagerSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:3005/manager/signup",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
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
          Manager Signup
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4">Signup successful!</div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />
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
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />
        <input
          type="text"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          placeholder="IFSC Code"
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          className="w-full p-2 mb-6 border rounded-xl"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-2xl transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
