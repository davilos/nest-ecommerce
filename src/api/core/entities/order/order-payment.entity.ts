import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentProcessedEvent } from '../../events/payment-processed.event';

export class OrderPayment extends AggregateRoot {
  processPayment(
    orderId: string,
    totalAmount: number,
    paymentId: string,
    method: string,
  ) {
    this.apply(
      new PaymentProcessedEvent(
        paymentId,
        orderId,
        totalAmount,
        method,
        new Date(),
      ),
    );
  }
}
