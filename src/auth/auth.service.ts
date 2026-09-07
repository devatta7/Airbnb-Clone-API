import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({
      sub: userId,
    });

    return accessToken;
  }

  async register(body: RegisterDto) {
    const user = await this.userService.create(body);

    const accessToken = await this.generateToken(user._id.toString());
    return {
      accessToken,
    };
  }
}
