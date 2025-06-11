import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { addMenuItem, updateMenuItem } from '../../../../store/slices/menuSlice';
import type { MenuItem } from '../../../../store/slices/menuSlice';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: MenuItem | null;
}

const MenuItemModal = ({ isOpen, onClose, editingItem }: MenuItemModalProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.menu.categories);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '/placeholder.svg',
    isVeg: true,
    isAvailable: true,
    preparationTime: 10,
    variants: [] as Array<{ name: string; price: number; id: string }>,
  });

  const [newVariant, setNewVariant] = useState({ name: '', price: 0 });

  useEffect(() => {
    if (editingItem) {
      setFormData({ 
        ...editingItem,
        variants: editingItem.variants || [] 
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '/placeholder.svg',
        isVeg: true,
        isAvailable: true,
        preparationTime: 10,
        variants: [],
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const menuItem: MenuItem = {
      id: editingItem?.id || Date.now().toString(),
      ...formData,
    };

    editingItem ? dispatch(updateMenuItem(menuItem)) : dispatch(addMenuItem(menuItem));
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addVariant = () => {
    if (newVariant.name && newVariant.price > 0) {
      setFormData({
        ...formData,
        variants: [
          ...formData.variants,
          { ...newVariant, id: Date.now().toString() },
        ],
      });
      setNewVariant({ name: '', price: 0 });
    }
  };

  const removeVariant = (variantId: string) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter(v => v.id !== variantId),
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
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
            />
          </div>

          {/* Price & Prep Time */}
          <div className="grid grid-cols-2 gap-4">
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time (min)
              </label>
              <input
                type="number"
                min="1"
                value={formData.preparationTime}
                onChange={e => handleInputChange('preparationTime', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={e => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select category</option>
              {categories.filter(cat => cat !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={e => handleInputChange('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="/placeholder.svg"
            />
          </div>

          {/* Variants Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variants
            </label>
            <div className="space-y-2">
              {formData.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">
                    {variant.name} - ₹{variant.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVariant(variant.id)}
                    className="text-orange-600 hover:text-orange-800 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Variant name"
                  value={newVariant.name}
                  onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  value={newVariant.price || ''}
                  onChange={(e) => setNewVariant({
                    ...newVariant,
                    price: parseFloat(e.target.value) || 0,
                  })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Switches */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isVeg}
                onChange={(e) => handleInputChange('isVeg', e.target.checked)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Vegetarian</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Available</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              {editingItem ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;