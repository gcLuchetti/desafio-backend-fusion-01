import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSpaceshipDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  model: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  manufacturer: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  passengerCapacity: number;
}
