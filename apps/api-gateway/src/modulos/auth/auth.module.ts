import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USUARIOS_SERVICE, envs } from '../../../config';

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
        ]),
    ],
    controllers: [AuthController],
    providers: [],
    })
export class AuthModule {}