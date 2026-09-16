import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

import { Country, CountrySchema } from './schema/country.schema';

import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { FindCountryByIdUseCase } from './use-cases/find-country-by-id-usecase';
import { FindAllCountriesUseCase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Country.name,
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
  ],
})
export class CountriesModule {}
