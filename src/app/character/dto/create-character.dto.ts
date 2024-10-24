import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  race: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  affiliation: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number })
  homePlanetId: number;
}
