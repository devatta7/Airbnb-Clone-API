import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { CityResponseDto } from '../dtos/city-response.dto';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class UpdateCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(id: string, body: UpdateCityDto): Promise<CityResponseDto> {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const cityName = body.name ?? city.name;

    const existingCity = await this.cityRepository.findOne({
      _id: { $ne: id },
      name: cityName,
      country: city.country,
      isDeleted: false,
    });

    if (existingCity) {
      throw new ConflictException(
        `City with name ${cityName} already exists in the specified country.`,
      );
    }

    const updatedCity = await this.cityRepository.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      body,
      {
        runValidators: true,
      },
    );

    if (!updatedCity) {
      throw new NotFoundException('City not found');
    }

    return plainToInstance(CityResponseDto, updatedCity.toObject());
  }
}
