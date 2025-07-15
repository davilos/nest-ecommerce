import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentProcessedEvent } from '../events/payments/payment-processed.event';

export class PaymentAggregate extends AggregateRoot {
  processPayment(data: PaymentData) {
    this.apply(
      new PaymentProcessedEvent(
        data.paymentId,
        data.orderId,
        data.amount,
        data.method,
        data.processedAt,
      ),
    );
  }
}

export interface PaymentData {
  paymentId: string;
  orderId: string;
  amount: number;
  method: string;
  processedAt: Date;
}
