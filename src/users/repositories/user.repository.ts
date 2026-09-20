import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(ModelNames.USERS) userModel: Model<User>) {
    super(userModel);
  }
}
