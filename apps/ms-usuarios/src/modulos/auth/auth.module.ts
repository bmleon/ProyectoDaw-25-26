import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AccesosModule } from '../accesos/accesos.module';
import { envs } from '../../../config';

@Module({
  imports: [
    UsuariosModule,
    AccesosModule,
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
