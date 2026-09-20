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

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return this.citiesService.create(body);
  }

  @Get()
  async findAll(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.citiesService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CityResponseDto> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.citiesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.citiesService.softDelete(id);
  }
}
