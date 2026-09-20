import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

import { CountrySchema } from './schema/country.schema';
import { ModelNames } from '../common/data-access/model-names.enum';

import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { FindCountryByIdUseCase } from './use-cases/find-country-by-id-usecase';
import { FindAllCountriesUseCase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';
import { CountryRepository } from './repository/country.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.COUNTRIES,
        schema: CountrySchema,
      },
    ]),
  ],

  controllers: [CountriesController],

  providers: [
    CountriesService,
    CreateCountryUseCase,
    FindCountryByIdUseCase,
    FindAllCountriesUseCase,
    SoftDeleteCountryUseCase,
    UpdateCountryUseCase,
    CountryRepository,
  ],

  exports: [CountryRepository],
})
export class CountriesModule {}
