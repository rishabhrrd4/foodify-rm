import { useState } from 'react';
import { Edit, Save, X, MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { updateRestaurantInfo } from '../../../store/slices/restaurantSlice';

const RestaurantInfo = () => {
  const dispatch = useAppDispatch();
  const restaurantInfo = useAppSelector(state => state.restaurant.info);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(restaurantInfo);

  const handleSave = () => {
    dispatch(updateRestaurantInfo(editedInfo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(restaurantInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day: string, field: string, value: any) => {
    const newHours = {
      ...editedInfo.openingHours[day],
      [field]: value
    };
    setEditedInfo(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: newHours
      }
    }));
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

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
            className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer w-full sm:w-auto"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Information
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button 
              onClick={handleSave} 
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer flex-1 sm:flex-none"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button 
              onClick={handleCancel} 
              className="flex items-center justify-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 cursor-pointer flex-1 sm:flex-none"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Basic Info */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Basic Information</h2>

          <div className="space-y-3 sm:space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Restaurant Name</label>
              {isEditing ? (
                <input
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  value={editedInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{restaurantInfo.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              {isEditing ? (
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  rows={3}
                  value={editedInfo.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{restaurantInfo.description}</p>
              )}
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-medium mb-1">Cuisine Types</label>
              {isEditing ? (
                <input
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  value={editedInfo.cuisine.join(', ')}
                  onChange={(e) => handleInputChange('cuisine', e.target.value.split(', '))}
                />
              ) : (
                <p className="text-gray-900">{restaurantInfo.cuisine.join(', ')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Contact Information</h2>

          <div className="space-y-3 sm:space-y-4">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              {isEditing ? (
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  rows={2}
                  value={editedInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              ) : (
                <div className="flex items-start text-gray-900">
                  <MapPin className="h-4 w-4 mt-1 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{restaurantInfo.address}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              {isEditing ? (
                <input
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  value={editedInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <div className="flex items-center text-gray-900">
                  <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{restaurantInfo.phone}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  value={editedInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <div className="flex items-center text-gray-900">
                  <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{restaurantInfo.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Restaurant Statistics</h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                <span>Rating</span>
              </div>
              <span className="text-xl font-bold text-yellow-600">{restaurantInfo.rating}/5</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Orders</span>
              <span className="text-xl font-bold text-green-600">{restaurantInfo.totalOrders}</span>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Opening Hours</h2>

          <div className="space-y-2 sm:space-y-3">
            {days.map((day) => (
              <div key={day} className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                <div className="flex items-center gap-2 xs:w-40">
                  {isEditing && (
                    <input
                      type="checkbox"
                      className="h-4 w-4 flex-shrink-0"
                      checked={editedInfo.openingHours[day].isOpen}
                      onChange={(e) => handleHoursChange(day, 'isOpen', e.target.checked)}
                    />
                  )}
                  <span className="capitalize font-medium text-sm sm:text-base">{day}</span>
                </div>

                {isEditing ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <input
                        type="time"
                        value={editedInfo.openingHours[day].open}
                        onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                        disabled={!editedInfo.openingHours[day].isOpen}
                        className="border rounded px-2 py-1 w-full sm:w-28 text-xs sm:text-sm"
                      />
                      <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">to</span>
                    </div>
                    <input
                      type="time"
                      value={editedInfo.openingHours[day].close}
                      onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                      disabled={!editedInfo.openingHours[day].isOpen}
                      className="border rounded px-2 py-1 w-full sm:w-28 text-xs sm:text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 sm:mr-2 text-gray-400 flex-shrink-0" />
                    {restaurantInfo.openingHours[day].isOpen ? (
                      <span className="text-sm sm:text-base text-gray-900">
                        {restaurantInfo.openingHours[day].open} - {restaurantInfo.openingHours[day].close}
                      </span>
                    ) : (
                      <span className="text-sm sm:text-base text-orange-500">Closed</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;