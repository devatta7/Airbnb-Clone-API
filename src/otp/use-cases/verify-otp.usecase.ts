import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { OtpRepository } from '../repository/otp.repository';
import { FindOtpRawUseCase } from './find-otp-raw.usecase';
import { OtpRawResponseDto } from '../dtos/otp-raw-response.dto';

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly findOtpRawUseCase: FindOtpRawUseCase,
  ) {}

  async execute(body: VerifyOtpDto): Promise<void> {
    const email = body.email.trim().toLowerCase();
    const otp = await this.findOtpRawUseCase.execute({ email });
    this.validateOtpBeforeVerify(otp, body.code);

    await this.otpRepository.findOneAndUpdate(
      { email, code: body.code, isVerified: false },
      { isVerified: true },
    );
  }

  private validateOtpBeforeVerify(
    otp: OtpRawResponseDto | null,
    code: string,
  ): void {
    if (!otp) throw new BadRequestException('Invalid OTP');
    if (otp.isVerified) throw new BadRequestException('OTP already verified');
    if (otp.code !== code) throw new BadRequestException('Invalid OTP');
    if (Date.now() > otp.expiresAt.getTime()) {
      throw new BadRequestException('OTP expired');
    }
  }
}
