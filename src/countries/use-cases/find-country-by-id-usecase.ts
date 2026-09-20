import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CountryResponseDto } from '../dtos/country-response.dto';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class FindCountryByIdUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.countryRepository.findOne({
      _id: id,
      IsDeleted: false,
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
