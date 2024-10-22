import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, unlinkSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if (existsSync(dbFile)) unlinkSync(dbFile);

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Desafio BackEnd Fusion')
    .setDescription(
      'API backend que permite a criação, gerenciamento e visualização de uma galáxia inspirada em Star Wars, incluindo planetas, sistemas estelares, personagens e naves espaciais.',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(3000);
}
bootstrap();
