import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SendForgetPasswordOtpDto } from '../dtos/send-forget-password-otp.dto';
import { VerifyForgetPasswordOtpDto } from '../dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

export function SendForgetPasswordOtpSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Send a password reset code to an email' }),
    ApiBody({ type: SendForgetPasswordOtpDto }),
    ApiNoContentResponse({ description: 'Request accepted.' }),
    ApiBadRequestResponse({ description: 'Invalid email address.' }),
  );
}

export function VerifyForgetPasswordOtpSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Verify a password reset code' }),
    ApiBody({ type: VerifyForgetPasswordOtpDto }),
    ApiNoContentResponse({ description: 'Code verified.' }),
    ApiBadRequestResponse({ description: 'Code is invalid or expired.' }),
  );
}

export function ResetPasswordSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Set a new password after code verification' }),
    ApiBody({ type: ResetPasswordDto }),
    ApiNoContentResponse({ description: 'Password reset successfully.' }),
    ApiBadRequestResponse({
      description: 'Reset code is missing, unverified, expired, or already used.',
    }),
  );
}
