import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UnitRepository } from './repository/unit.repository';
import { UnitSchema } from './schema/unit.schema';
import { AppSettingsModule } from '../app-settings/app-settings.module';
import { CountriesModule } from '../countries/countries.module';
import { CitiesModule } from '../cities/cities.module';
import { UnitCategoriesModule } from '../unit-categories/unit-categories.module';
import { UnitValidationUseCase } from './use-cases/unit-validation.usecase';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { CheckUnitAuthUseCase } from './use-cases/check-unit-auth.usecase';
import { FindOneUseCase } from './use-cases/find-one.usecase';
import { UpdateUnitUseCase } from './use-cases/update-unit-usecase';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelNames.UNITS, schema: UnitSchema }]),
    AppSettingsModule,
    CountriesModule,
    CitiesModule,
    UnitCategoriesModule,
  ],
  providers: [
    UnitsService,
    UnitRepository,
    UnitValidationUseCase,
    CreateUnitUseCase,
    CheckUnitAuthUseCase,
    FindOneUseCase,
    UpdateUnitUseCase,
  ],
  controllers: [UnitsController],
  exports: [UnitRepository],
})
export class UnitsModule {}
