import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { Country } from '../schema/country.schema';
import { CountryRepository } from '../repositery/country.repositry';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { FindAllDto } from '../dtos/find-all.dto';
import { PaginatedResult } from '../../common/data-access/base-repository';

@Injectable()
export class FindAllCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    const matchQuery: QueryFilter<Country> = {
      isDeleted: false,
    };

    if (query.name) {
      matchQuery.name = {
        $regex: query.name,
        $options: 'i',
      };
    }

    if (query.countryCode) {
      matchQuery.countryCode = query.countryCode;
    }

    const result = await this.countryRepository.findPaginated(matchQuery, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort: { createdAt: -1 },
    });

    const data = plainToInstance(
      CountryResponseDto,
      result.data.map((country) => country.toObject()),
    );

    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
