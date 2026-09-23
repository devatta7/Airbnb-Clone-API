import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryFilter } from 'mongoose';

import { PaginatedResult } from '../../common/data-access/base-repository';
import { FindAllUnitCategoriesDto } from '../dtos/find-all-unit-categories.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UnitCategoryRepository } from '../repository/unit-category.repository';
import { UnitCategory } from '../schema/unit-category.schema';

@Injectable()
export class FindAllUnitCategoriesUseCase {
  constructor(private readonly repository: UnitCategoryRepository) {}

  async execute(
    query: FindAllUnitCategoriesDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    const matchQuery: QueryFilter<UnitCategory> = { isDeleted: false };

    if (query.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }

    const result = await this.repository.findPaginated(matchQuery, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort: { createdAt: -1 },
    });

    const data = plainToInstance(
      UnitCategoryResponseDto,
      result.data.map((category) => category.toObject()),
    );

    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
