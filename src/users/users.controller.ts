import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto){
    return this.usersService.createUser(user);
  }

  @Post('login')
  login(@Body() user: CreateUserDto){
    return this.usersService.login(user);
  }

}
