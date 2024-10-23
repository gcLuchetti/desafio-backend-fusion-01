import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

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

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: [Number] })
  homePlanetId: number;
}
