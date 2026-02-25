import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { envs, PRODUCTOS_SERVICE } from '../../../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTOS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}