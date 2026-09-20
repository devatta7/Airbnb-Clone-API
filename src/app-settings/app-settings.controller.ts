import { Body, Controller, Get, Patch } from '@nestjs/common';

import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsService } from './app-settings.service';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Get()
  findOne(): Promise<AppSettingsResponseDto> {
    return this.appSettingsService.findOne();
  }

  @Patch()
  upsert(@Body() body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    return this.appSettingsService.upsert(body);
  }
}
