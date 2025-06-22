import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
};

interface MenuState {
  items: MenuItem[];
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  categories: [
    "All",
    "Veg",
    "Non-veg",
    "Starters",
    "Main Course",
    "Breads",
    "Desserts",
    "Beverages",
  ],
  searchTerm: "",
  selectedCategory: "All",
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
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
   
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setLoading,
  setError,
} = menuSlice.actions;

export default menuSlice.reducer;