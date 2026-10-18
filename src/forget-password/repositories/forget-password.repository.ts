import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { ForgetPassword } from '../schema/forget-password.schema';

@Injectable()
export class ForgetPasswordRepository extends BaseRepository<ForgetPassword> {
  constructor(
    @InjectModel(ModelNames.FORGET_PASSWORDS)
    forgetPasswordModel: Model<ForgetPassword>,
  ) {
    super(forgetPasswordModel);
  }
}
