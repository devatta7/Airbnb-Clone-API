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
import { FindAllCountriesDto } from './dtos/find-all-countries.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import { Public } from '../auth/decorators/public.decorator';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../auth/roles/roles.constant';
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
  @RolesAllowed(Roles.systemAdmin)
  @SwaggerCreateCountry()
  async create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.create(body);
  }

  @Get()
  @Public()
  @SwaggerFindAllCountries()
  async findAll(
    @Query() query: FindAllCountriesDto,
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
  @RolesAllowed(Roles.systemAdmin)
  @SwaggerUpdateCountry()
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.update(id, body);
  }

  @Delete(':id')
  @RolesAllowed(Roles.systemAdmin)
  @SwaggerDeleteCountry()
  @HttpCode(HttpStatus.NO_CONTENT)
  softDeleteCountry(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.countriesService.softDelete(id);
  }
}
