import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { AuthModule } from './modulos/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    ClientesModule,
    ProductosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}