export interface Order {
    orderId: string;
    customerName: string;
    orderDate: string;
    status: string;
    totalAmount: number;
  }
  
  export const mockOrderData: Order[] = [
    { orderId: 'OID101', customerName: 'Alice Smith', orderDate: '2025-05-13', status: 'Placed', totalAmount: 75.50 },
    { orderId: 'OID102', customerName: 'Bob Johnson', orderDate: '2025-05-12', status: 'Confirmed', totalAmount: 120.00 },
    { orderId: 'OID103', customerName: 'Charlie Brown', orderDate: '2025-05-13', status: 'Delivered', totalAmount: 55.75 },
    { orderId: 'OID104', customerName: 'Diana Lee', orderDate: '2025-05-11', status: 'Cancelled', totalAmount: 30.20 },
    { orderId: 'OID105', customerName: 'Eve Williams', orderDate: '2025-05-14', status: 'Placed', totalAmount: 90.10 },
    { orderId: 'OID106', customerName: 'Frank Miller', orderDate: '2025-05-12', status: 'Delivered', totalAmount: 150.00 },
    { orderId: 'OID107', customerName: 'Grace Davis', orderDate: '2025-05-13', status: 'Confirmed', totalAmount: 45.60 },
    { orderId: 'OID108', customerName: 'Henry Wilson', orderDate: '2025-05-10', status: 'Cancelled', totalAmount: 22.80 },
  ];