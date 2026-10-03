import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Unit } from '../schema/unit.schema';

@Injectable()
export class UnitRepository extends BaseRepository<Unit> {
  constructor(@InjectModel(ModelNames.UNITS) unitModel: Model<Unit>) {
    super(unitModel);
  }
}
