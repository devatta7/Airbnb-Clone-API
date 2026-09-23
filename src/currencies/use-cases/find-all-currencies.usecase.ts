import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryFilter } from 'mongoose';

import { PaginatedResult } from '../../common/data-access/base-repository';
import { FindAllCurrenciesDto } from '../dtos/find-all-currencies.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CurrencyRepository } from '../repository/currency.repository';
import { Currency } from '../schema/currency.schema';

@Injectable()
export class FindAllCurrenciesUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    const matchQuery: QueryFilter<Currency> = { isDeleted: false };

    if (query.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }

    if (query.currencyCode) {
      matchQuery.currencyCode = query.currencyCode;
    }

    const result = await this.currencyRepository.findPaginated(matchQuery, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort: { createdAt: -1 },
    });

    const data = plainToInstance(
      CurrencyResponseDto,
      result.data.map((currency) => currency.toObject()),
    );

    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
