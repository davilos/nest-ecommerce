import { AggregateRoot } from '@nestjs/cqrs';
import { OrderPlacedEvent } from '../events/order-placed.event';

export class OrderAggregate extends AggregateRoot {
  placed(data: OrderData) {
    this.apply(
      new OrderPlacedEvent(
        data.orderId,
        data.userId,
        data.items,
        data.totalAmount,
        data.placedAt,
      ),
    );
  }
}

export interface OrderData {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  placedAt: Date;
}
