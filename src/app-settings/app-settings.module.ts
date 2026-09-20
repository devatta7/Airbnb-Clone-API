import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { AppSettingsRepository } from './repository/app-setting.repositry';
import { AppSettingSchema } from './schema/app-setting.schema';
import { ModelNames } from '../common/data-access/model-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.APP_SETTINGS, schema: AppSettingSchema },
    ]),
  ],
  providers: [
    AppSettingsService,
    AppSettingsRepository,
    FindAppSettingsUseCase,
    UpsertAppSettingsUseCase,
  ],
  controllers: [AppSettingsController],
})
export class AppSettingsModule {}
