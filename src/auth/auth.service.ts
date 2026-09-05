import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(body: RegisterDto) {
    const user = await this.userService.create(body);
  }
}
