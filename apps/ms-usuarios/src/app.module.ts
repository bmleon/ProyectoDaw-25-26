import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { PerfilesModule } from './modulos/perfiles/perfiles.module';
import { EmpleadosModule } from './modulos/empleados/empleados.module';
import { AccesosModule } from './modulos/accesos/accesos.module';
import { AuthModule } from './modulos/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/ms-usuarios/.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    // PrismaModule se importa dentro de UsuariosModule
    UsuariosModule,
    PerfilesModule,
    EmpleadosModule,
    AccesosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}