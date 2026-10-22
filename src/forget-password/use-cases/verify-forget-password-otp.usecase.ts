import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyForgetPasswordOtpDto } from '../dtos/verify-forget-password-otp.dto';
import { ForgetPasswordRepository } from '../repository/forget-password.repository';

@Injectable()
export class VerifyForgetPasswordOtpUseCase {
  constructor(
    private readonly forgetPasswordRepository: ForgetPasswordRepository,
  ) {}

  async execute(body: VerifyForgetPasswordOtpDto): Promise<void> {
    const email = body.email.trim().toLowerCase();
    const record = await this.forgetPasswordRepository.findOne({ email });

    if (!record) throw new BadRequestException('Invalid OTP');
    if (record.isVerified)
      throw new BadRequestException('OTP already verified');
    if (record.code !== body.code) throw new BadRequestException('Invalid OTP');
    if (record.expiresAt.getTime() <= Date.now()) {
      throw new BadRequestException('OTP expired');
    }

    const updatedRecord = await this.forgetPasswordRepository.findOneAndUpdate(
      {
        email,
        code: body.code,
        isVerified: false,
        expiresAt: { $gt: new Date() },
      },
      { $set: { isVerified: true } },
    );

    if (!updatedRecord) throw new BadRequestException('Invalid OTP');
  }
}
