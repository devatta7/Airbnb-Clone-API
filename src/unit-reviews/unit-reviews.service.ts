import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { CalculateRatingAvgAndCountDto } from './dtos/calculate-rating-avg-and-count.dto';
import { CreateUnitReviewDto } from './dtos/create-unit-review.dto';
import { FindUnitReviewResponseDto } from './dtos/find-unit-review-response.dto';
import { FindUnitReviewsDto } from './dtos/find-unit-reviews.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { CalculateRatingAvgUseCase } from './use-cases/calculate-rating-avg.usecase';
import { CreateUnitReviewUseCase } from './use-cases/create-unit-review.usecase';
import { FindUnitReviewsUseCase } from './use-cases/find-unit-reviews.usecase';

@Injectable()
export class UnitReviewsService {
  constructor(
    private readonly createUseCase: CreateUnitReviewUseCase,
    private readonly calculateUseCase: CalculateRatingAvgUseCase,
    private readonly findUseCase: FindUnitReviewsUseCase,
  ) {}

  createUnitReview(
    body: CreateUnitReviewDto,
    session?: ClientSession,
  ): Promise<void> {
    return this.createUseCase.execute(body, session);
  }

  calculateRatingAvg(
    unitId: string,
    session?: ClientSession,
  ): Promise<CalculateRatingAvgAndCountDto> {
    return this.calculateUseCase.execute(unitId, session);
  }

  findUnitReviews(
    query: FindUnitReviewsDto,
  ): Promise<PaginatedResult<FindUnitReviewResponseDto>> {
    return this.findUseCase.execute(query);
  }
}
