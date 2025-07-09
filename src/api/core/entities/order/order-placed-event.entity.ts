import { AggregateRoot } from '@nestjs/cqrs';
import { Order } from './order.entity';
import { OrderPlacedEvent } from '../../events/order-placed.event';

export class OrderPlaced extends AggregateRoot {
  placeOrder(userId: string, items: OrderItem[]) {
    const order = Order.create(userId, items);

    this.apply(
      new OrderPlacedEvent(
        order.id,
        order.userId,
        order.items,
        order.totalAmount,
        order.createdAt,
      ),
    );
  }
}
