import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentProcessedEvent } from '../events/payment-processed.event';

export class Payment extends AggregateRoot {
  constructor(
    public id: string,
    private orderId: string,
    private amount: number,
    private method: string,
  ) {
    super();
  }

  processPayment(processedAt: Date) {
    this.apply(
      new PaymentProcessedEvent(
        this.id,
        this.orderId,
        this.amount,
        this.method,
        processedAt,
      ),
    );
  }
}
