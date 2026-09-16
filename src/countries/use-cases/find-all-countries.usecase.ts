import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { Country } from '../schema/country.schema';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { FindAllDto } from '../dtos/find-all.dto';

@Injectable()
export class FindAllCountriesUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(query: FindAllDto): Promise<CountryResponseDto[]> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const matchQuery: QueryFilter<Country> = { IsDeleted: false };

    if (query.name) {
      matchQuery['name'] = { $regex: query.name, $options: 'i' };
    }

    if (query.countryCode) {
      matchQuery['countryCode'] = query.countryCode;
    }

    const countries = await this.countryModel
      .find(matchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return plainToInstance(
      CountryResponseDto,
      countries.map((country) => country.toObject()),
    );
  }
}
