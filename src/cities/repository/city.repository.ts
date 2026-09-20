import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../common/data-access/base-repository';
import { City } from '../schema/city.schema';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';

export class CityRepository extends BaseRepository<City> {
  constructor(
    @InjectModel(ModelNames.CITIES)
    private readonly cityModel: Model<City>,
  ) {
    super(cityModel);
  }
}
