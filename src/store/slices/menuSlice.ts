// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// // Base API URL for your real backend
// const API_BASE = "http://localhost:3005/restaurant";

// // Type definition for a menu item (ensure it matches your backend's expected structure)
// export type MenuItem = {
//   id: string; // The frontend will use 'id', but backend might return '_id'
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   tags: string[];
//   // 'coupons' field removed
// };

// // Type for adding a new item (without the ID)
// export type NewMenuItem = Omit<MenuItem, "id">;

// // Type for updating an item (all fields optional except id for sending patch/put data)
// export type UpdateMenuItem = Partial<MenuItem> & { id: string };


// // Interface for the menu state
// interface MenuState {
//   items: MenuItem[];
//   categories: string[];
//   searchTerm: string;
//   selectedCategory: string;
//   isLoading: boolean;
//   error: string | null;
// }

// // Initial state for the menu
// const initialState: MenuState = {
//   items: [],
//   categories: [
//     "All",
//     "Veg",
//     "Non-veg",
//     "Starters",
//     "Main Course",
//     "Breads",
//     "Desserts",
//     "Beverages",
//   ],
//   searchTerm: "",
//   selectedCategory: "All",
//   isLoading: false,
//   error: null,
// };

// // Helper function for authentication headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('managerAccessToken');
//   if (!token) {
//     // In a real app, you'd redirect to login or show a specific error
//     throw new Error('Authentication token not found. Please log in.');
//   }
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   };
// };

// const handleError = (error: any, defaultMessage: string): string => {
//   console.error('API Error:', error);
//   if (axios.isAxiosError(error) && error.response) {
//     // If it's an Axios error with a response, try to get a specific message
//     return error.response.data.message || error.response.statusText || defaultMessage;
//   } else if (error instanceof Error) {
//     // General JavaScript error
//     return error.message;
//   }
//   return defaultMessage;
// };

// // Async thunk to fetch menu items from API
// export const fetchMenuItems = createAsyncThunk(
//   "menu/fetchMenuItems",
//   async (_, { rejectWithValue }) => {
//     try {
//       // GET: ${API_BASE}/menuItem
//       const response = await axios.get(`${API_BASE}/menuItem`, getAuthHeaders());
//       // CRITICAL FIX: Map backend's _id to frontend's id
//       const items: MenuItem[] = response.data.map((item: any) => ({
//         ...item,
//         id: item.id || item._id, // Ensure 'id' is always present, use '_id' if 'id' is not there
//         tags: Array.isArray(item.tags) ? item.tags.map((t: any) => String(t)) : [],
//       }));
//       return items;
//     } catch (error) {
//       return rejectWithValue(handleError(error, "Failed to fetch menu items"));
//     }
//   }
// );

// // Async thunk to add a new menu item
// export const addMenuItemAPI = createAsyncThunk(
//   "menu/addMenuItem",
//   async (item: NewMenuItem, { rejectWithValue }) => {
//     try {
//       // POST: ${API_BASE}/menu
//       const response = await axios.post(`${API_BASE}/menu`, item, getAuthHeaders());
//       // CRITICAL FIX: Map backend's _id to frontend's id for newly created item
//       const newItem: MenuItem = {
//         ...response.data,
//         id: response.data.id || response.data._id,
//         tags: Array.isArray(response.data.tags) ? response.data.tags.map((t: any) => String(t)) : [],
//       };
//       return newItem;
//     } catch (error) {
//       return rejectWithValue(handleError(error, "Failed to add menu item"));
//     }
//   }
// );

// // Async thunk to update an existing menu item
// export const updateMenuItemAPI = createAsyncThunk(
//   "menu/updateMenuItem",
//   async (item: UpdateMenuItem, { rejectWithValue }) => {
//     try {
//       // PUT: ${API_BASE}/menuItem/${id}
//       const { id, ...dataToUpdate } = item; // Destructure ID from the item
//       const response = await axios.put(`${API_BASE}/menuItem/${id}`, dataToUpdate, getAuthHeaders());
//       // CRITICAL FIX: Map backend's _id to frontend's id for updated item
//       const updatedItem: MenuItem = {
//         ...response.data,
//         id: response.data.id || response.data._id,
//         tags: Array.isArray(response.data.tags) ? response.data.tags.map((t: any) => String(t)) : [],
//       };
//       return updatedItem;
//     } catch (error) {
//       return rejectWithValue(handleError(error, "Failed to update menu item"));
//     }
//   }
// );

// // Async thunk to delete a menu item
// export const deleteMenuItemAPI = createAsyncThunk(
//   "menu/deleteMenuItem",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       // DELETE: ${API_BASE}/menu/${id}
//       await axios.delete(`${API_BASE}/menu/${id}`, getAuthHeaders());
//       return id; // Return the ID of the deleted item to remove it from state
//     } catch (error) {
//       return rejectWithValue(handleError(error, "Failed to delete menu item"));
//     }
//   }
// );

// // Create the menu slice with reducers and extra reducers for async actions
// const menuSlice = createSlice({
//   name: "menu",
//   initialState,
//   reducers: {
//     setSearchTerm: (state, action: PayloadAction<string>) => {
//       state.searchTerm = action.payload;
//     },
//     setSelectedCategory: (state, action: PayloadAction<string>) => {
//       state.selectedCategory = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch menu items cases
//       .addCase(fetchMenuItems.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchMenuItems.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Add menu item cases
//       .addCase(addMenuItemAPI.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addMenuItemAPI.fulfilled, (state, action: PayloadAction<MenuItem>) => {
//         state.isLoading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addMenuItemAPI.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Update menu item cases
//       .addCase(updateMenuItemAPI.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateMenuItemAPI.fulfilled, (state, action: PayloadAction<MenuItem>) => {
//         state.isLoading = false;
//         const index = state.items.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       })
//       .addCase(updateMenuItemAPI.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Delete menu item cases
//       .addCase(deleteMenuItemAPI.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteMenuItemAPI.fulfilled, (state, action: PayloadAction<string>) => {
//         state.isLoading = false;
//         state.items = state.items.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteMenuItemAPI.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setSearchTerm, setSelectedCategory } = menuSlice.actions;
// export default menuSlice.reducer;