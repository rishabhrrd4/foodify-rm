import { createSlice } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string[];
  openingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  rating: number;
  totalOrders: number;
  image: string;
}

interface RestaurantState {
  info: RestaurantInfo;
  isLoading: boolean;
}

const initialState: RestaurantState = {
    info: {
      id: 'REST001',
      name: 'Fresh Eats',
      description: 'An authentic North Indian dining experience, offering rich curries, tandoori delights, and traditional desserts crafted with the finest spices.',
      address: '12/4 Vikas Marg, Lajpat Nagar, Delhi - 110024',
      phone: '+91 11 2345 6789',
      email: 'contact@fresheats.in',
      cuisine: ['North Indian', 'Punjabi', 'Mughlai'],
      openingHours: {
        monday: { open: '09:00', close: '23:00', isOpen: true },
        tuesday: { open: '09:00', close: '23:00', isOpen: true },
        wednesday: { open: '09:00', close: '23:00', isOpen: true },
        thursday: { open: '09:00', close: '23:00', isOpen: true },
        friday: { open: '09:00', close: '23:00', isOpen: true },
        saturday: { open: '09:00', close: '23:00', isOpen: true },
        sunday: { open: '10:00', close: '22:00', isOpen: true },
      },
      rating: 4.5,
      totalOrders: 1247,
      image: 'https://cdn.pixabay.com/photo/2017/09/16/03/52/indian-restaurant-2754269_1280.jpg',
    },
    isLoading: false,
  };

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    updateRestaurantInfo: (state, action: PayloadAction<Partial<RestaurantInfo>>) => {
      state.info = { ...state.info, ...action.payload };
    },
    updateOpeningHours: (state, action: PayloadAction<{ day: string; hours: { open: string; close: string; isOpen: boolean } }>) => {
      state.info.openingHours[action.payload.day] = action.payload.hours;
    },
  },
});

export const {
  updateRestaurantInfo,
  updateOpeningHours,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;