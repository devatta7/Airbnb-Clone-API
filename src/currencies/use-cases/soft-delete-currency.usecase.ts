import { Injectable, NotFoundException } from '@nestjs/common';

import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class SoftDeleteCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<void> {
    const currency = await this.currencyRepository.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }
  }
}
