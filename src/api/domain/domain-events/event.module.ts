import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';
import { UserService } from '../services/user.service';
import { OrderPlacedHandler } from './handlers/orders/order-placed.handler';
import { PaymentProcessedHandler } from './handlers/payments/payment-processed.handler';
import { UserRegisteredHandler } from './handlers/users/user-registered.handler';

const EventHandlers = [
  UserRegisteredHandler,
  OrderPlacedHandler,
  PaymentProcessedHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [UserService, OrderService, PaymentService, ...EventHandlers],
})
export class EventModule {}
