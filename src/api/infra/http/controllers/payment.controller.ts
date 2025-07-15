import { Body, Param, Post } from '@nestjs/common';
import { PaymentService } from 'src/api/domain/services/payment.service';
import { ProcessPaymentDto } from './dto/payments/process-payment';

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post(':orderId/payment')
  async processPayment(
    @Param('orderId') orderId: string,
    @Body() processPaymentDto: ProcessPaymentDto,
  ) {
    await this.paymentService.processPayment({
      orderId,
      ...processPaymentDto,
    });

    return {
      message: 'Payment processed successfully',
    };
  }
}
