import { store } from '../store/index.tsx';
import { addOrder } from '../store/slices/orderSlice';
import type { Order } from '../store/slices/orderSlice';

// Mock data for testing
const mockItems = [
  { id: '1', name: 'Butter Chicken', quantity: 2, price: 349 },
  { id: '2', name: 'Paneer Tikka', quantity: 1, price: 299 },
  { id: '3', name: 'Dal Makhani', quantity: 1, price: 249 },
  { id: '4', name: 'Naan', quantity: 2, price: 49 },
  { id: '5', name: 'Biryani', quantity: 1, price: 399 },
];

const mockCustomerNames = [
  'Rahul Sharma',
  'Priya Patel',
  'Amit Kumar',
  'Neha Singh',
  'Raj Malhotra',
];

const createMockWebSocketService = () => {
  let intervalId: number | null = null;

  const generateMockOrder = (): Order => {
    const randomItems = mockItems
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    const totalAmount = randomItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      id: 'ORD' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      customerName: mockCustomerNames[Math.floor(Math.random() * mockCustomerNames.length)],
      customerPhone: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
      items: randomItems,
      totalAmount,
      status: 'pending',
      orderTime: new Date().toISOString(),
      deliveryAddress: '123 Test Address, New Delhi',
      paymentMethod: Math.random() > 0.5 ? 'Online' : 'Cash on Delivery',
    };
  };

  return {
    connect: (restaurantId: string) => {
      console.log('Mock WebSocket connected for restaurant:', restaurantId);
      
      // har 15-30 sec me ek order generate karega
      intervalId = window.setInterval(() => {
        const mockOrder = generateMockOrder();
        store.dispatch(addOrder(mockOrder));
      }, Math.random() * 15000 + 15000);

      // pehla order generate karega turant
      setTimeout(() => {
        const mockOrder = generateMockOrder();
        store.dispatch(addOrder(mockOrder));
      }, 2000);
    },

    disconnect: () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      console.log('Mock WebSocket disconnected');
    }
  };
};

export const websocketService = createMockWebSocketService(); 