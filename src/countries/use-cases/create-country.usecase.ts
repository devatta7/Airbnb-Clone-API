import { ConflictException, Injectable } from '@nestjs/common';

import { CountryRepository } from '../repositery/country.repositry';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existingCountry = await this.countryRepository.findOne({
      name: body.name,
      IsDeleted: false,
    });

    if (existingCountry) {
      throw new ConflictException('Country with this name already exists');
    }

    const country = await this.countryRepository.create(body);
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
