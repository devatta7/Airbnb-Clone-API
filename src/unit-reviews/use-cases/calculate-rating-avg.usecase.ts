import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { CalculateRatingAvgAndCountDto } from '../dtos/calculate-rating-avg-and-count.dto';
import { UnitReviewRepository } from '../repository/unit-review.repository';

@Injectable()
export class CalculateRatingAvgUseCase {
  constructor(private readonly unitReviewRepository: UnitReviewRepository) {}

  async execute(
    unitId: string,
    session?: ClientSession,
  ): Promise<CalculateRatingAvgAndCountDto> {
    const [result] =
      await this.unitReviewRepository.aggregate<CalculateRatingAvgAndCountDto>(
        [
          { $match: { unit: unitId } },
          {
            $group: {
              _id: '$unit',
              ratingAvg: { $avg: '$rating' },
              ratingCount: { $sum: 1 },
            },
          },
          { $project: { _id: 0, ratingAvg: 1, ratingCount: 1 } },
        ],
        { session },
      );
    return result ?? { ratingAvg: 0, ratingCount: 0 };
  }
}
