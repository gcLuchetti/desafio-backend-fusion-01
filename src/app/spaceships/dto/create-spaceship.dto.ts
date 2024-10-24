import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSpaceshipDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  passengerCapacity: number;
}
