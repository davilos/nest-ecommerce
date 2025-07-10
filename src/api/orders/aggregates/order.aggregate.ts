import { AggregateRoot } from '@nestjs/cqrs';
import { OrderPlacedEvent } from '../events/order-placed.event';
import { OrderPaidEvent } from '../events/order-paid.event';

export class OrderAggregate extends AggregateRoot {
  constructor(
    public id: string,
    private userId: string,
    private items: OrderItem[],
    private totalAmount: number,
  ) {
    super();
  }

  place(placedAt: Date) {
    this.apply(
      new OrderPlacedEvent(
        this.id,
        this.userId,
        this.items,
        this.totalAmount,
        placedAt,
      ),
    );
  }

  markAsPaid(paymentId: string) {
    this.apply(new OrderPaidEvent(this.id, paymentId));
  }
}
