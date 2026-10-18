import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SendOtpDto } from '../dtos/send-otp.dto';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';

export function SwaggerSendOtp() {
  return applyDecorators(
    ApiOperation({ summary: 'Send an email verification code' }),
    ApiBody({ type: SendOtpDto }),
    ApiOkResponse({
      description: 'OTP email sent successfully',
      schema: { example: { message: 'OTP sent successfully.' } },
    }),
    ApiBadRequestResponse({ description: 'Invalid email address' }),
  );
}

export function SwaggerVerifyOtp() {
  return applyDecorators(
    ApiOperation({ summary: 'Verify an email verification code' }),
    ApiBody({ type: VerifyOtpDto }),
    ApiOkResponse({
      description: 'OTP verified successfully',
      schema: { example: { message: 'OTP verified successfully.' } },
    }),
    ApiBadRequestResponse({ description: 'OTP is invalid or expired' }),
  );
}
