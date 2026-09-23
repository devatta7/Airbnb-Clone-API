import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CityResponseDto } from '../dtos/city-response.dto';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class FindCityByIdUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(id: string): Promise<CityResponseDto> {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return plainToInstance(CityResponseDto, city.toObject());
  }
}
