import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Otp } from '../schema/otp.schema';

@Injectable()
export class OtpRepository extends BaseRepository<Otp> {
  constructor(@InjectModel(ModelNames.OTPS) otpModel: Model<Otp>) {
    super(otpModel);
  }
}
