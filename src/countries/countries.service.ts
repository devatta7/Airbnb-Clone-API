import { Injectable } from '@nestjs/common';

import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { FindCountryByIdUseCase } from './use-cases/find-country-by-id-usecase';
import { FindAllCountriesUseCase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';

import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';

@Injectable()
export class CountriesService {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly findCountryByIdUseCase: FindCountryByIdUseCase,
    private readonly findAllCountriesUseCase: FindAllCountriesUseCase,
    private readonly softDeleteCountryUseCase: SoftDeleteCountryUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
  ) {}

  async create(body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.createCountryUseCase.execute(body);
  }

  async findOne(id: string): Promise<CountryResponseDto> {
    return this.findCountryByIdUseCase.execute(id);
  }

  async findAll(query: FindAllDto): Promise<CountryResponseDto[]> {
    return this.findAllCountriesUseCase.execute(query);
  }

  async softDelete(id: string): Promise<void> {
    return this.softDeleteCountryUseCase.execute(id);
  }

  async update(
    id: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.updateCountryUseCase.execute(id, body);
  }
}
