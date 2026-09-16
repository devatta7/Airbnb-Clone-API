import { ConflictException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schema/country.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCountryUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existingCountry = await this.countryModel.findOne({
      name: body.name,
      IsDeleted: false,
    });

    if (existingCountry) {
      throw new ConflictException('Country with this name already exists');
    }

    const country = await this.countryModel.create(body);
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
