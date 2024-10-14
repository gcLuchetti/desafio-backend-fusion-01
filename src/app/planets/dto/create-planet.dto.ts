import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreatePlanetDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    climate: string;

    @IsNotEmpty()
    terrain: string;

    @IsNumber()
    @Min(0)
    population: number;
}
