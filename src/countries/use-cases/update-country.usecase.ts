import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CountryResponseDto } from '../dtos/country-response.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { CountryRepository } from '../repositery/country.repositry';

@Injectable()
export class UpdateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    id: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    if (body.name) {
      const existingCountry = await this.countryRepository.findOne({
        _id: { $ne: id },
        name: body.name,
        IsDeleted: false,
      });

      if (existingCountry) {
        throw new ConflictException('Country with this name already exists');
      }
    }

    const country = await this.countryRepository.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      body,
      { runValidators: true },
    );

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
