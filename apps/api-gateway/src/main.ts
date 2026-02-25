import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from '../config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from '../../../libs/common/filters/rpc-custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:5173',
      'https://ukiyocazorla.es',
      'http://ukiyocazorla.es',
      'http://38.242.240.106',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);
  logger.log(`Gateway corriendo en el puerto ${envs.port}`);
}
bootstrap();