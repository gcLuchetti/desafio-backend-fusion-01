import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exists, existsSync, unlinkSync } from 'fs';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if(existsSync(dbFile)) unlinkSync(dbFile);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
