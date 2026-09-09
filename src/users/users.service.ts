import { Injectable } from '@nestjs/common';

import { Model, QueryFilter } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async create(body: CreateUserDto) {
    return this.createUserUseCase.execute(body);
  }

  async findOne(query: QueryFilter<User>) {
    return this.userModel.findOne(query);
  }
}
