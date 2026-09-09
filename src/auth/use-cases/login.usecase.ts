import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { GenerateTokenUseCase } from './generateTokens.usecase';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly generateToken: GenerateTokenUseCase,
    private readonly userService: UsersService,
  ) {}

  async execute(body: LoginDto) {
    const user = await this.userService.findOne({
      email: body.email,
    });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    return await this.generateToken.execute(user._id.toString());
  }
}
