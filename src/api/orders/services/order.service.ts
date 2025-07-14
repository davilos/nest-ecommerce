import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { OrdersRepository } from '../repositories/order-repository';
import { Order } from '../entities/order.entity';
import { OrderAggregate } from '../domain-events/aggregates/order.aggregate';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private eventBus: EventBus,
  ) {}

  async createOrder(userId: string, items: OrderItem[]) {
    this.validateOrderItems(items);

    const order = Order.create(userId, items);

    const createOrderEvent = new OrderAggregate();
    createOrderEvent.placed({
      orderId: order.id,
      userId: order.userId,
      items: order.items,
      totalAmount: order.totalAmount,
      placedAt: order.createdAt,
    });

    await this.ordersRepository.create(order);
    createOrderEvent.commit();

    return order;
  }

  private validateOrderItems(items: OrderItem[]) {
    const validItems = items.filter(
      (item) => item.quantity > 0 && item.price > 0,
    );

    if (validItems.length !== items.length) {
      throw new Error('Invalid order items');
    }

    return validItems;
  }
}
