import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { AppSettingsRepository } from '../repository/app-setting.repositry';
import { UpsertAppSettingsDto } from '../dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';

@Injectable()
export class UpsertAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    const appSetting = await this.appSettingsRepository.findOneAndUpdate(
      {},
      body,
      {
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    if (!appSetting) {
      throw new InternalServerErrorException('Unable to save app settings');
    }

    return plainToInstance(AppSettingsResponseDto, appSetting.toObject());
  }
}
