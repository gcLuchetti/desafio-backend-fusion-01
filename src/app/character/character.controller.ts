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
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('characters')
@ApiTags('Characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({
    summary:
      'Creates a new character and links them to a home planet via homePlanetId',
  })
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return await this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves a list of all characters, including their home planet.',
  })
  async findAll() {
    return await this.characterService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Retrieves a specific character by their id, including their details and home planet.',
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.characterService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      "Updates an existing character by their id. Optionally, you can update the character's home planet.",
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return await this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletes a character by their id.',
  })
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.characterService.remove(id);
  }
}
