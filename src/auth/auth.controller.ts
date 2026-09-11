import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import {
  SwaggerLogin,
  SwaggerRefreshToken,
  SwaggerRegister,
} from './swagger/api-auth.swagger';

import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';

@ApiTags(ApiTag.AUTH)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @SwaggerRegister()
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @SwaggerLogin()
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/refresh-token')
  @SwaggerRefreshToken()
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }
}
