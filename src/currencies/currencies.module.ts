import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelNames } from '../common/data-access/model-names.enum';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { CurrencyRepository } from './repository/currency.repository';
import { CurrencySchema } from './schema/currency.schema';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { FindAllCurrenciesUseCase } from './use-cases/find-all-currencies.usecase';
import { FindCurrencyByIdUseCase } from './use-cases/find-currency-by-id.usecase';
import { SoftDeleteCurrencyUseCase } from './use-cases/soft-delete-currency.usecase';
import { UpdateCurrencyUseCase } from './use-cases/update-currency.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.CURRENCIES, schema: CurrencySchema },
    ]),
  ],
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    CurrencyRepository,
    CreateCurrencyUseCase,
    FindCurrencyByIdUseCase,
    FindAllCurrenciesUseCase,
    UpdateCurrencyUseCase,
    SoftDeleteCurrencyUseCase,
  ],
  exports: [CurrencyRepository],
})
export class CurrenciesModule {}
