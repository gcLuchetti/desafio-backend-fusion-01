import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

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

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: [Number] })
  population: number;
}
