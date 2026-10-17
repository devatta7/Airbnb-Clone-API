import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { CreateUnitReviewDto } from '../dtos/create-unit-review.dto';
import { UnitReviewRepository } from '../repository/unit-review.repository';

@Injectable()
export class CreateUnitReviewUseCase {
  constructor(private readonly unitReviewRepository: UnitReviewRepository) {}

  async execute(
    body: CreateUnitReviewDto,
    session?: ClientSession,
  ): Promise<void> {
    await this.unitReviewRepository.create(body, { session });
  }
}
