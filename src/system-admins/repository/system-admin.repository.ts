import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { SystemAdmin } from '../schema/system-admin.schema';

@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin> {
  constructor(
    @InjectModel(ModelNames.SYSTEM_ADMINS)
    private readonly systemAdminModel: Model<SystemAdmin>,
  ) {
    super(systemAdminModel);
  }
}
