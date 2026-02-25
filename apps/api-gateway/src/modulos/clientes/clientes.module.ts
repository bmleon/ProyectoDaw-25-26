import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientesController } from './clientes.controller';
import { envs, CLIENTES_SERVICE } from '../../../config';
import { ClientesService } from './clientes.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLIENTES_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}