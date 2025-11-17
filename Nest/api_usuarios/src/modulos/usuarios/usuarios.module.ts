import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    ClientesModule  
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
