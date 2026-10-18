import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { Otp } from '../schema/otp.schema';
import { OtpRepository } from '../repository/otp.repository';
import { OtpRawResponseDto } from '../dtos/otp-raw-response.dto';

@Injectable()
export class FindOtpRawUseCase {
  constructor(private readonly otpRepository: OtpRepository) {}

  async execute(query: QueryFilter<Otp>): Promise<OtpRawResponseDto | null> {
    const otp = await this.otpRepository.findOne(query);
    return otp ? plainToInstance(OtpRawResponseDto, otp.toObject()) : null;
  }
}
