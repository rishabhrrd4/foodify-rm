import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Manager = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  restaurantId: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  isActive: string;
  isActiveManager: boolean;
};

const emptyManager: Manager = {
  _id: '',
  name: '',
  email: '',
  phone: '',
  restaurantId: '',
  accountNumber: '',
  ifscCode: '',
  bankName: '',
  isActive: '',
  isActiveManager: false,
};

const ManagerProfile: React.FC = () => {
  const [manager, setManager] = useState<Manager>(emptyManager);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const accessToken = localStorage.getItem('managerAccessToken');
  useEffect(() => {
    const fetchManager = async () => {
      try {
        console.log(accessToken);
        

        const response = await axios.get<Manager>('http://localhost:3005/manager', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setManager(response.data);
      } catch (err) {
        setManager(emptyManager);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchManager();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    setLogoutError(null);

    try {
    console.log("qqqqqqqqqq",accessToken);
      await axios.post(

        'http://localhost:3005/manager/logout',
        {},

  
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      localStorage.removeItem('managerAccessToken');
            localStorage.removeItem('managerRefreshToken');

      setIsLoggedOut(true);
    } catch (err) {
      setLogoutError('Logout failed. Please try again.');
    } finally {
    
      setLogoutLoading(false);
    }
  };

  if (isLoggedOut) {
    return (
      <p className="text-center text-green-600 mt-10">
        You have been logged out.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-orange-500 mt-10">
        Loading manager profile...
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-orange-400 rounded-lg bg-white shadow-md">
     <div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-semibold text-orange-600">
    Manager Profile
  </h2>

  <button
    onClick={handleLogout}
    disabled={logoutLoading}
    className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 disabled:opacity-50"
  >
    {logoutLoading ? 'Logging out...' : 'Logout'}
  </button>
</div>


      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}

      <div className="mb-4">
        <label htmlFor="_id" className="block text-orange-500 font-medium mb-1">
          Manager ID
        </label>
        <input
          id="_id"
          type="text"
          value={manager._id}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-orange-500 font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={manager.name}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-orange-500 font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={manager.email}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-orange-500 font-medium mb-1">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          value={manager.phone}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="restaurantId"
          className="block text-orange-500 font-medium mb-1"
        >
          Restaurant ID
        </label>
        <input
          id="restaurantId"
          type="text"
          value={manager.restaurantId}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="accountNumber"
          className="block text-orange-500 font-medium mb-1"
        >
          Account Number
        </label>
        <input
          id="accountNumber"
          type="text"
          value={manager.accountNumber}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ifscCode" className="block text-orange-500 font-medium mb-1">
          IFSC Code
        </label>
        <input
          id="ifscCode"
          type="text"
          value={manager.ifscCode}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="bankName" className="block text-orange-500 font-medium mb-1">
          Bank Name
        </label>
        <input
          id="bankName"
          type="text"
          value={manager.bankName}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="isActive" className="block text-orange-500 font-medium mb-1">
          Account Status
        </label>
        <input
          id="isActive"
          type="text"
          value={manager.isActive}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="isActiveManager"
          className="block text-orange-500 font-medium mb-1"
        >
          Is Active Manager
        </label>
        <input
          id="isActiveManager"
          type="text"
          value={manager.isActiveManager ? 'Yes' : 'No'}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      {logoutError && (
        <p className="text-center text-red-500 mb-4">{logoutError}</p>
      )}

      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {logoutLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default ManagerProfile;
