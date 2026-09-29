import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';
import {
  SwaggerCreateCity,
  SwaggerDeleteCity,
  SwaggerFindAllCities,
  SwaggerFindCity,
  SwaggerUpdateCity,
} from './swagger/api-cities.swagger';

@ApiTags(ApiTag.CITIES)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerCreateCity()
  async create(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return this.citiesService.create(body);
  }

  @Get()
  @Public()
  @SwaggerFindAllCities()
  async findAll(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.citiesService.findAll(query);
  }

  @Get(':id')
  @Public()
  @SwaggerFindCity()
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CityResponseDto> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerUpdateCity()
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.citiesService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerDeleteCity()
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.citiesService.softDelete(id);
  }
}
