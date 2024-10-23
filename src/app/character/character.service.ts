import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PlanetsService } from '../planets/planets.service';
import { Planet } from '../planets/entities/planet.entity';
import { CharacterNotFound } from './exceptions/character-not-found.exception';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @Inject() private readonly planetService: PlanetsService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const { homePlanetId, ...characterData } = createCharacterDto;

    const homePlanet: Planet = await this.fetchPlanet(homePlanetId);

    const character = this.characterRepository.create({
      ...characterData,
      homePlanet,
    });

    try {
      return await this.characterRepository.save(character);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.characterRepository.find({ relations: ['homePlanet'] });
  }

  async findOneByIdOrFail(id: number) {
    try {
      return await this.characterRepository.findOneOrFail({
        where: { id },
        relations: ['homePlanet'],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        const message: string = `Character with ID ${id} not found`;
        throw new CharacterNotFound(message);
      }

      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character: Character = await this.findOneByIdOrFail(id);
    const { homePlanetId, ...characterData } = updateCharacterDto;

    if (homePlanetId) {
      const planet: Planet = await this.fetchPlanet(homePlanetId);
      character.homePlanet = planet;
    }

    this.characterRepository.merge(character, characterData);
    return await this.characterRepository.save(character);
  }

  async remove(id: number) {
    await this.findOneByIdOrFail(id);

    await this.characterRepository.delete({ id: id });
  }

  private async fetchPlanet(homePlanetId: number) {
    if (homePlanetId) {
      const planet: Planet =
        await this.planetService.findOneByIdOrFail(homePlanetId);
      return planet;
    }
  }
}
