import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ForgetPasswordRepository } from '../repository/forget-password.repository';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ResetPasswordUseCase {
  private readonly logger = new Logger(ResetPasswordUseCase.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly forgetPasswordRepository: ForgetPasswordRepository,
    private readonly usersService: UsersService,
  ) {}

  async execute(body: ResetPasswordDto): Promise<void> {
    const email = body.email.trim().toLowerCase();
    const resetRecord = await this.forgetPasswordRepository.findOne({ email });

    if (!resetRecord) throw new BadRequestException('Invalid or expired reset request');
    if (!resetRecord.isVerified)
      throw new BadRequestException('Reset code has not been verified');
    if (resetRecord.expiresAt.getTime() <= Date.now()) {
      throw new BadRequestException('Reset code expired');
    }

    const passwordHash = await bcrypt.hash(body.newPassword, 10);
    const session = await this.connection.startSession();

    try {
      await session.withTransaction(async () => {
        const userUpdated = await this.usersService.updatePasswordByEmail(
          email,
          passwordHash,
          session,
        );
        if (!userUpdated) throw new BadRequestException('User not found');

        const consumedRequest =
          await this.forgetPasswordRepository.findOneAndDelete(
            {
              email,
              isVerified: true,
              expiresAt: { $gt: new Date() },
            },
            { session },
          );
        if (!consumedRequest) {
          throw new BadRequestException('Reset code expired or already used');
        }
      });
    } catch (error) {
      this.logger.error(
        'Failed to reset password',
        error instanceof Error ? error.stack : String(error),
      );
      if (error instanceof HttpException) throw error;
      throw new BadRequestException('Failed to reset password');
    } finally {
      await session.endSession();
    }
  }
}
