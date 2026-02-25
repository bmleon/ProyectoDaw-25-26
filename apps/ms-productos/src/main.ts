import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions, RpcException } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from '../config';

async function bootstrap() {

  const logger = new Logger('MS-Productos');

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
  logger.log(`Microservicio Productos corriendo en NATS servers: ${envs.natsServers}`);
}
bootstrap();