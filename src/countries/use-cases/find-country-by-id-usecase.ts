import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { CountryResponseDto } from '../dtos/country-response.dto';
import { Country } from '../schema/country.schema';

@Injectable()
export class FindCountryByIdUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.countryModel.findOne({
      _id: id,
      IsDeleted: false,
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
