import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlanetsModule } from './app/planets/planets.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StarSystemsModule } from './app/star-systems/star-systems.module';
import { CharacterModule } from './app/character/character.module';
import { SpaceshipsModule } from './app/spaceships/spaceships.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './app/logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlanetsModule,
    UsersModule,
    AuthModule,
    StarSystemsModule,
    CharacterModule,
    SpaceshipsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
