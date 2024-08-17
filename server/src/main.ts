import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  app.useStaticAssets(process.cwd() + '/src/icons', {
    prefix: '/icons/',
  });
  await app.listen(3000);
}
bootstrap();
