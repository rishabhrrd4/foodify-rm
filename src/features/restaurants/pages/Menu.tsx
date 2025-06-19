import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../hooks/useAppSelector";
import {
  setSearchTerm,
  setSelectedCategory,
  fetchMenuItems,
  deleteMenuItemAPI,
} from "../../../store/slices/menuSlice";
import MenuItemModal from "../components/menu/MenuItemModal";
import type { MenuItem } from "../../../store/slices/menuSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  const { 
    items, 
    categories, 
    searchTerm, 
    selectedCategory,
    isLoading,
    error 
  } = useAppSelector((state) => state.menu);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Fetch menu items on component mount
  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // Filter menu items based on search term and selected category
  const filteredItems = items?.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      item.tags?.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
      );
    return matchesSearch && matchesCategory;
  }) || [];

  // Handler for adding a new item
  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // Handler for editing an item
  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Handler for deleting an item
  const handleDelete = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteMenuItemAPI(itemId));
    }
  };

  // Loading state when first loading data
  if (isLoading && (!items || items.length === 0)) {
    return (
      <div className="p-4 sm:p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 sm:p-6">
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
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Menu Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Manage your restaurant's menu items
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium sm:font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors cursor-pointer text-sm sm:text-base"
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          Add New Item
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5 sm:h-4 sm:w-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => dispatch(setSelectedCategory(category))}
                className={`px-3 py-0.5 sm:px-4 sm:py-1 rounded-md font-medium transition-colors cursor-pointer text-xs sm:text-sm
                  ${
                    isSelected
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading indicator when filtering */}
      {isLoading && items && items.length > 0 && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full"
          >
            {/* Image + Labels */}
            <div
              className="relative bg-gray-100 overflow-hidden"
              style={{ height: "180px" }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                {item.tags?.some(
                  (tag) =>
                    tag.toLowerCase().includes("veg") &&
                    !item.tags?.some((tag) =>
                      tag.toLowerCase().includes("non-veg")
                    )
                ) ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Veg
                  </span>
                ) : item.tags?.some((tag) =>
                    tag.toLowerCase().includes("non-veg")
                  ) ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Non-Veg
                  </span>
                ) : null}
              </div>
            </div>

            {/* Item Details */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1.5 sm:mb-2">
                <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
                  {item.name}
                </h3>
                <span className="text-base sm:text-lg font-bold text-green-500 whitespace-nowrap ml-2">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Tags Display */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-2 sm:mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-full text-[0.65rem] sm:text-xs bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupons Display */}
              {item.copons && item.copons.length > 0 && (
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-[0.65rem] sm:text-xs font-medium text-gray-500 mb-1">
                    Coupons:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.copons.map((copon, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-md text-[0.65rem] sm:text-xs bg-orange-100 text-orange-800"
                      >
                        {copon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-auto pt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center px-2 sm:px-3 py-1 border border-orange-300 rounded-md text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && !isLoading && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-sm sm:text-base">
            No menu items found matching your criteria.
          </p>
        </div>
      )}

      {/* Modal for adding/editing items */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
      />
    </div>
  );
};

export default Menu;