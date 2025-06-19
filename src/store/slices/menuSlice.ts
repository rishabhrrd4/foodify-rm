import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// API URL for mock data
const API_URL = "https://685270eb0594059b23cd89e5.mockapi.io/Menu";

// Type definition for a menu item
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  copons: string[]; // Note: Typo here (should be "coupons"), but keeping as is for API compatibility
};

// Interface for the menu state
interface MenuState {
  items: MenuItem[];
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
}

// Initial state for the menu
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

// Async thunk to fetch menu items from API
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch menu items");
    }
  }
);

// Async thunk to add a new menu item
export const addMenuItemAPI = createAsyncThunk(
  "menu/addMenuItem",
  async (item: Omit<MenuItem, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, item);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add menu item");
    }
  }
);

// Async thunk to update an existing menu item
export const updateMenuItemAPI = createAsyncThunk(
  "menu/updateMenuItem",
  async (item: MenuItem, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${item.id}`, item);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update menu item");
    }
  }
);

// Async thunk to delete a menu item
export const deleteMenuItemAPI = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete menu item");
    }
  }
);

// Create the menu slice with reducers and extra reducers for async actions
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // Reducer to set the search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    // Reducer to set the selected category
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch menu items cases
      .addCase(fetchMenuItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Add menu item cases
      .addCase(addMenuItemAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMenuItemAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addMenuItemAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update menu item cases
      .addCase(updateMenuItemAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMenuItemAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateMenuItemAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete menu item cases
      .addCase(deleteMenuItemAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMenuItemAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteMenuItemAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setSearchTerm, setSelectedCategory } = menuSlice.actions;
export default menuSlice.reducer;