import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';
import { AppSettingsRepository } from '../repository/app-setting.repositry';

@Injectable()
export class FindAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(): Promise<AppSettingsResponseDto> {
    const appSettings = await this.appSettingsRepository.findOne({});

    if (!appSettings) {
      throw new NotFoundException('App settings not found');
    }

    return plainToInstance(AppSettingsResponseDto, appSettings.toObject());
  }
}
