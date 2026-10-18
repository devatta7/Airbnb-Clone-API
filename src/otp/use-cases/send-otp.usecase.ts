import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { UsersService } from '../../users/users.service';
import { MailService } from '../../mail/mail.service';
import { OtpRepository } from '../repository/otp.repository';

const OTP_EXPIRATION_MINUTES = 10;

@Injectable()
export class SendOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async execute(email: string): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();
    await this.validateBeforeSendOtp(normalizedEmail);

    const code = randomInt(100_000, 1_000_000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60_000);

    await this.otpRepository.findOneAndUpdate(
      { email: normalizedEmail },
      { code, expiresAt, isVerified: false },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    await this.mailService.sendEmail({
      to: normalizedEmail,
      subject: 'OTP Verification',
      text: `Your verification code is ${code}. It expires in ${OTP_EXPIRATION_MINUTES} minutes.`,
    });
  }

  private async validateBeforeSendOtp(email: string): Promise<void> {
    const verifiedOtp = await this.otpRepository.findOne({
      email,
      isVerified: true,
    });

    if (verifiedOtp && (await this.usersService.findOne({ email }))) {
      throw new BadRequestException('Email already verified');
    }
  }
}
