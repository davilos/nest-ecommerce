import { AggregateRoot } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../events/users/user-registered.event';

export class UserAggregate extends AggregateRoot {
  registered(data: UserData) {
    this.apply(
      new UserRegisteredEvent(
        data.userId,
        data.email,
        data.name,
        data.createdAt,
      ),
    );
  }
}

export interface UserData {
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
}
