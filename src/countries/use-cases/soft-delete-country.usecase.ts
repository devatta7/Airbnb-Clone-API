import { Injectable, NotFoundException } from '@nestjs/common';

import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<void> {
    const country = await this.countryRepository.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      { IsDeleted: true },
      {},
    );

    if (!country) {
      throw new NotFoundException('Country not found');
    }
  }
}
