import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { UpdateSpaceshipDto } from './dto/update-spaceship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Spaceship } from './entities/spaceship.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SpaceshipNotFoundException } from './exceptions/spaceship-not-found.exception';

@Injectable()
export class SpaceshipsService {
  constructor(
    @InjectRepository(Spaceship)
    private readonly spaceshipRepository: Repository<Spaceship>,
  ) {}

  async create(createSpaceshipDto: CreateSpaceshipDto) {
    try {
      return await this.spaceshipRepository.save(
        this.spaceshipRepository.create(createSpaceshipDto),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.spaceshipRepository.find();
  }

  async findOneByIdOrFail(id: number) {
    try {
      return await this.spaceshipRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        const message: string = `Spaceship with ID ${id} not found`;
        throw new SpaceshipNotFoundException(message);
      }

      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateSpaceshipDto: UpdateSpaceshipDto) {
    const spaceship: Spaceship = await this.findOneByIdOrFail(id);
    this.spaceshipRepository.merge(spaceship, updateSpaceshipDto);

    return await this.spaceshipRepository.save(spaceship);
  }

  async remove(id: number) {
    await this.findOneByIdOrFail(id);

    await this.spaceshipRepository.delete({ id: id });
  }
}
