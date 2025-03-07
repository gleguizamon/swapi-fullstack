import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.enableCors({
  //   origin: ["http://localhost:3001", "https://tu-front.com"], // Dominios permitidos
  //   methods: "GET,POST,PUT,DELETE", // Métodos permitidos
  //   allowedHeaders: "Content-Type,Authorization", // Headers permitidos
  //   credentials: true, // Para permitir cookies o auth tokens
  // });
  await app.listen(3001);
}
bootstrap();
