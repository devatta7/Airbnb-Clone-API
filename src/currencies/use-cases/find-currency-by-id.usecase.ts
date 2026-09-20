import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class FindCurrencyByIdUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
