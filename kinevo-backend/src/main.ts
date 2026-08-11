import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Kinevo API')
    .addBearerAuth()
    .build();

  // Configuracion del modulo Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Se corre en el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
// Corre el servidor y devuelve el error en caso de que no funcione
bootstrap().catch((err) => console.error(err));
