import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/api/orders/repositories/order-repository';
import { PaymentProcess } from '../domain-events/aggregates/payment.aggregate';

@Injectable()
export class PaymentService {
  constructor(private ordersRepository: OrdersRepository) {}

  async processPayment(data: ProcessPaymentData): Promise<void> {
    const order = await this.ordersRepository.findById(data.orderId);

    if (!order) {
      throw new Error(`Order with ID ${data.orderId} not found`);
    }

    const paymentId = await this.processPaymentExternalAPI();

    const processPaymentEvent = new PaymentProcess();

    processPaymentEvent.processPayment({
      paymentId,
      orderId: order.id,
      amount: order.totalAmount,
      method: data.method,
      processedAt: new Date(),
    });

    await this.ordersRepository.update(order.id, {
      userId: order.userId,
      items: order.items,
      status: OrderStatus.COMPLETED,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
    });

    processPaymentEvent.commit();
  }

  private async processPaymentExternalAPI() {
    const paymentId = (await Promise.all([
      crypto.randomUUID(),
    ])) as unknown as string;
    return paymentId; // Simulate payment processing and return a payment ID
  }
}

type ProcessPaymentData = {
  orderId: string;
  method: string; // e.g., 'credit_card', 'paypal'
};
