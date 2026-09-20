import { Injectable } from '@nestjs/common';

import { PaginatedResult } from '../common/data-access/base-repository';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { FindAllCurrenciesUseCase } from './use-cases/find-all-currencies.usecase';
import { FindCurrencyByIdUseCase } from './use-cases/find-currency-by-id.usecase';
import { SoftDeleteCurrencyUseCase } from './use-cases/soft-delete-currency.usecase';
import { UpdateCurrencyUseCase } from './use-cases/update-currency.usecase';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly createCurrencyUseCase: CreateCurrencyUseCase,
    private readonly findCurrencyByIdUseCase: FindCurrencyByIdUseCase,
    private readonly findAllCurrenciesUseCase: FindAllCurrenciesUseCase,
    private readonly updateCurrencyUseCase: UpdateCurrencyUseCase,
    private readonly softDeleteCurrencyUseCase: SoftDeleteCurrencyUseCase,
  ) {}

  async create(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.createCurrencyUseCase.execute(body);
  }

  async findOne(id: string): Promise<CurrencyResponseDto> {
    return this.findCurrencyByIdUseCase.execute(id);
  }

  async findAll(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.findAllCurrenciesUseCase.execute(query);
  }

  async update(
    id: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.updateCurrencyUseCase.execute(id, body);
  }

  async softDelete(id: string): Promise<void> {
    return this.softDeleteCurrencyUseCase.execute(id);
  }
}
