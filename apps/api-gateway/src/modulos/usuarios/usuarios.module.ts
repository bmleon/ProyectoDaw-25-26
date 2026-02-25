import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsuariosController } from './usuarios.controller';
import { PerfilesController } from './perfiles.controller';
import { EmpleadosController } from './empleados.controller';
import { AccesosController } from './accesos.controller';
import { UsuariosService } from './usuarios.service';
import { envs, USUARIOS_SERVICE, CLIENTES_SERVICE } from '../../../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USUARIOS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
      {
        name: CLIENTES_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [UsuariosController, PerfilesController, EmpleadosController, AccesosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}