export interface OrdersRepository {
  findById(orderId: string): Promise<Order | null>;
  create(data: Order): Promise<Order>;
  update(orderId: string, data: UpdateOrderData): Promise<Order>;
  delete(orderId: string): Promise<void>;
}

type UpdateOrderData = Omit<Order, 'id'>;
