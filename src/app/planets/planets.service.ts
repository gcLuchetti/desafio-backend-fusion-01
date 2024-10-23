import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanetNotFoundException } from './exceptions/planet-not-found.exception';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  async create(createPlanetDto: CreatePlanetDto) {
    return await this.planetRepository.save(
      this.planetRepository.create(createPlanetDto),
    );
  }

  async findAll() {
    return await this.planetRepository.find({relations: ['starSystem', 'characters']});
  }

  async findOneByIdOrFail(id: number) {
    try {
      return await this.planetRepository.findOneOrFail({ where: { id: id }, relations: ['starSystem', 'characters'], });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        const message: string = `Planet with ID ${id} not found`;
        throw new PlanetNotFoundException(message);
      }

      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const planet: Planet = await this.findOneByIdOrFail(id);

    this.planetRepository.merge(planet, updatePlanetDto);
    return await this.planetRepository.save(planet);
  }

  async remove(id: number) {
    await this.findOneByIdOrFail(id);

    try {
      await this.planetRepository.delete({ id: id });
    } catch (error) {
      if (error.message.includes('FOREIGN KEY constraint failed')){
        const message: string = 'Cannot delete the planet because it is linked to one or more characters. Please remove the characters first.';
        throw new BadRequestException(message);
      }

      throw new BadRequestException(error.message);
    }
  }
}
