import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { AppSettings } from '../schema/app-settings.schema';

@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSettings> {
  constructor(
    @InjectModel(ModelNames.APP_SETTINGS)
    private readonly appSettingsModel: Model<AppSettings>,
  ) {
    super(appSettingsModel);
  }
}
