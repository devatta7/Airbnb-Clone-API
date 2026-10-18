import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UnitReviewRepository } from './repository/unit-review.repository';
import { UnitReviewSchema } from './schema/unit-review.schema';
import { CalculateRatingAvgUseCase } from './use-cases/calculate-rating-avg.usecase';
import { CreateUnitReviewUseCase } from './use-cases/create-unit-review.usecase';
import { FindUnitReviewsUseCase } from './use-cases/find-unit-reviews.usecase';
import { UnitReviewsService } from './unit-reviews.service';
import { UnitReviewsController } from './unit-reviews.controller';
import { UnitsModule } from '../units/units.module';

@Module({
  imports: [
    UnitsModule,
    MongooseModule.forFeature([
      { name: ModelNames.UNIT_REVIEWS, schema: UnitReviewSchema },
    ]),
  ],
  providers: [
    UnitReviewRepository,
    CreateUnitReviewUseCase,
    CalculateRatingAvgUseCase,
    FindUnitReviewsUseCase,
    UnitReviewsService,
  ],
  controllers: [UnitReviewsController],
  exports: [UnitReviewsService, UnitReviewRepository],
})
export class UnitReviewsModule {}
