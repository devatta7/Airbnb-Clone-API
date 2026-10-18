import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTag } from '../common/swagger/constant';
import { SendForgetPasswordOtpDto } from './dtos/send-forget-password-otp.dto';
import { VerifyForgetPasswordOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ForgetPasswordService } from './forget-password.service';
import {
  ResetPasswordSwagger,
  SendForgetPasswordOtpSwagger,
  VerifyForgetPasswordOtpSwagger,
} from './swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags(ApiTag.FORGET_PASSWORD)
@Controller('forget-password')
@Public()
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post('send')
  @Throttle({ default: { limit: 3, ttl: 10 * 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @SendForgetPasswordOtpSwagger()
  async sendForgetPasswordOtp(
    @Body() body: SendForgetPasswordOtpDto,
  ): Promise<void> {
    await this.forgetPasswordService.sendForgetPasswordOtp(body);
  }

  @Post('verify')
  @Throttle({ default: { limit: 5, ttl: 10 * 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @VerifyForgetPasswordOtpSwagger()
  async verifyForgetPasswordOtp(
    @Body() body: VerifyForgetPasswordOtpDto,
  ): Promise<void> {
    await this.forgetPasswordService.verifyForgetPasswordOtp(body);
  }

  @Post('reset')
  @Throttle({ default: { limit: 5, ttl: 10 * 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResetPasswordSwagger()
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    await this.forgetPasswordService.resetPassword(body);
  }
}
