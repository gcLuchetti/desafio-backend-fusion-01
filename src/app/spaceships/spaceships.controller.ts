import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { UpdateSpaceshipDto } from './dto/update-spaceship.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('spaceships')
@ApiTags('Spaceships')
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new spaceship in the system.',
  })
  async create(@Body() createSpaceshipDto: CreateSpaceshipDto) {
    return await this.spaceshipsService.create(createSpaceshipDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of all registered spaceships.',
  })
  async findAll() {
    return await this.spaceshipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves information about a specific spaceship.',
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.spaceshipsService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates the information of a specific spaceship.',
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSpaceshipDto: UpdateSpaceshipDto,
  ) {
    return await this.spaceshipsService.update(id, updateSpaceshipDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Removes a spaceship from the system.',
  })
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.spaceshipsService.remove(id);
  }
}
