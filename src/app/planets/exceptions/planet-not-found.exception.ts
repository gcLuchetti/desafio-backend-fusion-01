import { HttpException, HttpStatus } from "@nestjs/common";

export class PlanetNotFoundException extends HttpException{
    constructor(id: number){
        super(`Planet with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
}