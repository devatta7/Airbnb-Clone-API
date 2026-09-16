import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Country } from '../schema/country.schema';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string): Promise<void> {
    const country = await this.countryModel.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      { IsDeleted: true },
      { new: true },
    );

    if (!country) {
      throw new NotFoundException('Country not found');
    }
  }
}
