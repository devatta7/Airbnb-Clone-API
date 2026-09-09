import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokenUseCase } from './generateTokens.usecase';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UsersService,
    private readonly generateToken: GenerateTokenUseCase,
  ) {}

  async execute(body: RegisterDto) {
    const user = await this.userService.create(body);
    return await this.generateToken.execute(user._id.toString());
  }
}
