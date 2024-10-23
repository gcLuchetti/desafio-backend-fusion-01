import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateStarSystemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @ApiProperty({ required: false, type: [Number], })
  planetIds?: number[];
}
