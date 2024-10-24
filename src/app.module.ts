import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsModule } from './app/planets/planets.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StarSystemsModule } from './app/star-systems/star-systems.module';
import { CharacterModule } from './app/character/character.module';
import { SpaceshipsModule } from './app/spaceships/spaceships.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    PlanetsModule,
    UsersModule,
    AuthModule,
    StarSystemsModule,
    CharacterModule,
    SpaceshipsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
