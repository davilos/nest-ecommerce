import { IEventHandler } from '@nestjs/cqrs';
import { OrderPlacedEvent } from '../../events/orders/order-placed.event';

export class OrderPlacedHandler implements IEventHandler<OrderPlacedEvent> {
  constructor(
    private inventoryService: any, // Replace with actual service type
    private notificationService: any, // Replace with actual service type
  ) {}

  async handle(event: OrderPlacedEvent) {
    await this.inventoryService.reserveItems(event.items);

    await this.notificationService.sendOrderConfirmation(
      event.orderId,
      event.userId,
      event.items,
      event.totalAmount,
    );
  }
}
