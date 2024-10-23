import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

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
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number })
  homePlanetId: number;
}
