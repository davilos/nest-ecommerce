type OrderItem = {
  id: string;
  quantity: number;
  price: number;
};

enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
