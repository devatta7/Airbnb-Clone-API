import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { PaginatedResult } from '../../common/data-access/base-repository';
import { Unit } from '../schema/unit.schema';
import { UnitRepository } from '../repository/unit.repository';
import { FindAllUnitsDto } from '../dtos/find-all-units.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';

@Injectable()
export class FindAllUnitsUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(
    query: FindAllUnitsDto,
    userId?: string,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    const matchQuery: QueryFilter<Unit> = { isDeleted: { $ne: true } };

    if (userId) matchQuery.user = userId;

    if (query.title) {
      const escapedTitle = query.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      matchQuery.title = { $regex: escapedTitle, $options: 'i' };
    }

    if (query.country) matchQuery.country = query.country;
    if (query.city) matchQuery.city = query.city;
    if (query.unitCategory) matchQuery.unitCategory = query.unitCategory;
    if (query.availability !== undefined) {
      matchQuery.availability = query.availability === 'true';
    }

    const costPerDay: { $gte?: number; $lte?: number } = {};
    if (query.minCostPerDay !== undefined) {
      costPerDay.$gte = Number(query.minCostPerDay);
    }
    if (query.maxCostPerDay !== undefined) {
      costPerDay.$lte = Number(query.maxCostPerDay);
    }
    if (Object.keys(costPerDay).length) matchQuery.costPerDay = costPerDay;

    const result = await this.unitRepository.findPaginated(matchQuery, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sort: { createdAt: -1 },
    });

    const data = plainToInstance(
      UnitResponseDto,
      result.data.map((unit) => unit.toObject()),
    );

    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
