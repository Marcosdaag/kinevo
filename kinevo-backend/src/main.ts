import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (Cross-Origin Resource Sharing).
  // Es una medida de seguridad de los navegadores. Al habilitarlo, permitimos que
  // nuestro Frontend (Angular) en el puerto 4200 pueda hacer peticiones a este Backend en el puerto 3000.
  app.enableCors();

  // El ValidationPipe es el "patovica" de nuestros endpoints.
  // Lee las reglas de los DTOs (ej: @IsEmail(), @IsString()) y si el Frontend envía datos basura,
  // los rebota automáticamente devolviendo un error 400 Bad Request, sin que el código de nuestro controlador se llegue a ejecutar.
  app.useGlobalPipes(new ValidationPipe());

  // Configuracion del modulo Swagger
  const config = new DocumentBuilder()
    .setTitle('Kinevo API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Se corre en el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
// Corre el servidor y devuelve el error en caso de que no funcione
bootstrap().catch((err) => console.error(err));
