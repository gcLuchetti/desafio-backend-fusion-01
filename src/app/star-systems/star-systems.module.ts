import { Module } from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { StarSystemsController } from './star-systems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarSystem } from './entities/star-system.entity';
import { PlanetsModule } from '../planets/planets.module';
import { Planet } from '../planets/entities/planet.entity';

@Module({
  imports: [PlanetsModule, TypeOrmModule.forFeature([StarSystem, Planet])],
  controllers: [StarSystemsController],
  providers: [StarSystemsService],
  exports: [StarSystemsService],
})
export class StarSystemsModule {}
