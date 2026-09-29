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
import { CurrentAccount } from './decorators/current-account.decorators';
import * as principalInterface from './interfaces/principal.interface';
import { SwaggerCurrentAccount } from './swagger/api-auth.swagger';

@ApiTags(ApiTag.AUTH)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  @SwaggerRegister()
  register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }

  @Post('/login')
  @Public()
  @SwaggerLogin()
  login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(body);
  }

  @Post('/refresh-token')
  @Public()
  @SwaggerRefreshToken()
  refreshToken(@Body() body: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(body);
  }

  @Get('/me')
  @SwaggerCurrentAccount()
  getMe(@CurrentAccount() account: principalInterface.IPrincipal) {
    return account;
  }
}
