import { Injectable } from '@nestjs/common';
import { SendForgetPasswordOtpDto } from './dtos/send-forget-password-otp.dto';
import { VerifyForgetPasswordOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SendForgetPasswordOtpUseCase } from './use-cases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUseCase } from './use-cases/verify-forget-password-otp.usecase';
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private readonly sendOtpUseCase: SendForgetPasswordOtpUseCase,
    private readonly verifyOtpUseCase: VerifyForgetPasswordOtpUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  async sendForgetPasswordOtp(body: SendForgetPasswordOtpDto): Promise<void> {
    await this.sendOtpUseCase.execute(body.email);
  }

  async verifyForgetPasswordOtp(
    body: VerifyForgetPasswordOtpDto,
  ): Promise<void> {
    await this.verifyOtpUseCase.execute(body);
  }

  async resetPassword(body: ResetPasswordDto): Promise<void> {
    await this.resetPasswordUseCase.execute(body);
  }
}
