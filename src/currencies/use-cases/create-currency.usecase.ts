import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class CreateCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    const existingCurrency = await this.currencyRepository.findOne({
      currencyCode: body.currencyCode,
      isDeleted: false,
    });

    if (existingCurrency) {
      throw new ConflictException('Currency with this code already exists');
    }

    const currency = await this.currencyRepository.create(body);

    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
