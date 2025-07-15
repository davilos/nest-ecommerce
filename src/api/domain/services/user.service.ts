import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserAggregate } from '../domain-events/aggregates/user.aggregate';
import { User } from '../entities/user.entity';
import {
  CreateUserParams,
  UsersRepository,
} from '../repositories/user-repository';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private eventBus: EventBus,
  ) {}

  async registerUser(data: CreateUserParams) {
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = User.create(data.email, data.name);

    const registerUserEvent = new UserAggregate();

    registerUserEvent.registered({
      userId: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
    registerUserEvent.commit();

    await this.usersRepository.create(user);

    return user;
  }
}
