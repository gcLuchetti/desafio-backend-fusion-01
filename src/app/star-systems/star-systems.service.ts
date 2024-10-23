import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStarSystemDto } from './dto/create-star-system.dto';
import { UpdateStarSystemDto } from './dto/update-star-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { StarSystem } from './entities/star-system.entity';
import { PlanetsService } from '../planets/planets.service';
import { StarSystemNotFound } from './exceptions/star-system-not-found.exception';
import { Planet } from '../planets/entities/planet.entity';

@Injectable()
export class StarSystemsService {
  constructor(
    @InjectRepository(StarSystem)
    private readonly starSystemRepository: Repository<StarSystem>,
    @Inject()
    private readonly planetService: PlanetsService,
  ) {}

  async create(createStarSystemDto: CreateStarSystemDto) {
    const { planetIds, ...starSystemData } = createStarSystemDto;

    const planets: Planet[] = await this.fetchPlanets(planetIds);

    const starSystem = this.starSystemRepository.create({
      ...starSystemData,
      planets,
    });

    try {
      return await this.starSystemRepository.save(starSystem);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.starSystemRepository.find({
      relations: ['planets'],
    });
  }

  async findOneByIdOrFail(id: number) {
    try {
      return await this.starSystemRepository.findOneOrFail({
        where: { id },
        relations: ['planets'],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        const message: string = `Star system with ID ${id} not found`;
        throw new StarSystemNotFound(message);
      }

      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateStarSystemDto: UpdateStarSystemDto) {
    const starSystem: StarSystem = await this.findOneByIdOrFail(id);
    const { planetIds, ...starSystemData } = updateStarSystemDto;

    if (planetIds) {
      const planets: Planet[] = await this.fetchPlanets(planetIds);
      starSystem.planets = planets;
    }

    this.starSystemRepository.merge(starSystem, starSystemData);
    return await this.starSystemRepository.save(starSystem);
  }

  async remove(id: number) {
    await this.findOneByIdOrFail(id);

    await this.starSystemRepository.delete({ id: id });
  }

  private async fetchPlanets(planetIds: number[]) {
    const planets: Planet[] = [];

    const uniquePlanetIds = planetIds ? [...new Set(planetIds)] : [];

    if (uniquePlanetIds && uniquePlanetIds.length > 0) {
      for (const planetId of uniquePlanetIds) {
        const planet: Planet =
          await this.planetService.findOneByIdOrFail(planetId);
        planets.push(planet);
      }
    }

    return planets;
  }
}
