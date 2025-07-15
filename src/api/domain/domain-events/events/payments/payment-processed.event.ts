export class PaymentProcessedEvent {
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly amount: number,
    public readonly method: string,
    public readonly processedAt: Date,
  ) {}
}
