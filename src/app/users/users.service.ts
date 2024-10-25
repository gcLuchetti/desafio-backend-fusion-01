import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
    } catch (error) {
      if (error.detail && error.detail.includes('already exists'))
        throw new BadRequestException('A user with this email already exists.');

      throw new BadRequestException(error.detail);
    }
  }

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneByIdOrFail(id: number) {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        const message: string = `User with ID ${id} not found`;
        throw new UserNotFoundException(message);
      }

      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.findOneByIdOrFail(id);
    this.usersRepository.merge(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.findOneByIdOrFail(id);

    await this.usersRepository.delete({ id: id });
  }

  async findOneByEmailOrFail(email: string) {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        const message: string = `User with email ${email} not found`;
        throw new UserNotFoundException(message);
      }

      throw new NotFoundException(error.message);
    }
  }
}
