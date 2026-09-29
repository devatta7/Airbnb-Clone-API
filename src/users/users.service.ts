import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { User } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async create(body: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(body);
  }

  async findOne(query: QueryFilter<User>): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne(query);

    if (!user) {
      return null;
    }

    return plainToInstance(UserResponseDto, user.toObject());
  }
}
