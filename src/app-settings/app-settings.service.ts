import { Injectable } from '@nestjs/common';

import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings.usecase';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';

@Injectable()
export class AppSettingsService {
  constructor(
    private readonly findAppSettingsUseCase: FindAppSettingsUseCase,
    private readonly upsertAppSettingsUseCase: UpsertAppSettingsUseCase,
  ) {}

  findOne(): Promise<AppSettingsResponseDto> {
    return this.findAppSettingsUseCase.execute();
  }

  upsert(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    return this.upsertAppSettingsUseCase.execute(body);
  }
}
