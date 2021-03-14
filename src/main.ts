import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Nodepop API')
    .setDescription('The Nodepop API Swagger Page')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('adverts')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, () => {
    console.log(`Nodepop API running in port ${port}`);
    console.log(`Try me in http://localhost:${port}/swagger`);
  });
}

bootstrap();
