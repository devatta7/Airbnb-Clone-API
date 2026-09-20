import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { CreateCityDto } from '../dtos/create-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';

import { CityRepository } from '../repository/city.repository';
import { CountryRepository } from '../../countries/repositery/country.repositry';

@Injectable()
export class CreateCitiesUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  async execute(createCityDto: CreateCityDto): Promise<CityResponseDto> {
    const existingCountry = await this.countryRepository.findOne({
      _id: createCityDto.country,
      isDeleted: false,
    });

    if (!existingCountry) {
      throw new NotFoundException(`Country does not exist.`);
    }

    const existingCity = await this.cityRepository.findOne({
      name: createCityDto.name,
      country: createCityDto.country,
      isDeleted: false,
    });

    if (existingCity) {
      throw new ConflictException(
        `City with name ${createCityDto.name} already exists in the specified country.`,
      );
    }

    const city = await this.cityRepository.create(createCityDto);

    return plainToInstance(CityResponseDto, city.toObject());
  }
}
