import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { MailService } from '../../mail/mail.service';
import { UsersService } from '../../users/users.service';
import { ForgetPasswordRepository } from '../repository/forget-password.repository';

const OTP_EXPIRATION_MINUTES = 10;

@Injectable()
export class SendForgetPasswordOtpUseCase {
  constructor(
    private readonly forgetPasswordRepository: ForgetPasswordRepository,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async execute(email: string): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.usersService.findOne({ email: normalizedEmail });

    // Keep the response the same for existing and unknown accounts.
    if (!user) return;

    const code = randomInt(100_000, 1_000_000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60_000);

    await this.forgetPasswordRepository.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { code, expiresAt, isVerified: false } },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    await this.mailService.sendEmail({
      to: normalizedEmail,
      subject: 'Password reset code',
      text: `Your password reset code is ${code}. It expires in ${OTP_EXPIRATION_MINUTES} minutes.`,
    });
  }
}
