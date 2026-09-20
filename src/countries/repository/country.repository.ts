import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Country } from '../schema/country.schema';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(@InjectModel(ModelNames.COUNTRIES) countryModel: Model<Country>) {
    super(countryModel);
  }
}
