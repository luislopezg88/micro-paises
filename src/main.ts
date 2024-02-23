import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  
  
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite propiedades decoradas en los DTOs
      forbidNonWhitelisted: true 
    })
  );

  
  const config = new DocumentBuilder()
    .setTitle('Países') 
    .setDescription('API para la gestión de países') 
    .setVersion('1.0')
    .addTag('Países') 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  
  await app.listen(parseInt(process.env.PORT) || 3000);
}

bootstrap();