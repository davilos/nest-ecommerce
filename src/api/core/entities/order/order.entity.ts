export class Order {
  constructor(
    public id: string,
    public userId: string,
    public items: OrderItem[],
    public totalAmount: number,
    public status: OrderStatus,
    public createdAt: Date,
  ) {}

  static create(userId: string, items: OrderItem[]): Order {
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = new Order(
      crypto.randomUUID(),
      userId,
      items,
      totalAmount,
      OrderStatus.PENDING,
      new Date(),
    );

    return order;
  }
}
