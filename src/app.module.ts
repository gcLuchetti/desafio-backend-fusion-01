import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsModule } from './app/planets/planets.module';
import { UsersModule } from './app/users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    PlanetsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
