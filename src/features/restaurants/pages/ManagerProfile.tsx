import { useState, useEffect } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import axios from 'axios';

interface ManagerProfile {
  _id: string;
  name: string;
  email: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
}

const ManagerProfile = () => {
  const [profile, setProfile] = useState<ManagerProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Partial<ManagerProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('managerAccessToken');

  // Fetch manager profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3005/manager', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        setEditedProfile(response.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);



  // Handle profile update
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await axios.put('http://localhost:3005/manager/update', editedProfile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(prev => ({ ...prev!, ...editedProfile }));
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-full">
                  <User className="h-6 w-6 text-orange-500" />
                </div>
                <h1 className="text-xl font-bold text-white">Manager Profile</h1>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-8">
              {error && (
                <div className="mb-6 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              {!profile ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Profile not found</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="border-b pb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center text-orange-600 hover:text-orange-800"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdate}
                            disabled={isLoading}
                            className="flex items-center px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:bg-orange-300"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            {isLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editedProfile.name || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={editedProfile.email || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h2>
                    <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account Number</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="accountNumber"
                            value={editedProfile.accountNumber || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">
                            {profile.accountNumber || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="ifscCode"
                            value={editedProfile.ifscCode || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">
                            {profile.ifscCode || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="bankName"
                            value={editedProfile.bankName || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">
                            {profile.bankName || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;