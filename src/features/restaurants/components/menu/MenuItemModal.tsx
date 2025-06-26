import { useState, useEffect, useRef, useCallback } from 'react';
import { FaTimes, FaPlus, FaTrash, FaUpload, FaImage } from 'react-icons/fa';
import { addMenuItem, updateMenuItem, type MenuItem } from '../../../../api/api';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: MenuItem | null;
  onItemAdded: (item: MenuItem) => void;
}

const placeholderImg='https://thumbs.dreamstime.com/b/logo-fresh-food-farm-vector-illustration-white-background-140863729.jpg';

const MenuItemModal = ({ isOpen, onClose, editingItem, onItemAdded }: MenuItemModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: placeholderImg,
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    description: '',
    price: '',
  });

  // Image upload states
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData({ 
        name: editingItem.name || '',
        description: editingItem.description || '',
        price: editingItem.price || 0,
        imageUrl: editingItem.imageUrl || placeholderImg,
        tags: editingItem.tags || [],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        imageUrl: placeholderImg,
        tags: ["Veg"],
      });
    }
    setError(null);
    setNewTag('');
    setValidationErrors({
      name: '',
      description: '',
      price: '',
    });
    setImageUploadError(null);
  }, [editingItem, isOpen]);

  const validateForm = () => {
    const errors = {
      name: '',
      description: '',
      price: '',
    };

    let isValid = true;

    // Validate name (2-30 characters)
    if (formData.name.length < 2 || formData.name.length > 30) {
      errors.name = 'Name must be between 2 and 30 characters';
      isValid = false;
    }

    // Validate description (10-250 characters)
    if (formData.description.length > 0 && 
        (formData.description.length < 10 || formData.description.length > 250)) {
      errors.description = 'Description must be between 10 and 150 characters';
      isValid = false;
    }

    // Validate price (must be greater than 0)
    if (formData.price <= 0) {
      errors.price = 'Price must be greater than 0';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Image handling functions
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validateImageFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setImageUploadError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }

    if (file.size > maxSize) {
      setImageUploadError('Image size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleImageUpload = async (file: File) => {
    if (!validateImageFile(file)) return;

    setIsProcessingImage(true);
    setImageUploadError(null);

    try {
      const base64Url = await convertFileToBase64(file);
      setFormData(prev => ({
        ...prev,
        imageUrl: base64Url
      }));
    } catch (error) {
      setImageUploadError('Failed to process image. Please try again.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let result;
      if (editingItem) {
        result = await updateMenuItem(editingItem.id, formData); 
      } else {
        result = await addMenuItem(formData);
      }
      onItemAdded(result);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? Number(value) : value 
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 pb-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-orange-500 transition-colors"
            disabled={isSubmitting}
            aria-label="Close modal"
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

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
              required
              disabled={isSubmitting}
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${validationErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
              disabled={isSubmitting}
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${validationErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
              required
              disabled={isSubmitting}
            />
            {validationErrors.price && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Image
            </label>
            
            {/* Image Preview */}
            {formData.imageUrl && (
              <div className="relative">
                <img
                  src={formData.imageUrl}
                  alt="Food item preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeholderImg;
                  }}
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                  <FaImage className="text-white text-sm" />
                </div>
              </div>
            )}

            {/* Drag and Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              } ${isProcessingImage ? 'opacity-50 pointer-events-none' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isSubmitting || isProcessingImage}
              />
              
              {isProcessingImage ? (
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-8 w-8 text-orange-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm text-gray-600">Processing image...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="text-orange-600 hover:text-orange-500 font-medium"
                      disabled={isSubmitting}
                    >
                      Click to upload
                    </button>
                    {' '}or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, WebP up to 5MB
                  </p>
                </div>
              )}
            </div>

            {imageUploadError && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {imageUploadError}
              </p>
            )}

            {/* Manual URL Input */}
            <div className="pt-2 border-t border-gray-200">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600 mb-1">
                Or enter image URL manually
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="https://example.com/image.jpg"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="newTag" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={`${tag}-${index}`}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-orange-600 hover:text-orange-800 transition-colors"
                    disabled={isSubmitting}
                    aria-label={`Remove tag ${tag}`}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  id="newTag"
                  type="text"
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
                  disabled={isSubmitting || !newTag.trim()}
                  aria-label="Add tag"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          </div>

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
              disabled={isSubmitting || isProcessingImage}
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
