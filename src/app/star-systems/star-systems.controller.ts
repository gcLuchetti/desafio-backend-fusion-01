import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { CreateStarSystemDto } from './dto/create-star-system.dto';
import { UpdateStarSystemDto } from './dto/update-star-system.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('star-systems')
@ApiTags('Star-Systems')
export class StarSystemsController {
  constructor(private readonly starSystemsService: StarSystemsService) {}

  @Post()
  @ApiOperation({
    summary:
      'Creates a new star system with the option to include related planet IDs.',
  })
  async create(@Body() createStarSystemDto: CreateStarSystemDto) {
    return await this.starSystemsService.create(createStarSystemDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves all star systems, including the related planets.',
  })
  async findAll() {
    return await this.starSystemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Retrieves a specific star system by its id, including its associated planets.',
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.starSystemsService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Updates an existing star system by id. Optionally updates the associated planets.',
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateStarSystemDto: UpdateStarSystemDto,
  ) {
    return await this.starSystemsService.update(id, updateStarSystemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletes a star system by its id.',
  })
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.starSystemsService.remove(id);
  }
}
