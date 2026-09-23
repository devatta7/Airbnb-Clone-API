import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class UpdateCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    id: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    if (body.currencyCode) {
      const existingCurrency = await this.currencyRepository.findOne({
        _id: { $ne: id },
        currencyCode: body.currencyCode,
        isDeleted: false,
      });

      if (existingCurrency) {
        throw new ConflictException('Currency with this code already exists');
      }
    }

    const currency = await this.currencyRepository.findOneAndUpdate(
      { _id: id, isDeleted: false },
      body,
      { runValidators: true },
    );

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
