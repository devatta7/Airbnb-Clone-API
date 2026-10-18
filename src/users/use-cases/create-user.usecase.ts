import { ConflictException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(body: CreateUserDto): Promise<UserResponseDto> {
    const email = body.email.trim().toLowerCase();
    const { phoneNumber } = body;

    const existingUser = await this.userRepository.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      throw new ConflictException('Email or phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userRepository.create({
      ...body,
      email,
      password: hashedPassword,
    });

    return plainToInstance(UserResponseDto, user.toObject());
  }
}
