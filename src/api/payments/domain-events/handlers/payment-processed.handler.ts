import { IEventHandler } from '@nestjs/cqrs';
import { PaymentProcessedEvent } from '../events/payment-processed.event';

export class PaymentProcessedHandler
  implements IEventHandler<PaymentProcessedEvent>
{
  constructor(
    private notificationService: any, // Replace with actual service type
    private invoiceService: any, // Replace with actual service type
  ) {}

  async handle(event: PaymentProcessedEvent) {
    await this.invoiceService.generateInvoice(
      event.paymentId,
      event.orderId,
      event.amount,
      event.method,
      event.processedAt,
    );

    await this.notificationService.notifyDeliveryTeam(event.orderId);
  }
}
