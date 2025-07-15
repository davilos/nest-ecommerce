import { Body, Post } from '@nestjs/common';
import { OrderService } from 'src/api/domain/services/order.service';
import { CreateOrderDto } from './dto/orders/create-order.dto';

export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);

    return {
      message: 'Order created successfully',
      order,
    };
  }
}
