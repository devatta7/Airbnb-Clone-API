import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { FindUnitReviewResponseDto } from '../dtos/find-unit-review-response.dto';
import { FindUnitReviewsDto } from '../dtos/find-unit-reviews.dto';
import { UnitReviewRepository } from '../repository/unit-review.repository';
import { UnitRepository } from '../../units/repository/unit.repository';

@Injectable()
export class FindUnitReviewsUseCase {
  constructor(
    private readonly unitReviewRepository: UnitReviewRepository,
    private readonly unitRepository: UnitRepository,
  ) {}

  async execute(
    query: FindUnitReviewsDto,
  ): Promise<PaginatedResult<FindUnitReviewResponseDto>> {
    const unit = await this.unitRepository.findOne({
      _id: query.unit,
      isDeleted: { $ne: true },
    });
    if (!unit) throw new NotFoundException('Unit not found');

    const result = await this.unitReviewRepository.findPaginated(
      { unit: query.unit },
      {
        select: '-booking -unit -__v -updatedAt',
        page: query.page,
        limit: query.limit,
        ignoreLimit: query.ignoreLimit,
        lean: true,
        populate: [{ path: 'guest', select: 'name' }],
        sort: { createdAt: -1 },
      },
    );
    const data = plainToInstance(FindUnitReviewResponseDto, result.data);
    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
