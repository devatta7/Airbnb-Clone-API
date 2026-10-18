import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { UnitReview } from '../schema/unit-review.schema';

@Injectable()
export class UnitReviewRepository extends BaseRepository<UnitReview> {
  constructor(@InjectModel(ModelNames.UNIT_REVIEWS) model: Model<UnitReview>) {
    super(model);
  }
}
