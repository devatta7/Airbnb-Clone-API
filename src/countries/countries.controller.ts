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

import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { FindAllDto } from './dtos/find-all.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.create(body);
  }

  @Get()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.findAll(query);
  }

  @Get(':id')
  async getCountryById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CountryResponseDto> {
    return this.countriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDeleteCountry(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.countriesService.softDelete(id);
  }
}
