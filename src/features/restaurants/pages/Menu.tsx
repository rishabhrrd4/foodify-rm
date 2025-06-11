import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../hooks/useAppSelector";
import {
  setSearchTerm,
  setSelectedCategory,
  deleteMenuItem,
  toggleItemAvailability,
} from "../../../store/slices/menuSlice";
import MenuItemModal from "../components/menu/MenuItemModal";
import type { MenuItem } from "../../../store/slices/menuSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  const { items, categories, searchTerm, selectedCategory } = useAppSelector(
    (state) => state.menu
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteMenuItem(itemId));
    }
  };

  const handleToggleAvailability = (itemId: string) => {
    dispatch(toggleItemAvailability(itemId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-500">Manage your restaurant's menu items</p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => dispatch(setSelectedCategory(category))}
                className={`px-4 py-1 rounded-md font-medium transition-colors cursor-pointer
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
          >
            {/* Image + Labels */}
            <div className="relative bg-gray-200 rounded-t-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <button
                  onClick={() => handleToggleAvailability(item.id)}
                  className={`p-1 rounded-full transition-colors cursor-pointer ${
                    item.isAvailable
                      ? "text-green-500 hover:text-green-800"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                  aria-label={
                    item.isAvailable ? "Mark unavailable" : "Mark available"
                  }
                >
                  {item.isAvailable ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.isVeg
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>
            </div>

            {/* Item Details */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="text-lg font-bold text-green-500">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Variants Display */}
              {item.variants && item.variants.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-500 mb-1">
                    Variants:
                  </h4>
                  <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
                    {item.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex justify-between lg:justify-start items-center text-xs bg-gray-100 rounded-md p-2 w-full lg:w-auto"
                      >
                        <span className="text-gray-600 font-medium">
                          {variant.name}
                        </span>
                        <span className="text-gray-600 lg:ml-4">
                          ₹{variant.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
                <span>Prep time: {item.preparationTime} min</span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    item.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center px-3 py-1 border border-orange-300 rounded-md text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No menu items found matching your criteria.
          </p>
        </div>
      )}

      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
      />
    </div>
  );
};

export default Menu;
