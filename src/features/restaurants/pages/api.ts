// api.ts

import axios from 'axios';

const API_BASE = "http://localhost:3005/restaurant";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

export interface NewMenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

export interface UpdateMenuItem {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  tags?: string[];
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('managerAccessToken');
  if (!token) throw new Error('Please login to continue');
  
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data);
    throw new Error(error.response?.data?.message || error.message || 'Request failed');
  }
  console.error('Unexpected error:', error);
  throw new Error('An unexpected error occurred');
};

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const res = await axios.get(`${API_BASE}/menuItem`, getAuthHeaders());
    return res.data.map((item: any) => ({
      ...item,
      id: item.id || item._id
    }));
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const addMenuItem = async (item: NewMenuItem): Promise<MenuItem> => {
  try {
    const res = await axios.post(`${API_BASE}/menu`, item, getAuthHeaders());
    return { ...res.data, id: res.data.id || res.data._id };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateMenuItem = async (id: string, item: UpdateMenuItem): Promise<MenuItem> => {
  try {
    const res = await axios.put(`${API_BASE}/menuItem/${id}`, item, getAuthHeaders());
    return { ...res.data, id: res.data.id || res.data._id };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE}/menu/${id}`, getAuthHeaders());
  } catch (error) {
    handleError(error);
    throw error;
  }
};