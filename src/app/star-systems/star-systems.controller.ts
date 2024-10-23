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
} from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { CreateStarSystemDto } from './dto/create-star-system.dto';
import { UpdateStarSystemDto } from './dto/update-star-system.dto';

@Controller('star-systems')
export class StarSystemsController {
  constructor(private readonly starSystemsService: StarSystemsService) {}

  @Post()
  async create(@Body() createStarSystemDto: CreateStarSystemDto) {
    return await this.starSystemsService.create(createStarSystemDto);
  }

  @Get()
  async findAll() {
    return await this.starSystemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.starSystemsService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateStarSystemDto: UpdateStarSystemDto,
  ) {
    return await this.starSystemsService.update(id, updateStarSystemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.starSystemsService.remove(id);
  }
}
