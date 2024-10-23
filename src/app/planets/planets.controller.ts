import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('planets')
@ApiTags('Planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new planet in the system.',
  })
  async create(@Body() createPlanetDto: CreatePlanetDto) {
    return await this.planetsService.create(createPlanetDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of all registered planets.',
  })
  async findAll() {
    return await this.planetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves information about a specific planet.',
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.planetsService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates the information of a specific planet.',
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ) {
    return await this.planetsService.update(id, updatePlanetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Removes a planet from the system.',
  })
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.planetsService.remove(id);
  }
}
