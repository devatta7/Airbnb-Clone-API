import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { CountryResponseDto } from '../dtos/country-response.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { Country } from '../schema/country.schema';

@Injectable()
export class UpdateCountryUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(
    id: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    if (body.name) {
      const existingCountry = await this.countryModel.findOne({
        _id: { $ne: id },
        name: body.name,
        IsDeleted: false,
      });

      if (existingCountry) {
        throw new ConflictException('Country with this name already exists');
      }
    }

    const country = await this.countryModel.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      body,
      { new: true, runValidators: true },
    );

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
