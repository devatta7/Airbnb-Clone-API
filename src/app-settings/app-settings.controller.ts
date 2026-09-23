import { Body, Controller, Get, Patch } from '@nestjs/common';

import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsService } from './app-settings.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import {
  SwaggerFindAppSettings,
  SwaggerUpsertAppSettings,
} from './swagger/api-app-settings.swagger';

@ApiTags(ApiTag.APP_SETTINGS)
@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Get()
  @SwaggerFindAppSettings()
  findOne(): Promise<AppSettingsResponseDto> {
    return this.appSettingsService.findOne();
  }

  @Patch()
  @SwaggerUpsertAppSettings()
  upsert(@Body() body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    return this.appSettingsService.upsert(body);
  }
}
