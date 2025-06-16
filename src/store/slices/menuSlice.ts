import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// In your store/slices/menuSlice.ts
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
  preparationTime: number;
  variants?: Array<{
    // Make it optional with ?
    id: string;
    name: string;
    price: number;
  }>;
};

interface MenuState {
  items: MenuItem[];
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  isLoading: boolean;
}

const initialState: MenuState = {
  items: [
    {
      id: "1",
      name: "Gulab Jamun",
      description: "Soft milk dumplings soaked in sweet rose-flavored syrup",
      price: 99,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1617299649640-96f1a27a7793",
      isVeg: true,
      isAvailable: false,
      preparationTime: 10,
    },
    {
      id: "2",
      name: "Paneer Tikka",
      description:
        "Marinated paneer cubes grilled with bell peppers and onions",
      price: 299,
      category: "Starters",
      image: "https://images.unsplash.com/photo-1596797038530-2c1076a76b1b",
      isVeg: true,
      isAvailable: true,
      preparationTime: 20,
    },
    {
      id: "3",
      name: "Dal Makhani",
      description:
        "Slow-cooked black lentils in a rich, creamy sauce with butter and spices",
      price: 249,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1626500118719-4e54b973e845",
      isVeg: true,
      isAvailable: true,
      preparationTime: 30,
    },
    {
      id: "4",
      name: "Butter Chicken",
      description:
        "Tender chicken cooked in a creamy tomato-based sauce with butter and spices",
      price: 349,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae39",
      isVeg: false,
      isAvailable: true,
      preparationTime: 25,
    },
  ],
  categories: [
    "All",
    "Starters",
    "Main Course",
    "Breads",
    "Desserts",
    "Beverages",
  ],
  searchTerm: "",
  selectedCategory: "All",
  isLoading: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    toggleItemAvailability: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.isAvailable = !item.isAvailable;
      }
    },
  },
});

export const {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setSearchTerm,
  setSelectedCategory,
  toggleItemAvailability,
} = menuSlice.actions;

export default menuSlice.reducer;
