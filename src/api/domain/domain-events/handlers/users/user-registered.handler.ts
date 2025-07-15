import { IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../../events/users/user-registered.event';

export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  constructor(
    private userService: any, // Replace with actual service type
    private emailService: any, // Replace with actual service type
  ) {}

  async handle(event: UserRegisteredEvent) {
    await this.userService.createUser(
      event.userId,
      event.email,
      event.name,
      event.registeredAt,
    );

    await this.emailService.sendWelcomeEmail(event.email, event.name);
  }
}
