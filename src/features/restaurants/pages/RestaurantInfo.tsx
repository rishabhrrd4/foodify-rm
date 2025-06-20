
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

type Manager = {
  
  name: string;
  email: string;
 
};

const ManagerProfile: React.FC = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const[email,setEmail]=useState("");
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const accessToken = localStorage.getItem('managerAccessToken');

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await axios.get<Manager>('http://localhost:3005/manager', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
       setEmail(response.data.data.email);
       setName(response.data.data.name);
       
       console.log(name);
       console.log(email);
       
       
        
      } catch (err) {
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
      await axios.post(
        'http://localhost:3005/manager/logout',
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      localStorage.removeItem('managerAccessToken');
      localStorage.removeItem('managerRefreshToken');
      setIsLoggedOut(true);
      navigate("/restaurant-manager")
    } catch (err) {
      setLogoutError('Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  };

  if (isLoggedOut) {
    return <p className="text-center text-green-600 mt-10">You have been logged out.</p>;
  }

  if (loading) {
    return <p className="text-center text-orange-500 mt-10">Loading manager profile...</p>;
  }

 

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-orange-400 rounded-lg bg-white shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-orange-600">Manager Profile</h2>
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {logoutLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-orange-500 font-medium mb-1">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-orange-500 font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="w-full px-4 py-2 border border-orange-300 rounded-md"
        />
      </div>

      {logoutError && <p className="text-center text-red-500 mb-4">{logoutError}</p>}

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
