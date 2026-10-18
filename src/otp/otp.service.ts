import { BadRequestException, Injectable } from '@nestjs/common';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { SendOtpUseCase } from './use-cases/send-otp.usecase';
import { VerifyOtpUseCase } from './use-cases/verify-otp.usecase';
import { OtpRepository } from './repository/otp.repository';

@Injectable()
export class OtpService {
  constructor(
    private readonly sendOtpUseCase: SendOtpUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
    private readonly otpRepository: OtpRepository,
  ) {}

  async send(body: SendOtpDto): Promise<void> {
    await this.sendOtpUseCase.execute(body.email);
  }

  async verify(body: VerifyOtpDto): Promise<void> {
    await this.verifyOtpUseCase.execute(body);
  }

  async assertEmailVerified(email: string): Promise<void> {
    const verifiedOtp = await this.otpRepository.findOne({
      email: email.trim().toLowerCase(),
      isVerified: true,
      expiresAt: { $gt: new Date() },
    });

    if (!verifiedOtp) {
      throw new BadRequestException(
        'Verify your email with a valid OTP before registering',
      );
    }
  }

  async consumeVerifiedOtp(email: string): Promise<void> {
    await this.otpRepository.findOneAndDelete({
      email: email.trim().toLowerCase(),
      isVerified: true,
      expiresAt: { $gt: new Date() },
    });
  }
}
