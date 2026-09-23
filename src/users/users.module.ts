import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UsersController } from './users.controller';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UserRepository } from './repository/user.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.USERS,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService, CreateUserUseCase, UserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
