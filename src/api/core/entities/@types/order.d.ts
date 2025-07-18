type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
};

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
};
