import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTag } from '../common/swagger/constant';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { OtpService } from './otp.service';
import { SwaggerSendOtp, SwaggerVerifyOtp } from './swagger/api-otp.swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags(ApiTag.OTP)
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @Public()
  @Throttle({ default: { limit: 3, ttl: 10 * 60_000 } })
  @HttpCode(HttpStatus.OK)
  @SwaggerSendOtp()
  async send(@Body() body: SendOtpDto): Promise<{ message: string }> {
    await this.otpService.send(body);
    return { message: 'OTP sent successfully.' };
  }

  @Post('verify')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 10 * 60_000 } })
  @HttpCode(HttpStatus.OK)
  @SwaggerVerifyOtp()
  async verify(@Body() body: VerifyOtpDto): Promise<{ message: string }> {
    await this.otpService.verify(body);
    return { message: 'OTP verified successfully.' };
  }
}
