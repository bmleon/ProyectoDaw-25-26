import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport, RpcException } from '@nestjs/microservices';
import { envs } from '../config';

async function bootstrap() {
  const logger = new Logger('MS-Clientes');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
              const messages = errors.map((error) => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
              });
              
              return new RpcException({
                message: messages,
                statusCode: 400,
                error: 'Bad Request'
              });
            },
    }),
  );

  await app.listen();
  logger.log(`Microservicio Clientes corriendo en NATS servers: ${envs.natsServers}`);
}
bootstrap();