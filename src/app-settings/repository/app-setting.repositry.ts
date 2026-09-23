import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { AppSetting } from '../schema/app-setting.schema';

@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSetting> {
  constructor(
    @InjectModel(ModelNames.APP_SETTINGS)
    private readonly appSettingModel: Model<AppSetting>,
  ) {
    super(appSettingModel);
  }
}
