import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTag } from '../common/swagger/constant';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { OtpService } from './otp.service';

@ApiTags(ApiTag.OTP)
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send an email verification code' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OTP email sent.' })
  async send(@Body() body: SendOtpDto): Promise<{ message: string }> {
    await this.otpService.send(body);
    return { message: 'OTP sent successfully.' };
  }

  @Post('verify')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify an email verification code' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OTP verified.' })
  async verify(@Body() body: VerifyOtpDto): Promise<{ message: string }> {
    await this.otpService.verify(body);
    return { message: 'OTP verified successfully.' };
  }
}
