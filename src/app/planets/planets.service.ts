import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>
  ){}

  async create(createPlanetDto: CreatePlanetDto) {
    return await this.planetRepository.save(this.planetRepository.create(createPlanetDto));
  }

  async findAll() {
    return await this.planetRepository.find();
  }

  async findOne(id: number) {
    try {
      return this.planetRepository.findOneByOrFail({id: id});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const planet: Planet = await this.findOne(id);

    this.planetRepository.merge(planet, updatePlanetDto);
    return await this.planetRepository.save(planet);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.planetRepository.delete({id: id})
  }
}
