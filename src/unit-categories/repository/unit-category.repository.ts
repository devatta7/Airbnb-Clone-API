import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { UnitCategory } from '../schema/unit-category.schema';

@Injectable()
export class UnitCategoryRepository extends BaseRepository<UnitCategory> {
  constructor(
    @InjectModel(ModelNames.UNIT_CATEGORIES)
    unitCategoryModel: Model<UnitCategory>,
  ) {
    super(unitCategoryModel);
  }
}
