import { Injectable, NotFoundException } from '@nestjs/common';

import { CityRepository } from '../repository/city.repository';

@Injectable()
export class SoftDeleteCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(id: string): Promise<void> {
    const city = await this.cityRepository.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );

    if (!city) {
      throw new NotFoundException('City not found');
    }
  }
}
