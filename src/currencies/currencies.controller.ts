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

import { PaginatedResult } from '../common/data-access/base-repository';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import {
  SwaggerCreateCurrency,
  SwaggerDeleteCurrency,
  SwaggerFindAllCurrencies,
  SwaggerFindCurrency,
  SwaggerUpdateCurrency,
} from './swagger/api-currencies.swagger';

@ApiTags(ApiTag.CURRENCIES)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  @SwaggerCreateCurrency()
  async create(@Body() body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.currenciesService.create(body);
  }

  @Get()
  @SwaggerFindAllCurrencies()
  async findAll(
    @Query() query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.currenciesService.findAll(query);
  }

  @Get(':id')
  @SwaggerFindCurrency()
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.findOne(id);
  }

  @Patch(':id')
  @SwaggerUpdateCurrency()
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.update(id, body);
  }

  @Delete(':id')
  @SwaggerDeleteCurrency()
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.currenciesService.softDelete(id);
  }
}
