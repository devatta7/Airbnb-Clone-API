import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { CityRepository } from '../repository/city.repository';
import { CityResponseDto } from '../dtos/city-response.dto';
import { FindAllCitiesDto } from '../dtos/find-all-cities.dto';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { City } from '../schema/city.schema';

@Injectable()
export class FindAllCitiesUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    const matchQuery: QueryFilter<City> = {
      isDeleted: false,
    };

    if (query.name) {
      matchQuery.name = {
        $regex: query.name,
        $options: 'i',
      };
    }

    if (query.country) {
      matchQuery.country = query.country;
    }

    const result = await this.cityRepository.findPaginated(matchQuery, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort: { createdAt: -1 },
      populate: [{ path: 'country', select: 'name countryCode' }],
    });

    const data = plainToInstance(
      CityResponseDto,
      result.data.map((city) => city.toObject()),
    );

    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
