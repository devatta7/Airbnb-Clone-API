import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import { SwaggerCreateUser } from './swagger/api-users.swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';

@ApiTags(ApiTag.USERS)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerCreateUser()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
