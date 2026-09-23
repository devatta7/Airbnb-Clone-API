import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityRepository } from './repository/city.repository';
import { CitySchema } from './schema/city.schema';
import { ModelNames } from '../common/data-access/model-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCitiesUseCase } from './use-cases/create-cities.usecase';
import { FindAllCitiesUseCase } from './use-cases/find-all-cities.usecase';
import { SoftDeleteCityUseCase } from './use-cases/soft-delete-city.usecase';
import { UpdateCityUseCase } from './use-cases/update-city.usecase';
import { FindCityByIdUseCase } from './use-cases/find-city-by-id.usecase';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.CITIES, schema: CitySchema },
    ]),
    CountriesModule,
  ],
  controllers: [CitiesController],
  providers: [
    CitiesService,
    CityRepository,
    CreateCitiesUseCase,
    FindAllCitiesUseCase,
    SoftDeleteCityUseCase,
    UpdateCityUseCase,
    FindCityByIdUseCase,
  ],
})
export class CitiesModule {}
