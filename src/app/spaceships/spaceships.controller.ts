import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { UpdateSpaceshipDto } from './dto/update-spaceship.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('spaceships')
@ApiTags('Spaceships')
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Post()
  async create(@Body() createSpaceshipDto: CreateSpaceshipDto) {
    return await this.spaceshipsService.create(createSpaceshipDto);
  }

  @Get()
  async findAll() {
    return await this.spaceshipsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.spaceshipsService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSpaceshipDto: UpdateSpaceshipDto,
  ) {
    return await this.spaceshipsService.update(id, updateSpaceshipDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.spaceshipsService.remove(id);
  }
}
