import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/api/domain/services/user.service';
import { CreateUserDto } from './dto/users/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.registerUser(createUserDto);

    return {
      message: 'User created successfully',
      user,
    };
  }
}
