import { Injectable } from '@nestjs/common';

import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';

import { CreateCitiesUseCase } from './use-cases/create-cities.usecase';
import { FindAllCitiesUseCase } from './use-cases/find-all-cities.usecase';
import { SoftDeleteCityUseCase } from './use-cases/soft-delete-city.usecase';
import { UpdateCityUseCase } from './use-cases/update-city.usecase';
import { FindCityByIdUseCase } from './use-cases/find-city-by-id.usecase';

import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { PaginatedResult } from '../common/data-access/base-repository';

@Injectable()
export class CitiesService {
  constructor(
    private readonly createCitiesUseCase: CreateCitiesUseCase,
    private readonly findAllCitiesUseCase: FindAllCitiesUseCase,
    private readonly softDeleteCityUseCase: SoftDeleteCityUseCase,
    private readonly updateCityUseCase: UpdateCityUseCase,
    private readonly findCityByIdUseCase: FindCityByIdUseCase,
  ) {}

  async create(body: CreateCityDto): Promise<CityResponseDto> {
    return this.createCitiesUseCase.execute(body);
  }

  async findAll(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.findAllCitiesUseCase.execute(query);
  }

  async findOne(id: string): Promise<CityResponseDto> {
    return this.findCityByIdUseCase.execute(id);
  }

  async softDelete(id: string): Promise<void> {
    return this.softDeleteCityUseCase.execute(id);
  }

  async update(id: string, body: UpdateCityDto): Promise<CityResponseDto> {
    return this.updateCityUseCase.execute(id, body);
  }
}
