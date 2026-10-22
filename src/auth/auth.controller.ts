import { Body, Controller, Get, Post } from '@nestjs/common';

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
import { AuthResponseDto } from './dtos/auth-response.dto';
import { Public } from './decorators/public.decorator';
import { CurrentAccount } from './decorators/current-account.decorator';
import type { IPrincipal } from './interfaces/principal.interface';
import { SwaggerCurrentAccount } from './swagger/api-auth.swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags(ApiTag.AUTH)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @SwaggerRegister()
  register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }

  @Post('/login')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @SwaggerLogin()
  login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(body);
  }

  @Post('/refresh-token')
  @Public()
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @SwaggerRefreshToken()
  refreshToken(@Body() body: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(body);
  }

  @Get('/me')
  @SwaggerCurrentAccount()
  getMe(@CurrentAccount() account: IPrincipal) {
    return account;
  }
}
