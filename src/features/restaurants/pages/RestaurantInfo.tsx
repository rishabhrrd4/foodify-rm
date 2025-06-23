import { useState, useEffect } from 'react';
import { Edit, Save, X, MapPin, Phone } from 'lucide-react';
import type { RestaurantInfoT } from '../../../store/slices/restaurantSlice';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { 
  setRestaurantInfo, 
  setLoading, 
  setError, 
  updateRestaurantInfo 
} from '../../../store/slices/restaurantSlice';
import axios from 'axios';

const RestaurantInfo = () => {
  const dispatch = useAppDispatch();
  const { info: restaurantInfo, isLoading } = useAppSelector(state => state.restaurant);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState<RestaurantInfoT | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null); 
  const managerAccessToken = localStorage.getItem('managerAccessToken');

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get('http://localhost:3005/restaurant/manager', {
          headers: { Authorization: `Bearer ${managerAccessToken}` },
        });
        dispatch(setRestaurantInfo(response.data));
        setEditedInfo(response.data);
        setRestaurantId(response.data._id); // Store the _id from response
        localStorage.setItem('managerId', 'managerId');

      } catch (err) {
        dispatch(setError('Failed to load restaurant information.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRestaurantInfo();
  }, [dispatch, managerAccessToken]);

  const handleSave = async () => {
    if (editedInfo && restaurantId) { 
      try {
        dispatch(setLoading(true));
        await axios.put( 
          `http://localhost:3005/restaurant/${restaurantId}`, 
          editedInfo,
          {
            headers: { Authorization: `Bearer ${managerAccessToken}` },
          }
        );
        dispatch(updateRestaurantInfo(editedInfo));
        setIsEditing(false);
      } catch (err) {
        dispatch(setError('Failed to update restaurant information.'));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleCancel = () => {
    setEditedInfo(restaurantInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof RestaurantInfoT, value: any) => {
    if (editedInfo) {
      setEditedInfo(prev => ({ 
        ...prev!, 
        [field]: value,
        // Handle nested location object if needed
        ...(field === 'location' && typeof value === 'object' ? { location: value } : {})
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurantInfo) {
    return (
      <div className="p-4 text-center text-gray-500">
        No restaurant information available
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Restaurant Information</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your restaurant's profile and settings</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer w-full sm:w-auto transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Information
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button 
              onClick={handleSave} 
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer flex-1 sm:flex-none transition-colors"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={handleCancel} 
              className="flex items-center justify-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 cursor-pointer flex-1 sm:flex-none transition-colors"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Basic Info */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Basic Information</h2>

          <div className="space-y-3 sm:space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Restaurant Name</label>
              {isEditing ? (
                <input
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={editedInfo?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{restaurantInfo.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
              {isEditing ? (
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  value={editedInfo?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              ) : (
                <p className="text-gray-900 whitespace-pre-line">{restaurantInfo.description}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Tags</label>
              {isEditing ? (
                <input
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={editedInfo?.tags?.join(', ') || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                  placeholder="North Indian, Chinese, Fast Food"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {restaurantInfo.tags?.length ? (
                    restaurantInfo.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No tags added</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Contact Information</h2>

          <div className="space-y-3 sm:space-y-4">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
              {isEditing ? (
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={2}
                  value={editedInfo?.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              ) : (
                <div className="flex items-start text-gray-900">
                  <MapPin className="h-4 w-4 mt-1 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="whitespace-pre-line">{restaurantInfo.address}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={editedInfo?.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <div className="flex items-center text-gray-900">
                  <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{restaurantInfo.phone}</span>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${
                  restaurantInfo.isActive ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium">
                  {restaurantInfo.isActive ? 'Active' : 'Inactive'}
                </span>
                {restaurantInfo.isBlocked && (
                  <span className="ml-2 text-red-500 font-medium">(Blocked)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;