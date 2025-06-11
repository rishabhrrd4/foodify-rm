// types.ts
export interface DeliveryAddress {
  id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  label: string;
}

export type PaymentMethod = "mock" | "cod";

export interface OrderData {
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
}

export interface OperatingHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface FormData {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsappUpdates: boolean;
  primaryContactSame: boolean;
  primaryPhone: string;
  shopNumber: string;
  floor: string;
  area: string;
  city: string;
  landmark: string;
  cuisineTypes: string[];
  restaurantType: string;
  operatingHours: {
    [key: string]: OperatingHours;
  };
  bankAccount: string;
  ifscCode: string;
  accountHolder: string;
  gstNumber: string;
}

export interface UploadedFiles {
  fssaiLicense: File | null;
  menuCard: File | null;
  restaurantPhotos: File | null;
  panCard: File | null;
}

export interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}