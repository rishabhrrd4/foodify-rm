import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { addMenuItemAPI, updateMenuItemAPI } from '../../../../store/slices/menuSlice';
import type { MenuItem } from '../../../../store/slices/menuSlice';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: MenuItem | null;
}

const MenuItemModal = ({ isOpen, onClose, editingItem }: MenuItemModalProps) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '/placeholder.svg',
    tags: [] as string[],
    copons: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [newCopon, setNewCopon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData({ 
        name: editingItem.name || '',
        description: editingItem.description || '',
        price: editingItem.price || 0,
        imageUrl: editingItem.imageUrl || '/placeholder.svg',
        tags: editingItem.tags || [],
        copons: editingItem.copons || [],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        imageUrl: '/placeholder.svg',
        tags: [],
        copons: [],
      });
    }
    setError(null);
  }, [editingItem, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingItem) {
        await dispatch(updateMenuItemAPI({
          id: editingItem.id,
          ...formData,
        })).unwrap();
      } else {
        await dispatch(addMenuItemAPI(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      setError('Failed to save menu item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const addCopon = () => {
    if (newCopon.trim()) {
      setFormData({
        ...formData,
        copons: [...formData.copons, newCopon.trim()],
      });
      setNewCopon('');
    }
  };

  const removeCopon = (index: number) => {
    setFormData({
      ...formData,
      copons: formData.copons.filter((_, i) => i !== index),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 pb-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-orange-500 transition-colors"
            disabled={isSubmitting}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              id="name"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              disabled={isSubmitting}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={e => handleInputChange('price', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={e => handleInputChange('imageUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="/placeholder.svg"
              disabled={isSubmitting}
            />
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-orange-600 hover:text-orange-800 transition-colors"
                    disabled={isSubmitting}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Coupons Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coupons
            </label>
            <div className="space-y-2">
              {formData.copons.map((copon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">{copon}</span>
                  <button
                    type="button"
                    onClick={() => removeCopon(index)}
                    className="text-orange-600 hover:text-orange-800 transition-colors"
                    disabled={isSubmitting}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon code"
                  value={newCopon}
                  onChange={(e) => setNewCopon(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={addCopon}
                  className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingItem ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editingItem ? 'Update' : 'Add'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;