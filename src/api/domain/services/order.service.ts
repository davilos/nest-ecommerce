import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { OrderAggregate } from '../domain-events/aggregates/order.aggregate';
import { Order } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/order-repository';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private eventBus: EventBus,
  ) {}

  async createOrder(data: CreateOrder) {
    const validatedItems = this.validateOrderItems(data.items);

    const order = Order.create(data.userId, validatedItems);

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

interface CreateOrder {
  userId: string;
  items: OrderItem[];
}
