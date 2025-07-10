import { AggregateRoot } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../events/user-registered.event';

export class UserAggregate extends AggregateRoot {
  constructor(
    public id: string,
    private email: string,
    private name: string,
  ) {
    super();
  }

  registered(registeredAt: Date) {
    this.apply(
      new UserRegisteredEvent(this.id, this.email, this.name, registeredAt),
    );
  }
}
