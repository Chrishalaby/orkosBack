import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export interface CorsConfig {
  origin: string;
  methods: string;
  credentials: boolean;
}

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const cors: CorsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(cors);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
