import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePlanetDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  climate: string;

  @IsNotEmpty()
  @ApiProperty()
  terrain: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  population: number;
}
