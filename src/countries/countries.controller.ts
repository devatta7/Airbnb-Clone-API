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
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';
import {
  SwaggerCreateCountry,
  SwaggerDeleteCountry,
  SwaggerFindAllCountries,
  SwaggerFindCountry,
  SwaggerUpdateCountry,
} from './swagger/api-countries.swagger';

@ApiTags(ApiTag.COUNTRIES)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerCreateCountry()
  async create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.create(body);
  }

  @Get()
  @Public()
  @SwaggerFindAllCountries()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.findAll(query);
  }

  @Get(':id')
  @Public()
  @SwaggerFindCountry()
  async getCountryById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CountryResponseDto> {
    return this.countriesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerUpdateCountry()
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerDeleteCountry()
  @HttpCode(HttpStatus.NO_CONTENT)
  softDeleteCountry(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.countriesService.softDelete(id);
  }
}
